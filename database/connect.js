const mongoose = require("mongoose")

const connectDb = async (req,res) => {
 try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DATABASE CONNECTED")
 } catch(err){
    console.log(err)
    process.exit(1)
 }
}

module.exports = connectDb