const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profile:{
        type:String,
        require:false,
        default:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHUAAAB1CAMAAABH2l6OAAAAMFBMVEXh4eGjo6OgoKDk5OSpqanT09OsrKzDw8PY2Njd3d2dnZ22trawsLCzs7PLy8u/v798jG1aAAACj0lEQVRoge2a3ZKDIAyFgQBBQXz/t11oa3e7VZCf2N0ZzoXt9KLfJEJCjjI2NDQ0NDQ09EcEAM/rVUimcNFSSr2gYteAYUIphOBR4VPidAUX+Z24SXCkRoJxr8wb1xnScEHxd2gMVxFiA/RIdFgwh1DO6ZIsE1RJxIR1754+7+1KE6xJQQPWUEDBZqiWItgpyYya+kPBp0MNwfr+weYSTJTi1La5i2LzZKGc94dOuQSHFPdfTpndeqP237GfoX4mw59ZTeCyUEdQJTBbJZCgSmSXE0nTAZ2haoqekyv/FMU/SifPEpqEmTohRlGdElPLmGQBP3TYY4UlYx5jaaGM7Z5OxUoLDUtK/uYKSTnlPLBxlPwGizhIXjHAAng7B4l4sf4ylwAAJuW9V9OlzsQDfS1waGjoPwk2XcdjRnlco9ArQ16kwv8rtFKIWWwK36RFRUUOf6tWGTrNjnsZuo9cFetOBuYXsQP8iRaL79lpQ14tTyKfHd6qTgGHMPUJ5AbWPQIOzLeDUgYsm7mgkmPGAVc3Ht+y1tYBt+F8DKYi0C3cWpf6wOQ/ia2ctkDVM2/cKuwJqyeDrTCCYOfBTSG1wpNRcyOU81kVh7o0QzlfSoPN++1nVHpnTXuCQ4qLHai89Z1XuTneIdjyUBlgK3ausWVgaaxNxSv4ruraf4PWem1TYT9/gcpaYxzqsQFa3dirsS3QiK26t0K3vs2wlG+geWlDspp9W7VP37DvHl5Kvfw92LcsD6Brt6kDjDuX5rnvWyKg3Jx9sjK73uZpmCNt8qAaJysC8xTAoN4f7cKPGg3VyA7MoJNcvPjDgkuHhtYjjq6ER+viq1xSamfRm/5D+gH6wbnQhRkaGhoaGhrK6AvXExWr273fOAAAAABJRU5ErkJggg=='
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    emailVerified:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)