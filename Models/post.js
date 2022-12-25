const mongoose = require('mongoose')

//defining the schema
const postSchema = mongoose.Schema({
  posttitle:{
    type:String,
    required: true
  },
  postcontent:{
    type:String,
    required:true
  }
})

//creating a model
const Post = mongoose.model('Post',postSchema)

//exporting the model
module.exports = Post
