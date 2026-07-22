const Product = require("../models/productModel")

const getInventory = async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)  
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

const getProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const inventory = await Product.findById(id)
        res.status(200).json(inventory)  
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
}

const addInventory = async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}

const updateInventory = async(req, res)=>{
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
}

const deleteInventory = async(req, res) =>{
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
}

module.exports = {
    getInventory, getProduct, addInventory, updateInventory, deleteInventory
}