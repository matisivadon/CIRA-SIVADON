let carrito = []
let productos = []

//Función para captar el click del usuario en el boton "Agregar al carrito" y ejecutar

const agregarAlCarrito = () => {
    let buttons = document.querySelectorAll(".card__product__btn")
    for (const card__product__btn of buttons) {
        card__product__btn.addEventListener("click", ()=> {
            const producto = productos.find(producto => producto.id == card__product__btn.id)
            carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            AlertaAlAgregar()
        })
    }
}

function recuperarCarrito() {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    localStorage.getItem("carrito") && JSON.parse(localStorage.getItem("carrito")) 
}
recuperarCarrito()


//Función para cargar los productos desde JS a HTML

const cargarProductos = (products) => {
    let nuevos = document.querySelector("#nuevos")
    let usados = document.querySelector("#usados")
        for (const product of products) {

            let article = document.createElement("article")
            article.setAttribute("class", "card__product")
            article.innerHTML = 
                        `
                            <img src="${product.image}" alt="${product.description}"/>
                            <h3>${product.title}</h3>
                            <p>$${product.price}</p>
                            <p>Talle: ${product.size}</p>
                            <button class="card__product__btn" id="${product.id}">Agregar a carrito</button>
                           `
            if (nuevos!= null && product.category == "nuevo") {
                nuevos.appendChild(article)
            } else if (usados != null && product.category == "usado") {
                usados.appendChild(article)
        }
    }    
    agregarAlCarrito()
    }



//Mensaje de alerta cuando el usuario clickea "agregar al carrito"
const AlertaAlAgregar = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto agregado al carrito',
        showConfirmButton: false,
        timer: 1000,
      })
}

//Obtener productos del json
const obtenerProductos = async () => {
    try {
        const response = await fetch ('../../bbdd/products.json')
        const data = await response.json()
        cargarProductos(data)
        productos.push(...data)
    } catch (e) {
        console.log(e)
    }
}
obtenerProductos()
