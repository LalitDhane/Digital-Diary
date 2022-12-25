const express = require("express");
const _ = require('lodash')
require('dotenv').config()
const mongoose = require('mongoose')
const Post = require(__dirname+'/Models/post.js')
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

//setting the express app
const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

//Adding the connection string
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
  console.log('connected to db ..')
  app.listen(process.env.PORT||'3000',()=>{
  console.log("server started on port 3000")
})
}).catch((err)=>{
 console.log(err)
})



// website routes
app.get('/',async (req,res)=>{ 
  let posts = await Post.find({})
  res.render('home',{postcontent:posts,hcontent:homeStartingContent})
})
app.get('/about',(req,res)=>{
  res.render('about',{about:aboutContent})
})
app.get('/contact',(req,res)=>{
  res.render('contact',{contact:contactContent})
})
app.get('/compose',(req,res)=>{
  res.render('compose')
})


app.get('/:postId', (req, res) => {
  const requestedId = req.params.postId;
  Post.findById(requestedId, (err, post) => {
    res.render('post', {
      title: post.posttitle,
      content: post.postcontent
    })
  })
})


// post requests

app.post('/',(req,res)=>{
  let title = req.body.posttitle
  let text = req.body.posttext
  const newpost = new Post({
    posttitle:title,
    postcontent:text
  })
  newpost.save()
  res.redirect('/')
})

 
