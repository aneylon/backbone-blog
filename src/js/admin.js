/* global
  Backbone
*/
let AdminView = Backbone.View.extend({
  el: '#app',
  eventBus,
  initialize () {
    if (localStorage.getItem('bbb-jwt')) {
      this.eventBus.trigger('loggedIn')
      this.signedIn = true
    } else {
      this.eventBus.trigger('loggedOut')
      this.signedIn = false
    }
  },
  render () {
    this.$el.html('')
    let signoutView = new SignoutView({ signedIn: this.signedIn })
    this.$el.append(signoutView.render().$el)
    let signinView = new SigninView({ signedIn: this.signedIn })
    this.$el.append(signinView.render().$el)
    let addPostView = new AddPostView({ signedIn: this.signedIn })
    this.$el.append(addPostView.render().$el)
    let signupView = new SignupView()
    this.$el.append(signupView.render().$el)
    return this
  }
})
