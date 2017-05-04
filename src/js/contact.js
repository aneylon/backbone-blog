/* global
  Backbone
*/
let ContactView = Backbone.View.extend({
  el: '#app',
  render () {
    this.$el.html('contact view')
    return this
  }
})
