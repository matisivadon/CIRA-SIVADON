import {productsModel} from '../models/products.model.js'

export default class ProductManager {

    async getProducts(limit, page, category, status, price) {
        try {
            if(!category || !status) {
                const products = await productsModel.paginate({},{limit, page, lean:true})
                return products
            }else {
                const products = await productsModel.paginate({$or:[{category}, {status}]},{limit, page, sort:{price}, lean:true})
                return products
            }
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

    async getProductById(pid) {
        try {
            const product = await productsModel.findById(pid)
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(pid, change) {
        try {
            const product = await productsModel.findByIdAndUpdate(pid, change, {new:true})
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(pid) {
        try {
            const product = await productsModel.findByIdAndDelete(pid)
            return product
        } catch (error) {
            console.log(error);
        }
    }
}