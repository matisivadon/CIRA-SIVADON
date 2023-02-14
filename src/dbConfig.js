import mongoose from 'mongoose'

const URL = 'mongodb+srv://msivadon:coderhouse@cluster0.zpwyhsx.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(URL, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('Conectado a la base de datos');
    }
})