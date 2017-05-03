module.exports = function(req, res, next) {
  console.log('in the middle')
  next()
}
