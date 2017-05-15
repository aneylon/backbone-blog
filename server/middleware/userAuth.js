const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
  const { token } = req.body
  if(token){
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err){
        res.send({ success: false, message: 'Bad token' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.send({ success: false, message: 'No token' })
  }
}
