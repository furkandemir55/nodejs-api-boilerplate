import { Knex } from "knex"
import hashUtils from "../../../utils/hashUtils"

export async function seed(knex: Knex): Promise<void> {
	// await db("auth").del()

	knex("auth")
		.insert({
			username: "admin",
			passwordHash: hashUtils.hash("1234"),
			role: "admin",
		})
		.then(() => console.log("admin user created"))
		.catch(() => null)
}
