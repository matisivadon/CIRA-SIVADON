const Productos = [
    {
        id: 1,
        nombre: "Buzo de lanilla con capucha",
        precio: "1000",
        descripcion: "Buzo de lanilla con capucha",
        talle: "1",
        imagen: "../Assets/buzo-lanilla.JPG",
    },
    {
        id: 2,
        nombre: "Remera Le Utthe",
        precio: "500",
        descripcion: "Remera Le Utthe",
        talle: "S",
        imagen: "../Assets/remera-leutthe.JPG",
    },
    {
        id: 3,
        nombre: "Sweater coral",
        precio: "800",
        descripcion: "Sweater coral",
        talle: "Único",
        imagen: "../Assets/sweater-coral.jpg",
    },
    {
        id: 4,
        nombre: "Camisa de encaje",
        precio: "1200",
        descripcion: "Camisa de encaje",
        talle: "1",
        imagen: "../Assets/camisa-encaje-2.jpeg",
    },
    {
        id: 5,
        nombre: "Top con volados",
        precio: "400",
        descripcion: "Top con volados",
        talle: "1",
        imagen: "../Assets/top-volados.jpeg",
    },
    {
        id: 6,
        nombre: "Remera de fibrana estampada",
        precio: "500",
        descripcion: "Remera de fibrana estampada",
        talle: "Único",
        imagen: "../Assets/remera-fibrana-estampada.jpeg",
    },
    {
        id: 7,
        nombre: "Parka",
        precio: "5000",
        descripcion: "Parka",
        talle: "44",
        imagen: "../Assets/parka.JPG",
    },
    {
        id: 8,
        nombre: "Polera",
        precio: "800",
        descripcion: "Polera",
        talle: "Único",
        imagen: "../Assets/polera.jpeg",
    },
    {
        id: 9,
        nombre: "Sweater corto",
        precio: "1800",
        descripcion: "Sweater corto",
        talle: "Único",
        imagen: "../Assets/sweater-corto.jpeg",
    },
]

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