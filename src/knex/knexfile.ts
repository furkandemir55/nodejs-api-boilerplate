import type { Knex } from "knex"
import { join } from "path"

if (process.env.PROJECT_ENV !== "docker")
	require("dotenv").config({ path: join(__dirname, "../..", "dev.env") })

const config: { [key: string]: Knex.Config } = {
	development: {
		client: "postgresql",
		connection: {
			host: process.env.DEV_DB_HOST,
			database: process.env.DEV_DB_DBNAME,
			user: process.env.DEV_DB_USER,
			password: process.env.DEV_DB_PASS,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: join(__dirname, "migrations"),
		},
		seeds: {
			directory: join(__dirname, "seeds", "dev"),
		},
	},
	developmentRaw: {
		client: "postgresql",
		connection: {
			host: process.env.DEV_DB_HOST,
			user: process.env.DEV_DB_USER,
			password: process.env.DEV_DB_PASS,
			database: "postgres",
		},
	},
	docker: {
		client: "postgresql",
		connection: {
			host: "postgres",
			database: process.env.DOCKER_DB_HOST,
			user: process.env.DOCKER_DB_USER,
			password: process.env.DOCKER_DB_PASS,
		},
		migrations: {
			tableName: "knex_migrations",
			directory: join(__dirname, "migrations"),
		},
		seeds: {
			directory: join(__dirname, "seeds", "docker"),
		},
	},
	dockerRaw: {
		client: "postgresql",
		connection: {
			host: "postgres",
			user: process.env.DOCKER_DB_USER,
			password: process.env.DOCKER_DB_PASSWORD,
		},
	},
}

export default config
