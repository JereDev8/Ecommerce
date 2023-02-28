import mongoose from 'mongoose'

const collection= 'products'

const schema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price:{
        type:Number,
        required: true
    },
    thumbnail:{
        type: String,
        required:true
    }
})

const productModel= mongoose.model(collection, schema)

export default productModel