const mongoose = require('mongoose');

mongoose.Promise = global.Promise; //Default promise from the library. 

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
  .once('open',()=> {done();})
  .on('error',(error)=>{
    console.warn('Warning', error);
  });
});

beforeEach((done)=>{
  mongoose.connection.collections.users.drop(()=>{
    done();
  });
});