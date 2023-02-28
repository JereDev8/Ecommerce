import mongoose from 'mongoose'

const collection= 'carritos'

const schema= {
    listProducts: {
        type: Array,
        default: []
    }
}

const carritoModel= mongoose.model(collection, schema)

export default carritoModel