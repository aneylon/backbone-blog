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
    // let matches = this.get('password') === password
    bcrypt.compare(password, this.get('password'), function(err, matches){
      console.log(matches)
      callback(matches)
    })
  },
  hashPassword () {
    let hashPromise = Bluebird.promisify(bcrypt.hash)
    return hashPromise(this.get('password'), null, null).bind(this)
      then(function(hash){
        console.log(hash)
        this.set('password', hash)
      })
  }
})

module.exports = User
