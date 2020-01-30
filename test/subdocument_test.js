const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments',() => {
  it('can create a subdocument',(done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{title:'postTitle'}]
    });
    
    joe.save()
    .then(() => User.findOne({ name: 'Joe'}))
    .then((user)=>{
      assert(user.posts[0].title === 'postTitle');
      done();
    })
  });

  it('Can add subdocuments to an existing record',(done) =>{ 
  //Here we Create a user, fetch it, create a user and post,save it, fetch it and finally test it.
    const joe = new User({
      name:'Joe',
      posts:[]
    });
    joe.save()
    .then(() => User.findOne({name:'Joe'}))
    .then((user) => {
      user.posts.push({ title: 'New Post' });
      return user.save();
    })
    .then(()=>User.findOne({name:'Joe'}))
    .then((user)=>{
      assert(user.posts[0].title === 'New Post');
      done();
    });
  });

  it('can remove an existing subdocument',(done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });
    joe.save()
    .then(() => User.findOne({name:'Joe'}))
    .then((user) => {
      user.posts[0].remove(); //We can delete using JS but its gonna be big so mongoose prove remove()
      return user.save();
    })
    .then(()=>User.findOne({name:'Joe'}))
    .then((user)=>{
      assert(user.posts.length === 0);
      done();
    });


  });

});