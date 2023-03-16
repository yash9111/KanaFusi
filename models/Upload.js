const mongoose = require('mongoose');

const UploadImage = new mongoose.Schema({
    title : {
        type :String,
        required : true
    },
    description : {
        type :String,
        required : true
    },
    pic : {
        data : Buffer,
        contentType : String
    },
})

module.exports = mongoose.model("UploadImage",UploadImage)