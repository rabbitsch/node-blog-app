const mongoose = require('mongoose');

mongoose.promise = global.promise;

const Schema = mongoose.Schema;

const blogSchema = new Schema({
        title: {type: string},
        authorName:{
          firstname: {type: string},
          lastname: {type: string}
        },
        content:{type:tring},
        created: {type:Date, default:date.now}
    });



//the coolest thing ever.. combines name
blogSchema.virtual('authorname').get(function(){
  return `${this.authorName.firstname} ${this.authorName.lastname}`.trim();
});

module.exports = mongoose.model('Blog', blogSchema);
