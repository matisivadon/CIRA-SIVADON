const form = document.querySelector("form")
const nombre = document.querySelector("#nombre")
const correo = document.querySelector("#correo")
const consulta = document.querySelector("#consulta")
const yacompre = document.querySelector("#yacompre")
const quierocomprar = document.querySelector("#quierocomprar")
const genero = document.querySelector("#genero")
const newsletter = document.querySelector("#newsletter")
const enviar = document.querySelector("#enviar")
const limpiarForm = document.querySelector("#limpiarForm")

//Eventos mousemove
genero.addEventListener("mousemove", () => genero.title = "Seleccione su genero")
limpiarForm.addEventListener("mousemove", () => limpiarForm.title = "Eliminar información cargada")


//Frenar evento submit 
form.addEventListener("keypress", (e)=> {
    e.key === "Enter" && e.preventDefault() 
})

//Ejecutar click cuando el usuario clickea "Enviar formulario" si estan completos los datos obligatorios

enviar.addEventListener("click", () => {
    if (nombre.value && correo.value && consulta.value) {
        let envio = confirm("¿Confirma el envío del formulario?")
        envio ? guardarDatos() : alert("Se canceló el envío del formulario")
    } else {
        alert ("Nombre, correo electrónico y consulta son datos obligatorios")
    }    
})

function guardarDatos() {
    localStorage.setItem("nombre", nombre.value)
    localStorage.setItem("correo", correo.value)
    localStorage.setItem("consulta", consulta.value)
    localStorage.setItem("yacompre", yacompre.value)
    localStorage.setItem("quierocomprar", quierocomprar.value)
    localStorage.setItem("genero", genero.value)
    localStorage.setItem("newsletter", newsletter.value)
}
