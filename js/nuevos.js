const productos = [
    {
        id: 10,
        nombre: "Conjunto de plush bordo",
        precio: "5500",
        descripcion: "Conjunto de plush bordo",
        talle: "Único",
        imagen: "../Assets/plush-bordo.jpeg",
    },
    {
        id: 11,
        nombre: "Conjunto de plush gris",
        precio: "5500",
        descripcion: "Conjunto de plush gris",
        talle: "Único",
        imagen: "../Assets/plush-gris.jpeg",
    },
]

let carrito = []

//Función para captar el click del usuario en el boton "Agregar al carrito" y ejecutar

const agregarAlCarrito = () => {
    let buttons = document.querySelectorAll(".card__product__btn")
    for (const card__product__btn of buttons) {
        card__product__btn.addEventListener("click", ()=> {
            const producto = productos.find(producto => producto.id == card__product__btn.id)
            carrito.push(producto)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            alert("Producto agregado al carrito")
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

const cargarProductos = (productos) => {
    let card = document.querySelector("#card")

    for (const producto of productos) {
        let article = document.createElement("article")
        article.setAttribute("class", "card__product")
        article.innerHTML = 
                    `
                        <img src="${producto.imagen}" alt="${producto.descripcion}"/>
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio}</p>
                        <p>Talle: ${producto.talle}</p>
                        <button class="card__product__btn" id="${producto.id}">Agregar a carrito</button>
                    `
                    card.appendChild(article)
    }
    agregarAlCarrito()
}
cargarProductos(productos)