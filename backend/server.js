const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1'])
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const inventoryRoute = require('./routes/inventoryRoute')
const app = express()
const errorMiddleware = require('./middleware/errorMiddleware')
const cors = require('cors')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT
const FRONTEND = process.env.FRONTEND
var corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200
}

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions))
app.use('/api/inventory', inventoryRoute)
app.use(errorMiddleware)

mongoose.
connect(MONGO_URL)
.then(()=>{
    console.log('connected to mongoDB')
    app.listen(PORT, ()=>{
    console.log(`Inventory App is running on port ${PORT}`)
    })
}).catch((err)=>{
    console.log(err)
}
)
