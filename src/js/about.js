/* global
  Backbone
*/
let AboutView = Backbone.View.extend({
  el: '#app',
  render () {
    this.$el.html('about view')
    return this
  }
})
