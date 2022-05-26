import knexFile from "../knex/knexfile"
import knex from "knex"

const config =
	process.env.PROJECT_ENV === "docker"
		? knexFile["docker"]
		: knexFile["development"]
export default knex(config)
