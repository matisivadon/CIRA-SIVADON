import { getCart, getCartById, addCart, addProductToCart, updateCart, updateQuantity, deleteProductFromCart, deleteCart} from "../services/cart.service.js"
import { findUserById } from "../services/users.service.js"

//views router
export async function getACartById(req, res) {
    const {cid} = req.params
    try {
        const cart = await getCartById(cid)
        res.render('carts', {
            cart,
            style: 'style.css'
        })
    } catch (error) {
        return error
    }
}

//carts router
export async function addACart(req,res){
    try {
        const cart = await addCart()
        res.json({message:'Carrito creado con éxito', cart})
    } catch (error) {
        return error
    }
}

export async function getOneCart(req,res) {
    const { cid } = req.params
    try {
        const cart = await getCart(cid)
        res.json({cart})
    } catch (error) {
        return error
    }
}

export async function addAProductToCart(req,res) {
    const { cid, pid } = req.params
    try {
        const cart = await addProductToCart(cid, pid)
        res.json({message:'Producto agregado con éxito', carrito: cart})
    } catch (error) {
        return error
    }
}

export async function updateACart(req, res) {
    const {cid} = req.params
    const {_id, infoProduct} = req.body
    try {
        const cart = await updateCart(cid, _id, infoProduct)
        res.json({message:'Carrito actualizado con éxito', carrito: cart})
    } catch (error) {
        return error
    }
}

export async function updateQuantityFromCart(req, res) {
    const {cid, _id} = req.params
    const {quantity} = req.body
    try {
        const cart = await updateQuantity(cid, _id, quantity)
        res.json({message:'Carrito actualizado con éxito', carrito: cart})
    } catch (error) {
        return error
    }
}


export async function deleteAProductFromCart(req,res) {
    const {cid, pid} = req.params
    try {
        const cart = await deleteProductFromCart(cid, pid)
        res.json({message: 'Producto eliminado con exito', carrito: cart})
    } catch (error) {
        return error
    }
}

export async function deleteACart(req, res) {
    const {cid} = req.params
    try {
        const cart = await deleteCart(cid)
        res.json({message:'Carrito eliminado con exito', carrito: cart})
    } catch (error) {
        return error
    }
}


//sessions router
export async function addCartToUser(req,res){
    const {idUser, _id} = req.params
    try {
        const cart = await getCartById(_id)
        if(!cart) return res.json({message:'Carrito no existe'})
        const user = await findUserById(idUser)
        if(!user) return res.json({message:'Usuario no existe'})
        const cartExists = user.cart.find(c => c._id == _id)
        if(cartExists) return res.json({message:'Este usuario ya tiene un carrito agregado'})
        user.cart.push(_id)
        user.save()
        return res.json({message:'Carrito agregado con exito', user})
    } catch (error) {
        console.log(error);
    }
}