module.exports = function(req, res, next) {
  console.log('in the middle')
  // check token
   // if bad send error
   // if good, next
  next()
}
