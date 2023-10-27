const mongoose = require("mongoose")

const SpecificPostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
    subject:{
        type: String,
        required: true,
    },
    article:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    }
    },{timestamps: true});

module.exports = mongoose.model("SpecificPost", SpecificPostSchema)