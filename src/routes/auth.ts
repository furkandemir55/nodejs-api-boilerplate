import express from "express"
import token from "../utils/token"
import db from "../utils/db"
import hashUtils from "../utils/hashUtils"

const router = express.Router()

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await db("auth").where("username", username).first()
		if (!user) return res.status(400).json({ error: "User not found" })
		if (hashUtils.verify(password, user.passwordHash)) {
			const accessToken = await token.signToken({
				authUsername: user.username,
			})
			res.json({ accessToken })
		} else res.status(400).json({ error: "Bad password" })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: "Something went wrong" })
	}
})

router.post("/register", async (req, res) => {
	try {
		const { username, password } = req.body
		if (!(password && password.length > 3))
			return res.json({ error: "Password should be at least 3 characters." })
		const user = await db("auth").where({ username }).first()
		if (user) return res.status(400).json({ error: "Username exists" })
		const passwordHash = hashUtils.hash(password)
		await db("auth").insert({ username, passwordHash })
		res.sendStatus(200)
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: "Something went wrong" })
	}
})

router.get("/checkToken", token.expressVerifyToken, async (req, res) => {
	try {
		res.json({ success: true })
	} catch (e) {
		console.log(e)
		res.status(500).json({ error: "Something went wrong" })
	}
})

export default router
