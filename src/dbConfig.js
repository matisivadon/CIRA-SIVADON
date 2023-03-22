import mongoose from 'mongoose'

const URL = 'mongodb+srv://msivadon:coderhouse@cluster0.zpwyhsx.mongodb.net/ecommerce?retryWrites=true&w=majority'

try {
    await mongoose.connect(URL)
    console.log('Conectado a la base de datos')
} catch (error) {
    console.log(error)
}