import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
    full_name: {
        type: String
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true,
        default: 0
    },
    password: {
        type: String,
        required: true,
        default: ' '
    },
    cart: {
        type: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cart'    
            }
        ],
        default: []
    },
    role: {
        type: String,
        required: true
    }
})
export const usersModel = mongoose.model('users', usersSchema)