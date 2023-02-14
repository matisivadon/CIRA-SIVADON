import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
                { 
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'products',
                    },
                    quantity: {
                        type: Number,
                        required: true,
                        default: 1
                    }
                }
            ],
        default: []
    } 
})


export const cartsModel = mongoose.model('cart', cartSchema)