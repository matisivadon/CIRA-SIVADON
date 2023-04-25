import dotenv from 'dotenv'

dotenv.config()

const obj = {
    port: process.env.PORT,
    uri: process.env.URI,
    persistencia: process.env.PERSISTENCIA
}

export default obj