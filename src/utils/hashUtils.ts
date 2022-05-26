import bcrypt from "bcryptjs"

const hash = (textToHash: string) => {
	return bcrypt.hashSync(textToHash, 10)
}
const verify = (text: string, hash: string) => {
	return bcrypt.compareSync(text, hash)
}

export default { hash, verify }
