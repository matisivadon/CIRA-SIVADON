import express from 'express'
import handlebars from 'express-handlebars'
import session from 'express-session'
import {__dirname} from './utils.js'
import cookieParser from 'cookie-parser'
import mongoStore from 'connect-mongo'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import chatRouter from './routes/chat.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import sessionsRouter from './routes/sessions.router.js'
import passport from 'passport'
import config from './config.js'
import './DAL/dbConfig.js'
import './passport/passportStrategies.js'
// import { Server } from 'socket.io'
// import { chatModel } from './dao/models/chat.model.js'



const app = express()

const PORT = config.port

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser())

//passport
app.use(passport.initialize())

//handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set ('views', __dirname + '/views')

//session
app.use(
    session({
        store: new mongoStore ({
            mongoUrl: 'mongodb+srv://msivadon:coderhouse@cluster0.zpwyhsx.mongodb.net/ecommerce?retryWrites=true&w=majority'
        }),
        resave: false,
        saveUninitialized: false,
        secret: 'sessionKey',
        cookie:{maxAge: 60000}
    })
)

//routes
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/chat', chatRouter)
app.use('/', viewsRouter)
app.use('/users', usersRouter)


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
