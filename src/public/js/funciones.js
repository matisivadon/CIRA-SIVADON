let carrito = []
let products = []
let count = ''

//Función para captar el click del usuario en el boton "Agregar al carrito" y ejecutar

const agregarAlCarrito = () => {
    let buttons = document.querySelectorAll(".card__product__btn")
    for (const card__product__btn of buttons) {
        card__product__btn.addEventListener("click", ()=> {
            const product = products.find(prod => prod.id == card__product__btn.id)
            console.log(product);
            carrito.push(product)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            if(carrito.length > 0) {
                count = carrito.length
                let counter = document.querySelector('#counter')
                counter.innerText = count
            }
        })
    }
}

function recuperarCarrito() {
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    localStorage.getItem("carrito") && JSON.parse(localStorage.getItem("carrito"))
    if(carrito.length > 0) {
        count = carrito.length
        let counter = document.querySelector('#counter')
        counter.innerText = count
    }
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
                            <button class="card__product__btn" id="${product._id}">Agregar a carrito</button>
                           `
            if (nuevos!= null && product.category == "nuevo") {
                nuevos.appendChild(article)
            } else if (usados != null && product.category == "usado") {
                usados.appendChild(article)
        }
        }    
    agregarAlCarrito()       
}

        
        

// Obtener productos de la base de datos
const obtenerProductos = async () => {
    try {
        // const response = await fetch ('../bbdd/products.json')
        const response = await fetch('http://localhost:8080/api/products')
        const data = await response.json()
        products.push(...data.products.docs)
        cargarProductos(products)
    } catch (e) {
        console.log(e)
    }
}
obtenerProductos()