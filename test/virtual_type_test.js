const assert = require('assert');
const User = require('../src/user');

describe('Virtual type', () => {
  it('postCount returns number of posts', (done) => {
    const joe = new User({
      name: 'joe',
      posts: [{title: 'PostTitle'}]
    });

    joe.save()
    .then(()=> User.findOne({ name: 'Joe'}))
    .then((user) => {
      assert(joe.postCount === 1);
      done();
    })
  })
})