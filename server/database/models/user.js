let Bookshelf = require('../bookshelf')

let User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize() {
    console.log('init new user')
    this.on('creating', this.hashPassword)
  },
  comparePassword (password, callback) {
    console.log('checking password')
    let matches = this.get('password') === password
    callback(matches)
  },
  hashPassword () {
    console.log('hashing password')
  }
})

module.exports = User
