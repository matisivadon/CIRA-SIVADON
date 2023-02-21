import express from 'express'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import viewsRouter from './routes/views.router.js'
import handlebars from 'express-handlebars'
import {__dirname} from './utils.js'
import { Server } from 'socket.io'
import { chatModel } from './dao/models/chat.model.js'
import './dbConfig.js'


const app = express()

const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname+'/public'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/chat', chatRouter)
app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set ('views', __dirname + '/views')


app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`)
})

//socket

// const socketPORT = 3000

// export const messages = []

// const httpServer = app.listen(socketPORT, () => {
//     console.log(`Escuchando al puerto ${socketPORT}`)
// })

// const socketServer = new Server(httpServer)

// socketServer.on('connection', (socket)=> {
//     console.log(`Usuario conectado: ${socket.id}`);

//     socket.on('disconnect', () => {
//         console.log('Usuario desconectado');
//     })

//     socket.on('mensaje', infoUser => {
//         messages.push(infoUser)
//         socketServer.emit('respuesta', messages)
//         const postMessages = async () => {
//             try {
//                 const newMessage = await chatModel.create(infoUser)
//                 return newMessage
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         postMessages()
//         console.log(infoUser)
//     })
// })
