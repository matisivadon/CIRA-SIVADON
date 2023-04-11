import ProductManager from "../DAL/mongoManagers/product-manager.js"

const productManager = new ProductManager()

export async function getProducts(limit, page, category, status, price) {
    try {
        const products = await productManager.getProducts(limit, page, category, status, price)
        return products
    } catch (error) {
        return error
    }
}

export async function addProducts(objProduct) {
    try {
        const product = await productManager.addProducts(objProduct)
        return product
    } catch (error) {
        return error
    }
}


export async function getProductById(pid) {
    try {
        const product = await productManager.getProductById(pid)
        return product
    } catch (error) {
        return error
    }
}

export async function updateProduct(pid, change) {
    try {
        const product = await productManager.updateProduct(pid, change)
        return product
    } catch (error) {
        return error
    }
}

export async function deleteProduct(pid) {
    try {
        const product = await productManager.deleteProduct(pid)
        return product
    } catch (error) {
        return error
    }
}