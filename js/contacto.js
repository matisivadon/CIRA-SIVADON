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
    if (e.key === "Enter") {
    e.preventDefault()
    console.log("Se evito el envīo del formulario")
    }
})

//Ejecutar click cuando el usuario clickea "Enviar formulario"

enviar.addEventListener("click", () => {
    debugger
        confirm = confirm("¿Confirma el envío del formulario?")
        if (confirm == true) {
            alert("Formulario enviado")
            guardarDatos()
        } else {
            alert("Se canceló el envío del formulario")
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
