import { getProducts, getProductById, addProducts, updateProduct, deleteProduct } from "../services/products.service.js"

//views router
export async function getAllProducts(req, res) {
    const {limit=11, page=1, category, status, price} = req.query
    try {
        const products = await getProducts(limit, page, category, status, price)
        res.render('products',{
            email: req.session.email,
            products,
            style: 'style.css'
        })
    } catch (error) {
        return error
    }
}


//products router
export async function getAllTheProducts(req, res){
    const {limit= 10, page= 1, category, status, price} = req.query
    try {
        const products = await getProducts(limit, page, category, status, price)
        res.json({
            status: products.lenght === 0? 'Error' : 'Success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.prevPage? true : false,
            hasNexPage: products.nextPage? true : false,
            prevLink: products.hasPrevPage? `localhost:8080/api/products?page=${products.prevPage}` : null,
            nextLink: products.hasNextPage?`localhost:8080/api/products?page=${products.nextPage}` : null,
        })
    } catch (error) {
        return error
    }
}

export async function getAProductById(req, res){
    const { pid } = req.params
    try {
        const product = await getProductById(pid)
        res.json({ product })
    } catch (error) {
        return error
    }
}

export async function addAProduct(req, res) {
    const {title, description, code, price, status, stock, category, image, size} = req.body
    try {    
        if(!title || !description || !code || !price || !status || !stock || !category || !image || !size) {
            res.json({message:'Debe completar todos los datos'})
        } else {
            const product = await addProducts({title, description, code, price, status, stock, category, image, size})
            res.json({message:'producto agregado con éxito',product: product})
        }
    } catch (error) {
        return error
    }
}

export async function updateAProduct(req, res){
    const {pid} = req.params
    const change = req.body
    try {
        const product = await updateProduct(pid, change)
        res.json({message:'producto actualizado con éxito',product})
    } catch (error) {
        return error
    }
}

export async function deleteAProduct(req, res) {
    const {pid} = req.params
    try {
        const product = await deleteProduct(pid)
        res.json({message:'producto eliminado con éxito',product})
    } catch (error) {
        return error
    }
}