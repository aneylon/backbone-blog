let Bookshelf = require('../bookshelf')

let Post = Bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  initialize () {
    this.on('creating', () => {
      console.log('creating new post')
    })
  }
})

module.exports = Post
