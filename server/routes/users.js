const userAuth = require('../middleware/userAuth')
let User = require('../database/models/user')
let Users = require('../database/collections/users')

module.exports = function (express) {
  const router = express.Router()

  router.get('/', userAuth, (req, res) => {
    Users.reset().fetch().then(function(users){
      res.send(users.models)
    })
  })

  router.post('/signup', (req, res) => {
    const { username, password } = req.body

    new User({ username })
      .fetch()
      .then( user => {
        if(!user) {
          let newUser = new User({ username, password })
          newUser.save()
            .then( user => {
              Users.add(user)
              res.send({ success: true, message: 'Added new user', user })
            })
        } else {
          res.send({ success: false, message: 'User exists' })
        }
      })
  })

  router.post('/signin', (req, res) => {
    const { username, password } = req.body

    new User({ username }).fetch().then( user => {
      if(user){
        user.comparePassword(password, matches => {
          if(matches){
            res.send({ success: true, message: 'User signed in', jot: 'a jot' })
          } else {
            res.send({ success: false, message: 'Password incorrect' })
          }
        })
      } else {
        res.send({ success: false, message: 'Username incorrect' })
      }
    })
  })

  router.put('/', userAuth, (req, res) => {
    const { username, password } = req.body

    new User({ username }).fetch().then( user => {
      if(user) {
        user.set({ password })
        user.save().then( user => {
          res.send({ success: true, message: 'Password updated', user })
        })
      } else {
        res.send({ success: false, message: 'User not found' })
      }
    })
  })

  return router
}
