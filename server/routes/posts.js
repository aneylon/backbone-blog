const userAuth = require('../middleware/userAuth')
let Post = require('../database/models/post')
let Posts = require('../database/collections/posts')

module.exports = function (express) {
  const router = express.Router()

  router.get('/', (req, res) => {
    Posts.reset().fetch().then(function(posts){
      res.send(posts.models)
    })
  })

  router.get('/:id', (req, res) => {
    let id = req.params.id
    new Post({ id }).fetch().then(function(post){
      if(post){
        res.send(post)
      } else {
        res.send({
          message: 'No post found matching that id',
          success: false
        })
      }
    })
  })

  router.post('/', userAuth, (req, res) => {
    let { title, text, userId } = req.body
    userId = 1
    let newPost = new Post({ userId, title, text })
    newPost.save()
      .then(function(post) {
        Posts.add(post)
        res.send({ success: true, message: 'added', newPost })
      })
  })

  router.put('/', userAuth, (req, res) => {
    const { id, text } = req.body
    new Post({ id }).fetch().then(function(post){
      if(post){
        post.set({ text })
        post.save().then(post => {
          res.send({ success: true, message: 'Post updated', post })
        })
      } else {
        res.send({ success: false, message: 'Post not found' })
      }
    })
  })

  return router
}
