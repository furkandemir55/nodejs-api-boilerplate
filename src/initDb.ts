import db from "./utils/db"
import dbRaw from "./utils/dbRaw"
import { join } from "path"

if (process.env.PROJECT_ENV !== "docker")
	require("dotenv").config({ path: join(__dirname, "..", "dev.env") })
const databaseName = process.env.DOCKER_DB_DBNAME || process.env.DEV_DB_DBNAME
if (!databaseName) throw new Error("database name not set")

const checkConnection = async () => {
	const tryConnection = async () =>
		new Promise<boolean>((resolve) => {
			setTimeout(() => {
				dbRaw
					.raw("CREATE DATABASE ??", [databaseName])
					.then()
					.catch(() => null)
				db.raw("SELECT 1")
					.then(() => resolve(true))
					.catch(() => resolve(false))
			}, 3000)
		})
	let tryCount = 0
	dbRaw
		.raw("CREATE DATABASE ??", [databaseName])
		.then(() => console.log(`database "${databaseName}" created.`))
		.catch(() => null)
	let connected = await db
		.raw("SELECT 1")
		.then(() => true)
		.catch(() => false)
	while (tryCount < 5 && !connected) {
		tryCount++
		connected = await tryConnection()
	}
	if (connected) return true
	throw new Error("Database connection error")
}
const migrate = async () => await db.migrate.latest()
const seed = async () => db.seed.run()

const main = async () => {
	await checkConnection()
	await migrate()
	await seed()
	console.log("Database connection established")
	return true
}

export default main
