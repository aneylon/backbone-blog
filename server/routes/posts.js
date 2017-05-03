const userAuth = require('../middleware/userAuth')

module.exports = function (express) {
  const router = express.Router()

  router.get('/', (req, res) => {
    res.send('get posts')
  })

  router.post('/', userAuth, (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('new post ' + id)
  })

  router.put('/', userAuth, (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('mod post ' + id)
  })

  return router
}
