require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const port = process.env.PORT || 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

const usersRoutes = require('./routes/users')(express)
const postsRoutes = require('./routes/posts')(express)
app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)

let User = require('./database/models/user')
let Users = require('./database/collections/users')
new User({username: 'testing'})
  .fetch()
  .then( user => {
    if(!user) {
      console.log('no use, adding')
      let newUser = new User({username: 'testing', password:'test'})
      newUser.save()
        .then( user => {
          console.log('added user')
          Users.add(user)
        })
    } else {
      console.log('user exists')
    }
  })

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'))
  // res.redirect('/')
})

app.listen(port, () => {
  console.log('listening on:', port)
})
