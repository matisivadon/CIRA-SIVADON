import fs from "fs"
import {ProductManager} from "./index.js"

const newProduct = new ProductManager

class CartManager {
    constructor() {
        this.path = './bbdd/carts.json'
    }

    async getCart() {

        try {
            if (fs.existsSync(this.path)) {
                const readFile = await fs.promises.readFile(this.path, 'utf-8')
                const cart = JSON.parse(readFile)
                return cart
            } else {
                return []
            }
        }
        catch (error) {
            throw new Error(error)
        }
    }


    async #generateCartId() {
        const toGetCartId = await this.getCart()
        const id = toGetCartId.length === 0 ? 1 : toGetCartId[toGetCartId.length - 1].id + 1
        return id
    }

    async getCartById(cid) {
        try {
            const cart = await this.getCart()
            const cartId = await cart.find((cart) => cart.id === parseInt(cid))

            if (cartId) {
                return cartId
            } else {
                return 'Carrito no encontrado'
            }

        } catch (error) {
            throw new Error(error)
        }

    }

    async addCart() {
        const cart = {
            id: await this.#generateCartId(),
            products: []
        }
        try {
            const carts = await this.getCart()
            carts.push(cart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts))
            return cart
        } catch (error) {
            throw new Error(error)
        }
    }

    async addProductToCart(cid, pid, quantity) {

        const cart = await this.getCartById(cid)
        const getProduct = await newProduct.getProductById(pid)
        if (!getProduct) {
            return 'Producto no encontrado'
        } else {
            const index = cart.products.findIndex(products => products.product === parseInt(pid))
            if (index === -1) {
                const product = {
                    product: parseInt(pid),
                    quantity
                }
                cart.products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(cart))
            } else {
                cart.products.product[index].quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(cart))
            }
        }
    }
}

export default CartManager



