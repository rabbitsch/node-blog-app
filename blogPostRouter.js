const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model')

router.get('/', function(req,res){
  res.json(BlogPosts.get());
});


//post blogs
router.post('/', jsonParser,function(req,res){
  const requiredFields = ['title','content','authorName'];
  for(let i=0;i<requiredFields.length;i++){
    const field =requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing ${field} in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(req.body.title, req.body.content, req.body.authorName);
  res.status(201).json(item);
});

// Delete blogs
router.delete('/:id', function(req,res){
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog ${req.params.ID}`);
  res.status(204).end();
});

//put request
router.put('/:id', jsonParser, function(req,res){
  const requiredFields = ['title','content','author'];
  for(let i=0; i<requiredFields.length;i++){
    const field = requiredFields[i];
    if(!(field in req.body)){
      const message = `Missing\`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if(req.params.id !== req.body.id){
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id} must match`);
      console.error(message);
      return res.status(400).send(message);
  }
  console.log(`updating blog \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.params.title,
    content: req.params.content
  });
  res.status(204).end();
})

module.exports = router;
