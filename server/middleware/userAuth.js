const jwt = require('jsonwebtoken')
module.exports = function(req, res, next) {
  console.log('in the middle')
  const { token } = req.body
  if(token){
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err){
        // return?
        res.send({ success: false, message: 'Bad token' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    // return ?
    res.send({ success: false, message: 'No token' })
  }
}
