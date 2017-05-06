const userAuth = require('../middleware/userAuth')

let posts = [
  { title: 'one', text: 'one', id:1 },
  { title: 'two', text: 'two', id:2 },
  { title: 'three', text: 'three', id:3 },
  { title: 'four', text: 'four', id:4 },
  { title: 'five', text: 'five', id:5 }
]

module.exports = function (express) {
  const router = express.Router()

  router.get('/', (req, res) => {
    // res.send('get posts')
    res.send(posts)
  })

  router.post('/', userAuth, (req, res) => {
    const { title, text, userId } = req.body
    const newPost = { userId, title, text, id: posts.length + 1 }
    posts.push(newPost)
    console.log(posts)
    console.log(newPost)
    res.send({ message: 'added', newPost })
  })

  router.put('/', userAuth, (req, res) => {
    const { id } = req.body
    console.log(id)
    res.send('mod post ' + id)
  })

  return router
}
