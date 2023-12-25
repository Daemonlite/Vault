const mongoose = require("mongoose")

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Service',serviceSchema)