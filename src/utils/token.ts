import jwt, { JwtPayload } from "jsonwebtoken"
import { RequestHandler } from "express"
import { join } from "path"

if (process.env.PROJECT_ENV !== "docker")
	require("dotenv").config({ path: join(__dirname, "../..", "dev.env") })
const privateKey =
	process.env.PROJECT_ENV === "docker"
		? process.env.DOCKER_JWT_KEY
		: process.env.DEV_JWT_KEY
if (privateKey === undefined) throw new Error("api jwt private key is empty")

const signToken = async (payload: {
	[key: string]: any
	authUsername: string
}) => {
	return jwt.sign(payload, privateKey, { issuer: "fame", expiresIn: "1h" })
}

const verifyToken: (token: string) => JwtPayload = async (token) => {
	return jwt.verify(token, privateKey)
}

const expressVerifyToken: RequestHandler = async (req, res, next) => {
	const token = req.header("x-auth")
	if (!token)
		return res
			.status(401)
			.json({ error: "Login required", code: "TOKEN_NOT_FOUND" })
	try {
		const payload = await verifyToken(token)
		if (payload.authUuid !== "1") return res.sendStatus(401)
		next()
	} catch (e) {
		console.log(e)
		res.status(401).send({ error: "Login required", code: "TOKEN_EXPIRE" })
	}
}

export default { signToken, verifyToken, expressVerifyToken }
