const express = require("express");
const dotenv = require("dotenv").config()
const app = express()
const connectDb = require('../resource/database/connect')
const cors = require('cors')
const port = process.env.PORT
const cloudinary = require("cloudinary").v2


// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

connectDb()



//routes
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/services',require('./routes/serviceRoutes'))


app.listen(port,()=>console.log(`SERVER RUNNING ON PORT ${port}`))


