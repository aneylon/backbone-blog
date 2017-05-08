let Bookshelf = require('../bookshelf')
let bcrypt = require('bcrypt-nodejs')
let Bluebird = require('bluebird')

let User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize() {
    this.on('creating', this.hashPassword)
  },
  comparePassword (password, callback) {
    bcrypt.compare(password, this.get('password'), function(err, matches){
      callback(matches)
    })
  },
  hashPassword () {
    let Hashed = Bluebird.promisify(bcrypt.hash)
    return Hashed(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash)
      })
  }
})

module.exports = User
