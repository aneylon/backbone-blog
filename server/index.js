require('dotenv').config()

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080

app.use(express.static('public'))

app.get('/test', (req, res) => {
  res.send('it is alive')
})

app.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../', 'public', 'index.html'))
  res.redirect('/')
})

app.listen(port, () => {
  console.log('listening on:', port)
})
