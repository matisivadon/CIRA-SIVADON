let carrito = JSON.parse(localStorage.getItem("carrito"))
let tabla = document.querySelector("tbody")
let compra = document.querySelector("#btn_compra")
let vaciar = document.querySelector("#btn_vaciar")
let resetButton = document.querySelector("#reset")

function recuperoCarrito () {
    carrito.forEach(producto => {
        let fila = 
                    `               
                    <tr>
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.talle}</td>
                    <td><button type="reset" class="reset" id="reset">-</button></td>
                    </tr>
                    `
                    tabla.innerHTML += fila
                });
}

recuperoCarrito()


const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + parseInt(producto.precio), 0)

compra.addEventListener("click", () => {
    alert("Gracias por su compra, el total a pagar es de $" + totalCarrito)
} )



