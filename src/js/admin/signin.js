/* global
  Backbone
  _
  $
*/
let SigninView = Backbone.View.extend({
  eventBus,
  template: _.template($('#signinTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  initialize (options) {
    if (options.signedIn) {
      this.loggedIn()
    } else {
      this.loggedOut()
    }
    this.eventBus.on('loggedIn', this.loggedIn, this)
    this.eventBus.on('loggedOut', this.loggedOut, this)
  },
  loggedOut () {
    this.$el.css({
      'visibility': 'visible',
      'display': 'initial'
    })
    this.render()
  },
  loggedIn () {
    this.$el.css({
      'visibility': 'hidden',
      'display': 'none'
    })
    this.render()
  },
  onSubmit (e) {
    e.preventDefault()
    let username = $('#signinUsername').val()
    let password = $('#signinPassword').val()
    let self = this
    $.post(
      '/users/signin',
      { username, password },
      function (data, status) {
        if (data.success) {
          localStorage.setItem('bbb-jwt', data.token)
          self.eventBus.trigger('loggedIn')
        }
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})
