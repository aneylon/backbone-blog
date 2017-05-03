const userAuth = require('../middleware/userAuth')

module.exports = function (express) {
  const router = express.Router()

  router.get('/', userAuth, (req, res) => {
    res.send('get users')
  })

  router.post('/', (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('add new user ' + id)
  })

  router.put('/', userAuth, (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('update user ' + id)
  })

  return router
}
