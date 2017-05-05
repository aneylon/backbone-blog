/* global
  Backbone
*/
let AdminView = Backbone.View.extend({
  el: '#app',
  template: _.template($('#adminTemplate').html()),
  render () {
    this.$el.html(this.template)
    return this
  }
})
