const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tasks : {
        type : [String],
        required : true
    },
    from : {
        type : String,
        require : true
    },
    to : {
        type : String,
        require : true
    },
    completed : {
        type : Number,
        require : true
    },
    duration : {
        type : Number,
        require : true
    },
    status : {
        type : String,
        require : true
    },
    frequency : {
        type : String,
        require : true
    },

})

const Post = mongoose.model("Post" , postSchema)

module.exports = Post;