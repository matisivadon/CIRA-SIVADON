import fs from "fs"

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

        const carts = await this.getCart()
        const cart = carts.find((cart) => cart.id === parseInt(cid))
        if (!cart) {
            return 'Carrito no encontrado'
        } else {
            const index = carts.indexOf(cart);
            if (carts[index].products.find((p) => p.id === parseInt(pid))) {
                const indexP =
                    carts[index]
                        .products.indexOf(carts[index]
                            .products.find((p) => p.id === parseInt(pid)));
                carts[index].products[indexP].quantity += quantity;
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                return carts[index].products[indexP];
            } else {
                const id = parseInt(pid);
                const product = {
                    id: id,
                    quantity: quantity
                }
                carts[index].products.push(product);
                await fs.promises.writeFile(this.path, JSON.stringify(carts));
                return product;
            }
        }
    }
}

export default CartManager



