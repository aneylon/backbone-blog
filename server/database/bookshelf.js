let Bookshelf = require('bookshelf')
let path = require('path')

let knex = require('knex')({
  client: 'sqlite',
  connection: {
    host: '127.0.0.1',
    // user: 'admin',
    // password: 'password',
    charset: 'utf8',
    database: 'backboneblog',
    filename: path.join(__dirname, './store/backboneblog1.sqlite')
  }
})

knex.schema.hasTable('posts').then(function(exists){
  if(!exists) {
    knex.schema.createTable('posts', function(post){
      post.increments('id').primary()
      post.string('title', 255)
      post.string('text', 255)
      post.integer('userId')
      post.timestamps()
    }).then(function(table){
      console.log('Created Table', table)
    })
  }
})

knex.schema.hasTable('users').then(function(exists){
  if(!exists) {
    knex.schema.createTable('users', function(user) {
      user.increments('id').primary()
      user.string('username', 100)//.unique()
      user.string('password', 100)
      user.timestamps()
      user.unique('username')
    }).then(function(table){
      console.log('Created Table', table)
    })
  }
})

let myBookshelf = require('bookshelf')(knex)
module.exports = myBookshelf
