const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1'])
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())

//routes
app.get('/inventory', async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)  
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.get('/inventory/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const products = await Product.findById(id)
        res.status(200).json(products)  
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.post('/inventory', async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/inventory/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(400).json({message: `cannot find product with ID:${id}`})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.delete('/inventory/:id', async(req, res) =>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id, req.body)
        if(!product){
            return res.status(400).json({message: `cannot find product with ID:${id}`})
        }
        res.status(200).json();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.
connect('mongodb+srv://admin:%40dmin4321@cluster0.c23zfgi.mongodb.net/Inventory?appName=Cluster0')
.then(()=>{
    console.log('connected to mongoDB')
    app.listen(3000, ()=>{
    console.log('Inventory App is running on port 3000')
    })
}).catch((err)=>{
    console.log(err)
}
)
