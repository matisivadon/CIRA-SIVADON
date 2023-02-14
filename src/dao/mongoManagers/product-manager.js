import {productsModel} from '../models/products.model.js'

export default class ProductManager {

    async getProducts(limit) {
        try {
            const products = await productsModel.find()
            return products
        } catch (error) {
            console.log(error);
        }
    }

    async addProducts(objProduct) {
        try {
            const newProduct = await productsModel.create(objProduct)
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id) {
        try {
            const product = await productsModel.findById(id)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, change) {
        try {
            const product = await productsModel.findByIdAndUpdate(id, change, {new:true})
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id) {
        try {
            const product = await productsModel.findByIdAndDelete(id)
            return product
        } catch (error) {
            console.log(error);
        }
    }
}