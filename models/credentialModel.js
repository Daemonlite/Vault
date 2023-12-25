const mongoose = require("mongoose");


const credentialSchema = new mongoose.Schema({
    service:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Service"
    },
    cred_type:{
        type:String,
        require:true
    },
    cred_value:{
        type:String,
        require:true
    },

},{
    timestamps:true
})

module.exports = mongoose.model('Credential',credentialSchema)