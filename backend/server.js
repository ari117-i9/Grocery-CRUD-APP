const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json)

//routes
app.get('/', async(req, res)=>{
    res.send('hello node api, whats up, yo sup')
})

app.post('/product', (req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.
connect('mongodb+srv://admin:%40dmin4321@cluster0.c23zfgi.mongodb.net/?appName=Cluster0')
.then(()=>{
    console.log('connected to mongoDB')
    app.listen(3000, ()=>{
    console.log('Inventory App is running on port 3000')
    })
}).catch((err)=>{
    console.log(err)
}
)
