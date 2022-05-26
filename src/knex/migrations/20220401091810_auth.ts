import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("auth", (table) => {
		table.increments()
		table.timestamps(false, true, true)

		table.string("username").notNullable().unique()
		table.string("passwordHash").notNullable()
		table.boolean("isBanned").defaultTo(false)
		table.string("role").defaultTo("user")
	})
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("auth")
}
