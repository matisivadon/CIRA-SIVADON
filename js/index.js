const Productos = [
    {
        id: 4,
        nombre: "Camisa de encaje",
        precio: "1200",
        descripcion: "Camisa de encaje",
        talle: "1",
        imagen: "./Assets/camisa-encaje.jpeg",
    },
    {
        id: 5,
        nombre: "Top con volados",
        precio: "400",
        descripcion: "Top con volados",
        talle: "1",
        imagen: "./Assets/top-volados.jpeg",
    },
    {
        id: 9,
        nombre: "Sweater corto",
        precio: "1800",
        descripcion: "Sweater corto",
        talle: "Único",
        imagen: "./Assets/sweater-corto.jpeg",
    },
]

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
                        <a href="./pages/second-hand.html" class="card__product__btn">Ver más</a>
                    `
                    card.appendChild(article)
    }

}
cargarProductos(Productos)


//Validar que el dato ingresado sea un correo electronico
const email = document.querySelector("#mail")
email.addEventListener("input", (e) => {
    email.validity.typeMismatch ? email.setCustomValidity("¡Se esperaba una dirección de correo electrónico!") :  email.setCustomValidity("")
})    
     

//Escucha del evento click si se ingresa un mail valido
const enviarEmail = document.querySelector("#enviarEmail")
enviarEmail.addEventListener("click", () => {
    if(email.validity.valid) {
        localStorage.setItem("mail", email.value)
        alert("Se ha registrado exitosamente")
    } else {
        alert ("¡Se esperaba una dirección de correo electrónico!")
    }
})



