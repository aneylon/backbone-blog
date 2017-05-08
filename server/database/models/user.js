let Bookshelf = require('../bookshelf')

let User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize() {
    this.on('creating', this.hashPassword)
  },
  comparePassword (password, callback) {
    let matches = this.get('password') === password
    callback(matches)
  },
  hashPassword () {
    console.log('hashing password')
  }
})

module.exports = User
