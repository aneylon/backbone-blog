/* global
  Backbone
*/
let AdminView = Backbone.View.extend({
  el: '#app',
  render () {
    this.$el.html('admin view')
    return this
  }
})
