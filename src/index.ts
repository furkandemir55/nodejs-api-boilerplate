import initExpress from "./initExpress"
import initDb from "./initDb"

const main = async () => {
	const expressReady = initExpress()
	const dbReady = await initDb()
	return { expressReady, dbReady }
}

main().then(console.log)
