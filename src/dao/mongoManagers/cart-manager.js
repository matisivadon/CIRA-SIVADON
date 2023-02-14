import { cartsModel } from "../models/carts.model.js"

export default class CartManager {

    async getCart() {
        try {
            const carts = await cartsModel.find()
            return carts
        } catch (error) {
            console.log(error)
        }
    }

    async getCartById(cid) {
        try {
            const cart = await cartsModel.findById(cid).populate('products.id')
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


    async addProductToCart(cid, pid, quantity) {
        try {
            const cart = await cartsModel.findById(cid)
            cart.products.push({ id: pid })     
            cart.save()
            return cart
        } catch (error) {
            console.log(error);
        }
    }
}