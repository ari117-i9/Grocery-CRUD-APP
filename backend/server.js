const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1'])
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const inventoryRoute = require('../routes/inventoryRoute')
const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/inventory', inventoryRoute)

mongoose.
connect(MONGO_URL)
.then(()=>{
    console.log('connected to mongoDB')
    app.listen(PORT, ()=>{
    console.log(`Inventory App is running on port 3000 ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
}
)
