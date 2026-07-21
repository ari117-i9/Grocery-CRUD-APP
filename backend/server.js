const express = require('express')
const mongoose = require('mongoose')
const app = express()

//routes
app.get('/', (req, res)=>{
    res.send('hello node api, whats up, yo sup')
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
