import express from "express"
import Cors from "cors"
import bodyParser from "body-parser"

import auth from "./routes/auth"

const startServer = async () => {
	const app = express()
	const origin = () => {
		if (process.env.PROJECT_ENV === "docker") return process.env.HOST_URL
		return ["http://localhost:3000", "http://localhost:3001"]
	}
	const cors = { origin: origin(), credentials: true }
	app.set("trust proxy", true)
	app.use(Cors(cors))
	app.use(bodyParser.json())
	app.use(bodyParser.urlencoded({ extended: true }))

	app.get("/", (req, res) => {
		res.json({ connected: true })
	})

	app.use("/auth", auth)

	const port = process.env.PROJECT_ENV === "docker" ? 80 : 5000
	app.listen(port, () =>
		console.log(`Express server is listening on port ${port}`)
	)

	return true
}

export default startServer
