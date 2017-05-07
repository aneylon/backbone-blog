let Bookshelf = require('../bookshelf')
let User = require('../models/user')

let Users = new Bookshelf.Collection()
Users.model = User

module.exports = Users
