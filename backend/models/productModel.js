const { Double, Int32, Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const schema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter product name.']
    },
    quantity:{
        type: Int32,
        required: true,
        default: 0
    },
    price:{
        type: Double,
        required: true,
        default: 0.00
    },
    image:{
        type: String,
        required: false
    },
    timestamps: true
})

const Product = mongoose.model('Product', schema);
module.exports = Product;