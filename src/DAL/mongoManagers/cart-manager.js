import { cartsModel } from "../models/carts.model.js"

export default class CartManager {

    async getCart(_id) {
        try {
            const carts = await cartsModel.find(_id)
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(_id) {
        try {
            const cart = await cartsModel.findById(_id)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addCart(objCart) {
        try {
            const cart = await cartsModel.create(objCart)
            return cart
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cid, _id) {
        try {
            if (!cid) {
                return 'Carrito no encontado'
            } else {
                const cart = await cartsModel.findById(cid)
                const productIndex = cart.products.findIndex(product => product.product.toString() === _id)
                if (productIndex >= 0) {
                    cart.products[productIndex].quantity += 1
                    cart.save()
                    return cart
                } else {
                    cart.products.push({ product: _id })
                    cart.save()
                    return cart
                }
            } 
            
        }   catch (error) {
            console.log(error);
        }
    }


    async updateCart(cid, _id, infoProduct) {
        try {
            const cart = await cartsModel.findById(cid)
            cart.products.push({ product: _id, ...infoProduct })
            cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async updateQuantity(cid, _id, quantity) {
        try {
            const cart = await cartsModel.findById(cid)
            const productIndex = cart.products.findIndex(product => product.product.toString() === _id)
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity
                cart.save()
                return cart
            } else {
                return 'Producto no encontrado'
            }
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await cartsModel.findById(cid)
            const index = cart.products.findIndex(p => p.product == pid)
            cart.products.splice(index, 1)
            cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCart(cid) {
        try {
            const cart = await cartsModel.findByIdAndDelete(cid)
            return cart
        } catch (error) {
            console.log(error);
        }
    }
}