// const express = require('express');
// const cors = require('cors');
// const app = express();
// const port = 5000; 
// const path = require("./posts.json")
// const fs = require('fs')

// app.use(express.json());
// app.use(cors()); 



// const postFilePath = path.join(__dirname, "posts.json")
// const readPosts=()=>JSON.parse(fs.readFileSync(postFilePath))
// const writePosts = () => fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');


// app.get('/posts', (req, res) => {
//     res.json(posts);
// });

// app.post('/posts', (req, res) => {
//     const newPost = req.body;
//     const posts = readPosts()
//     posts.push(newPost);
//     writePosts(posts)
//     res.status(201).json(newPost); 
// });

// app.listen(port, () => {
//     console.log(` app listening on port ${port}`);
// });



const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');  // Use 'path' module to handle file paths
const app = express();
const port = 5000; 

// Define the path to the JSON file
const postsFilePath = path.join(__dirname, 'posts.json');

// Middleware
app.use(express.json());
app.use(cors()); 

// Function to read posts from the file
const readPosts = () => {
  if (fs.existsSync(postsFilePath)) {
    return JSON.parse(fs.readFileSync(postsFilePath, 'utf-8'));
  } else {
    return []; // Return an empty array if the file does not exist
  }
};

// Function to write posts to the file
const writePosts = (posts) => {
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf-8');
};

// GET endpoint to fetch posts
app.get('/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// POST endpoint to add a new post
app.post('/posts', (req, res) => {
  const newPost = req.body;
  const posts = readPosts();
  posts.push(newPost);
  writePosts(posts);
  res.status(201).json(newPost); 
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
