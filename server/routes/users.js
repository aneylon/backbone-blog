const userAuth = require('../middleware/userAuth')

let users = [
  { id: 1, username: 'admin', password: 'password' },
  { id: 2, username: 'userOne', password: 'password' }
]

module.exports = function (express) {
  const router = express.Router()

  router.get('/', userAuth, (req, res) => {
    res.send('get users')
  })

  router.post('/signup', (req, res) => {
    const { username, password } = req.body
    console.log(username)
    let userExists = users.find( item => {
      return item.username === username
    })
    if(userExists){
      console.log('user exists')
      res.send({success: false, message: 'User exists'})
    } else {
      console.log('added user')
      users.push({ username, password, id: users.length + 1 })
      res.send({success: true, message: 'Signed up new user'})
    }
  })

  router.post('/signin', (req, res) => {
    const { username, password } = req.body
    let user = users.reduce((acc, cur) => {
      if(cur.username === username) {
        return cur
      } else {
        return acc
      }
    }, false)
    if(user !== false){
      if(user.username === username) {
        if(user.password === password){
          res.send({success: true, message: 'User signed in'})
        } else {
          res.send({success: false, message: 'Password incorrect'})
        }
      }
    } else {
      res.send({success: false, message: 'Username incorrect'})
    }
  })

  router.put('/', userAuth, (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('update user ' + id)
  })

  return router
}
