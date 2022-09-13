const genero = document.querySelector("#genero")
const limpiarForm = document.querySelector("#limpiarForm")
const inputs = document.querySelectorAll("input")
const form = document.querySelector("form")
const enviar = document.querySelector("#enviar")


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
        confirm = confirm("¿Confirma el envío del formulario?")
        if (confirm == true) {
            alert("Formulario enviado")
        } else {
            alert("Se canceló el envío del formulario")
        }
})
