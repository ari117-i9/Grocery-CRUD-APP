const mongoose = require('mongoose')

const schema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please enter product name.']
    },
    quantity:{
        type: Number,
        required: true,
        default: 0
    },
    price:{
        type: Number,
        required: true,
        default: 0.00
    }
    
},
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', schema);
module.exports = Product;