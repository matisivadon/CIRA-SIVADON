import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products'
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

cartSchema.pre('find', function () {
    this.populate('products.product')
})


export const cartsModel = mongoose.model('cart', cartSchema)