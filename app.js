const express = require('express');
const app = express();

const path= require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// const blogPosts = [];


const mongoose=require('mongoose');
mongoose.connect(
    "mongodb://localhost:27017/blogdb"
)

const database=mongoose.connection;
database.on("error",(error)=>
{
    console.log(error)
})
database.once("connection",()=>
{
    console.log("database connected")
})

const blogs=require('./models/schema.js')


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'blog.html'))
})

app.get('/submitted', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'submit.html'))
})

app.get('/view', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'view.html'))
})

app.get('/viewallblogs', (req, res) => {
    res.send(blogPosts)
})

app.get('/blog/:id', (req,res) => {
    // const id = req.params.id;
    // const blogs = blogPosts.find((blog) => blog.BlogID == id);
    // if (!blogs) {
    //   return res.status(404).send("Blog not found");
    // }
  
    res.sendFile(path.join(__dirname, 'public', 'view.html'));
})

app.get('/api/blog/:id', async (req,res) => {
    try{
    const id = req.params.id;
    // const blogs = blogPosts.find(blog => blog.BlogID == id);
    // if (!blogs) {
    //     return res.status(404).json({ error: 'Blog not found' });
    // }
    // res.json(blogs);
    const details=await blogs.findOne({BlogID:id})
    console.log(details);
    res.json(details);
}
    catch(error){

    }
})

app.post('/blog', async(req,res) => {
    try{
    const {BlogID, title, author, content } = req.body;
    console.log(req.body);
    const newPost = {BlogID, title, author, content };
    // blogPosts.push(newPost);
    // console.log(blogPosts);

    const details=await blogs.create(newPost);
    console.log(details)
    res.redirect('/submitted');
    }
    catch(error){
        console.log(error)
    }
})

app.listen(3004, () => {
    console.log("The server is starting in 3002")
})