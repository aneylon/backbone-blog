require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 8080

if(process.env.MODE === 'dev'){
  app.use(morgan('dev'))
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

const usersRoutes = require('./routes/users')(express)
const postsRoutes = require('./routes/posts')(express)
app.use('/users', usersRoutes)
app.use('/api/posts', postsRoutes)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'))
})

app.listen(port, () => {
  console.log('listening on:', port)
})
