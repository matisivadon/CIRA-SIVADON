const Productos = [
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

//Función para crear el carrito



//Función para captar el click del usuario en el boton "Agregar al carrito"

const cargarEventos = () => {
    let buttons = document.querySelectorAll(".card__product__btn")
    for (const card__product__btn of buttons) {
        card__product__btn.addEventListener("click", ()=> {
            const producto = Productos.find(producto => producto.id == card__product__btn.id)
            console.log(producto)
        })
    }
}


//Función para cargar los productos desde JS a HTML

const cargarProductos = (Productos) => {
    let card = document.querySelector("#card")

    for (const producto of Productos) {
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
    cargarEventos()
}
cargarProductos(Productos)