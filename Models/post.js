const mongoose = require('mongoose')

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

const Post = mongoose.model('Post',postSchema)

module.exports = Post