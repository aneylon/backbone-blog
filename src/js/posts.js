/* global
  Backbone
*/
let PostsView = Backbone.View.extend({
  el: '#app',
  initialize (options) {
    if(options !== undefined)
      console.log(options.id)
  },
  render () {
    this.$el.html('posts view')
    return this
  }
})
