import { Knex } from "knex"

// intellij removes unused imports. Code below prevents removal
let a: Knex | undefined
a = undefined
//

declare module "knex/types/tables" {
	interface DefaultTable {
		id: number
		createdAt: string
		updatedAt: string
	}

	interface Auth extends DefaultTable {
		username: string
		passwordHash: string
		isBanned: boolean
		role: "user" | "admin"
	}

	interface Tables {
		auth: Auth
	}
}
