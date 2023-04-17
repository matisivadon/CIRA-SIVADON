let carrito = JSON.parse(localStorage.getItem("carrito"))
const compra = document.querySelector("#btn_compra")
const vaciarCarrito = document.querySelector("#btn_vaciar")
let count = ''


const recuperoCarrito = () => {
    if(carrito.length >0) {
        count = carrito.length
        let counter = document.querySelector('#counter')
        counter.innerText = count
        let tabla = document.querySelector("tbody")
        tabla.innerHTML = ""
        carrito.forEach(product => {
            tabla.innerHTML += 
                        `               
                        <tr>
                        <td>${product.title}</td>
                        <td>$ ${product.price}</td>
                        <td>${product.size}</td>
                        <td><button class="reset" id="quitar${product.id}">-</button></td>
                        </tr>
                        `
                    })
    
        carrito.forEach(product => {
            const btnEliminar = document.querySelector(`#quitar${product.id}`)
            btnEliminar.addEventListener("click", () => quitarDelCarrito(`${product.id}`))
        })
    } else {
        return []
    }

}
recuperoCarrito()


const quitarDelCarrito = (id) => {
    const posicion = carrito.findIndex(product => product.id == id)
    carrito.splice(posicion, 1)
    localStorage.setItem("carrito", JSON.stringify(carrito))
    recuperoCarrito()
}


//Escuchar evento click en el boton Comprar
compra.addEventListener("click", () => {
    const totalCarrito = carrito.reduce((acumulador, product) => acumulador + parseInt(product.price), 0)
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