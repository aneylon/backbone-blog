/* global
  Backbone
*/
let ErrorView = Backbone.View.extend({
  el: '#app',
  template: _.template($("#errorTemplate").html()),
  render () {
    this.$el.html(this.template)
    return this
  }
})
