/* global
  Backbone
  _
  $
*/
let ContactView = Backbone.View.extend({
  el: '#app',
  template: _.template($('#contactTemplate').html()),
  render () {
    this.$el.html(this.template)
    return this
  }
})
