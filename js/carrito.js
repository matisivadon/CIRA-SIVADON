let carrito = JSON.parse(localStorage.getItem("carrito"))
const compra = document.querySelector("#btn_compra")
const vaciarCarrito = document.querySelector("#btn_vaciar")


const recuperoCarrito = () => {
    if(carrito) {
        let tabla = document.querySelector("tbody")
        tabla.innerHTML = ""
        carrito.forEach(producto => {
            tabla.innerHTML += 
                        `               
                        <tr>
                        <td>${producto.id}</td>
                        <td>${producto.nombre}</td>
                        <td>$ ${producto.precio}</td>
                        <td>${producto.talle}</td>
                        <td><button class="reset" id="quitar${producto.id}">-</button></td>
                        </tr>
                        `
                    })
    
        carrito.forEach(producto => {
            const btnEliminar = document.querySelector(`#quitar${producto.id}`)
            btnEliminar.addEventListener("click", () => quitarDelCarrito(`${producto.id}`))
        })
    } else {
        return []
    }

}
recuperoCarrito()


const quitarDelCarrito = (id) => {
    const posicion = carrito.findIndex(producto => producto.id == id)
    carrito.splice(posicion, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    recuperoCarrito()
}


//Escuchar evento click en el boton Comprar
compra.addEventListener("click", () => {
    const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + parseInt(producto.precio), 0)
    alertaCompra('Gracias por su compra! El total a pagar es de $' + totalCarrito)
    localStorage.clear()
    })


const alertaCompra = (mensaje) => {
    Swal.fire({
        title: mensaje,
        showConfirmButton: false,
        showCloseButton: true,
        html: `<a href="../index.html"><button>Confirmar</button></a>`
      })
}


// Escuchar evento click en el boton "vaciar carrito"
vaciarCarrito.addEventListener("click", () => {
    localStorage.clear()
    location.href = "../index.html"
})