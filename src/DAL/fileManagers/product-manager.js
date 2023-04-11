import fs from 'fs'
import {__dirname} from '../../utils.js'


export default class ProductManager {
    constructor() {
        this.path = __dirname + '/bbdd/products.json'
    }

    async addProducts(title, description, code, price, status, stock, category, image, size) {
        try {
        const product = {
            id: await this.#generarId(),
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            image,
            size
        }
            if (title && description && code && price && status && stock && category && image && size) {
                const validCode = await this.#validarCode(code)
                if (validCode) {
                    return 'Código de producto repetido'
                } else {
                    const products = await this.getProducts('max')
                    products.push(product)
                    await fs.promises.writeFile(this.path, JSON.stringify(products))
                    return product
                }
            }
            else {
                return 'Debe completar todos los campos'
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async #generarId() {
        const products = await this.getProducts('max')
        return products.length === 0 ? 1 : products[products.length - 1].id + 1
    }

    async #validarCode(code) {
        const products = await this.getProducts('max')
        return products.find(prod => prod.code === code)
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
                await fs.promises.writeFile(this.path, JSON.stringify(arrayProducts))
                return modifiedProduct
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
                return deletedProduct
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}





