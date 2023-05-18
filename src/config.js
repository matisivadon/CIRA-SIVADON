import dotenv from 'dotenv'

dotenv.config()

const obj = {
    port: process.env.PORT,
    uri: process.env.URI,
    persistencia: process.env.PERSISTENCIA,
    node_env: process.env.NODE_ENV,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD,
    private_key: process.env.PRIVATE_KEY
}

export default obj