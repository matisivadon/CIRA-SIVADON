import fs from 'fs'

export class ProductManager {
    constructor() {
        this.products = []
        this.path = './bbdd/productos.json'
    }

    async addProducts(nombre, precio, descripcion, talle, imagen, estado, code) {
        const product = {
            id: this.#generarId(),
            nombre,
            precio,
            descripcion,
            talle,
            imagen,
            estado,
            code
        }
        try {
            if (nombre && precio && descripcion && talle && imagen && estado && code) {
                const validCode = this.#validarCode(code)
                if (validCode) {
                    return 'Código de producto repetido'
                } else {
                    this.products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
                }
            }
            else {
                return 'Debe completar todos los campos'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    #generarId() {
        return this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1
    }

    #validarCode(code) {
        return this.products.find(prod => prod.code === code)
    }

    async getProducts(limit) {
        try {
            if (fs.existsSync(this.path)) {
                const readProducts = await fs.promises.readFile(this.path, 'utf-8')
                const productsParse = JSON.parse(readProducts)
                if (limit === 'max') {
                    return productsParse
                } else {
                    return productsParse.slice(0, limit)
                }

            } else {
                return []
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async getProductById(id) {

        try {

            const productsParse = await this.getProducts()
            const productFound = await productsParse.find(product => product.id === parseInt(id))
            if (productFound) {
                return productFound
            }
            else {
                return 'Not Found'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateProduct(id, change) {
        try {
            let arrayProducts = await this.getProducts()
            let modifiedProduct = await this.getProductById(id)
            if (modifiedProduct) {
                modifiedProduct = { ...modifiedProduct, ...change }
                arrayProducts = arrayProducts.map(product => {
                    if (product.id === modifiedProduct.id) {
                        product = modifiedProduct
                    }
                    return product
                })
                arrayProducts = JSON.stringify(arrayProducts)
                await fs.promises.writeFile(this.path, arrayProducts)
                return arrayProducts
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const productsParse = await this.getProducts()
            const deletedProduct = await this.getProductById(id)
            if (deletedProduct) {
                const newArray = productsParse.filter(prod => prod.id != id)
                await fs.promises.writeFile(this.path, JSON.stringify(newArray))
                return newArray
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

const newProduct = new ProductManager()
const loadProducts = async () => {

    //Carga de productos
    await newProduct.addProducts(
        "Buzo de lanilla con capucha",
        "1000",
        "Buzo de lanilla con capucha",
        "1",
        "../Assets/buzo-lanilla.JPG",
        "usado",
        "U01"
    )
    await newProduct.addProducts(
        "Remera Le Utthe",
        "500",
        "Remera Le Utthe",
        "S",
        "../Assets/remera-leutthe.JPG",
        "usado",
        "U02"
    )
    await newProduct.addProducts(
        "Sweater coral",
        "800",
        "Sweater coral",
        "Único",
        "../Assets/sweater-coral.jpg",
        "usado",
        "U03"
    )
    await newProduct.addProducts(
        "Camisa de encaje",
        "1200",
        "Camisa de encaje",
        "1",
        "../Assets/camisa-encaje-2.jpeg",
        "usado",
        "U04"
    )
    await newProduct.addProducts(
        "Top con volados",
        "400",
        "Top con volados",
        "1",
        "../Assets/top-volados.jpeg",
        "usado",
        "U05"
    )
    await newProduct.addProducts(
        "Remera de fibrana estampada",
        "500",
        "Remera de fibrana estampada",
        "Único",
        "../Assets/remera-fibrana-estampada.jpeg",
        "usado",
        "U06"
    )
    await newProduct.addProducts(
        "Parka",
        "5000",
        "Parka",
        "44",
        "../Assets/parka.JPG",
        "usado",
        "U07"
    )
    await newProduct.addProducts(
        "Polera",
        "800",
        "Polera",
        "Único",
        "../Assets/polera.jpeg",
        "usado",
        "U08"
    )
    await newProduct.addProducts(
        "Sweater corto",
        "1800",
        "Sweater corto",
        "Único",
        "../Assets/sweater-corto.jpeg",
        "usado",
        "U09"
    )
    await newProduct.addProducts(
        "Conjunto de plush bordo",
        "5500",
        "Conjunto de plush bordo",
        "Único",
        "../Assets/plush-bordo.jpeg",
        "nuevo",
        "N01"
    )
    await newProduct.addProducts(
        "Conjunto de plush gris",
        "5500",
        "Conjunto de plush gris",
        "Único",
        "../Assets/plush-gris.jpeg",
        "nuevo",
        "N02"
    )


    //No permite carga de productos con codigo repetido
    // console.log(await newProduct.addProducts(
    //     "Conjunto de plush azul",
    //     "5500",
    //     "Conjunto de plush azul",
    //     "Único",
    //     "../Assets/plush-gris.jpeg",
    //     "nuevo",
    //     "N02"
    // ))

    //No permite carga de productos con datos incompletos
    // console.log(await newProduct.addProducts(
    //         "Conjunto de plush azul",
    //         "5500",
    //         "Conjunto de plush azul",
    //         "Único",
    //         "nuevo",
    //         "N03"
    //     ))

    // Obtener todos los productos
    // console.log(await newProduct.getProducts())

    // Obtener un producto por ID
    // console.log(await newProduct.getProductById(2))
    // console.log(await newProduct.getProductById(12))

    // Modificar un producto ingresando ID y el campo a modificar
    // console.log(JSON.parse(await newProduct.updateProduct(10, { 'precio': '7000' })))

    //Eliminar un productos por ID
    // console.log(await newProduct.deleteProduct(3))
}
loadProducts()



