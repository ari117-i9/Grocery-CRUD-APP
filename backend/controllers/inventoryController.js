const Product = require("../models/productModel")
const asyncHandler = require('express-async-handler')

const getInventory = asyncHandler(async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)  
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
        
    }
})

const getProduct = asyncHandler(async(req, res)=>{
    try {
        const {id} = req.params
        const inventory = await Product.findById(id)
        res.status(200).json(inventory)  
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
        
        
    }
})

const addInventory = asyncHandler(async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const updateInventory = asyncHandler(async(req, res)=>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            res.status(404);
            throw new Error(`cannot find product with ID:${id}`)
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

const deleteInventory = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id, req.body)
        if(!product){
            res.status(404);
            throw new Error(`cannot find product with ID:${id}`)
        }
        res.status(200).json();
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

module.exports = {
    getInventory, getProduct, addInventory, updateInventory, deleteInventory
}