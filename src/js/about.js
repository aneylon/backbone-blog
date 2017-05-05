/* global
  Backbone
*/
let AboutView = Backbone.View.extend({
  el: '#app',
  template: _.template($("#aboutTemplate").html()),
  render () {
    this.$el.html(this.template)
    return this
  }
})
