import knexFile from "../knex/knexfile"
import knex from "knex"

const config =
	process.env.PROJECT_ENV === "docker"
		? knexFile["dockerRaw"]
		: knexFile["developmentRaw"]
export default knex(config)
