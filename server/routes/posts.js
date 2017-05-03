const userAuth = require('../middleware/userAuth')

let posts = [
  { name: 'one', id:1 },
  { name: 'two', id:2 },
  { name: 'three', id:3 },
  { name: 'four', id:4 }
]

module.exports = function (express) {
  const router = express.Router()

  router.get('/', (req, res) => {
    // res.send('get posts')
    res.send(posts)
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
