const socketClient = io()

// const nombreUsuario = document.getElementById('nombreUsuario')
const user = document.getElementById('email')
const message = document.getElementById('message')
const form = document.getElementById('form')
const btn = document.getElementById('btn')

// let usuario = null

// if(!usuario) {
//     Swal.fire({
//         title: 'BIENVENIDO',
//         text: 'Ingresa tu usuario',
//         input: 'text',
//         inputValidator: (value) => {
//             if(!value) {
//                 return 'Necesitas ingresar el usuario'
//             }
//         }
//     })
//     .then(userName => {
//         usuario = userName.value
//         nombreUsuario.innerText = usuario
//     })
// }

form.onsubmit = (e) => {
    e.preventDefault()
    const infoUser = {
        user: user.value,
        message: message.value
    }
    socketClient.emit('mensaje', infoUser)
    message.value = ''

}

// btn.addEventListener('click', ()=> {
//     Swal.fire({
//         title: 'Mensaje enviado con éxito',
//         icon:'success'
//     })
// })

socketClient.on('respuesta', messages => {
    const htmlRender = messages.map(elem=> {
        return `<p> <strong>${elem.user}:</strong> ${elem.message}</p>`
    }).join(' ')
    chat.innerHTML = htmlRender
})