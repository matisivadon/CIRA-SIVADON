import mongoose from 'mongoose'
import config from '../../config.js'

const URI = config.uri

try {
    await mongoose.connect(URI)
    console.log('Conectado a la base de datos')
} catch (error) {
    console.log(error)
}