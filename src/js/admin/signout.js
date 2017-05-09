/* global
  Backbone
*/
let SignoutView = Backbone.View.extend({
  eventBus,
  template: _.template($('#signoutTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  initialize (options) {
    if(options.signedIn){
      this.loggedIn()
    } else {
      this.loggedOut()
    }
    this.eventBus.on('loggedIn', this.loggedIn, this)
    this.eventBus.on('loggedOut', this.loggedOut, this)
  },
  loggedOut () {
    this.$el.css({
      'visibility': 'hidden',
      'display': 'none'
    })
    this.render()
  },
  loggedIn () {
    this.$el.css({
      'visibility': 'visible',
      'display': 'initial'
    })
    this.render()
  },
  onSubmit (e) {
    e.preventDefault()
    localStorage.removeItem('bbb-jwt')
    this.eventBus.trigger('loggedOut')
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})
