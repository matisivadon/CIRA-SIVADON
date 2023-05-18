import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    size: {
        type:String,
        required: true
    },
    owner: {
        type: String,
        required: true,
    }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = mongoose.model('products', productsSchema)