const chai = require('chai');
const chaiHttp = require('chai-http');


// const {blogPostRouter} = require('/blogPostRouter.js');

const {app, closeServer, runServer} = require('../server');
// console.log(require('../server'));
const should = chai.should;
chai.use(chaiHttp);


describe('BlogPost', function(){


before(function(done){
  console.log('i made it here before run ')
   runServer().then(function(){
     console.log('i made it here after run')
     done();
   }).catch(function(error){
     console.log(error, 'before error')
   })
});


after(function(done){
   closeServer().then(function(){
     done();
   }).catch(function(error){
     console.log(error,'after error')
   })
});

  it('should test my get endpoint', function(){
    return chai.request(app)
      .get('/blogPostRouter')
      .then(function(res){
        res.should.have.a.status(201)
        res.should.be.a.json;
        const expectedKeys = ["authorName","title","content"]
          res.body.forEach(data => {
            should(data).include.keys(expectedKeys);
          });
      });
    });

  it('should test my POST endpoint', function(){
    const objTest = {
      "title": "worm",
      "content": "slimy",
      "authorName": "ladydog"
    }
    return chai.request(app)
      .post('/blogPostRouter')
      .send(objTest)
      .then(res =>{
        res.should.have.status(200);
        res.body.should.be.a('object');
      });
  });

  it('should test my PUT endpoint', function(){
    const updatedObj = {
      "title": "snake",
      "content": "slithery",
      "authorName": "ladydogeastflys"
    }
    return chai.request(app)
      .get('/blogPostRouter')
      .then(function(res){
        updatedObj.id = res.body[0].id
        return chai.request(app)
          .put(`/blogPostRouter/${updatedObj.id}`)
          .send(updatedObj)
      })
      .then(function(res){
        res.should.have.status(204);
      });
  });

  it('should test my Delete', function(){
    return chai.request(app)
      .get('/blogPostRouter')
      .then(res => {
        return chai.request(app)
          .delete(`/blogPostRouter/${object.body.id}`)
      })
      .then(res => {
        res.should.have.status(204);
      })
      done();
  });

});
