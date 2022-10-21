const form = document.querySelector("form")
const nombre = document.querySelector("#nombre")
const correo = document.querySelector("#correo")
const consulta = document.querySelector("#consulta")
const enviar = document.querySelector("#enviar")
const limpiarForm = document.querySelector("#limpiarForm")

//Eventos mousemove

limpiarForm.addEventListener("mousemove", () => limpiarForm.title = "Eliminar información cargada")


//Frenar evento submit 
form.addEventListener("keypress", (e)=> {
    e.key === "Enter" && e.preventDefault() 
})

//Ejecutar click cuando el usuario clickea "Enviar formulario" si estan completos los datos obligatorios

enviar.addEventListener("click", () => {
    if (nombre.value && correo.value && consulta.value) {
        guardarDatos()
        envioForm()
    } else {
        validarDatos()
    }    
})

function guardarDatos() {
    localStorage.setItem("nombre", nombre.value)
    localStorage.setItem("correo", correo.value)
    localStorage.setItem("consulta", consulta.value)
}

const validarDatos = () => {
    Swal.fire({
        icon: 'error',
        title: 'Complete todos los datos solicitados',
        timer: 3000,
      })
}

const envioForm = () => {
    Swal.fire({
        icon: 'success',
        title: 'Formulario enviado',
        text: 'Le responderemos lo antes posible',
        timer: 3000,
      })
}
