let Bookshelf = require('../bookshelf')
let Post = require('../models/post')

let Posts = new Bookshelf.Collection()

Posts.model = Post

module.exports = Posts
