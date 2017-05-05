const userAuth = require('../middleware/userAuth')

module.exports = function (express) {
  const router = express.Router()

  router.get('/', userAuth, (req, res) => {
    res.send('get users')
  })

  router.post('/signup', (req, res) => {
    const { username } = req.body
    console.log(username)
    res.send('signup user ' + username)
  })

  router.post('/signin', (req, res) => {
    const { username } = req.body
    console.log(username)
    res.send('signin user ' + username)
  })

  router.put('/', userAuth, (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('update user ' + id)
  })

  return router
}
