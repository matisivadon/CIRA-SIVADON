import { transporter } from '../messages/nodemailer.js'
import { findUser, updateUser } from '../services/users.service.js'
import { hashData, compareHashedData } from '../utils/bcrypt.utils.js'
import jwt from "jsonwebtoken"
import config from '../config.js'

const key = config.private_key

export async function sendEmail (req,res){
    const { email } = req.body
    const user = await findUser({ email })
    if (user.length !== 0) {
        const token = jwt.sign({ email }, key, { expiresIn: '1h' })
        const messageOptions = {
            from: 'CODER45',
            to: email,
            subject: 'Recupera tu contraseña',
            html: `<h1>Haz click en el siguiente botón para restablecer tu contraseña</h1>
                       <form action='http://localhost:8080/restablecercontrasena' method='get'>
                        <input type='hidden' name='token' value='${token}'/>
                        <input type='submit' value='Recuperar clave'/>
                       </form>`
        }
        try {
            await transporter.sendMail(messageOptions)
            res.send('¡Correo electronico enviado!')
        } catch (error) {
            console.log(error)
        }
    } else {
        res.send('Verifique su email')
    }
}

export async function getPassword(req, res) {
    const {token}= req.query
    const { email, password } = req.body
    const { TokenExpiredError } = jwt
    let user = await findUser({ email })
    try {
        const decoded = jwt.verify(token, key)
            if (user.length !== 0) {
                const isValidPassword = await compareHashedData(password, user[0].password)
                if (isValidPassword) {
                    res.send('No puede repetir la contraseña')
                } else {
                    const newHashPassword = await hashData(password)
                    user = await updateUser(user[0]._id, { password: newHashPassword })
                    res.render('changepass')
                }
            } else {
                res.send('Email incorrecto')
            }       
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.redirect('/expiretoken');
          } else {
            console.log(error)
          }
    }
}


