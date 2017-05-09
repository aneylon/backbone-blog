/* global
  Backbone
*/
let SignupView = Backbone.View.extend({
  eventBus,
  template: _.template($('#signupTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  onSubmit (e) {
    e.preventDefault()
    let username = $('#signupUsername').val()
    let password = $('#signupPassword').val()
    $.post(
      '/users/signup',
      { username, password },
      function(data, status) {
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})
