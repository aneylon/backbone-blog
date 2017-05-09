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

let SigninView = Backbone.View.extend({
  eventBus,
  template: _.template($('#signinTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  initialize (options) {
    if(options.signedIn) {
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
      function(data, status) {
        if(data.success) {
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

let AddPostView = Backbone.View.extend({
  eventBus,
  template: _.template($('#addPostsTemplate').html()),
  events:{
    'submit': 'onSubmit'
  },
  initialize (options) {
    if(options.signedIn) {
      this.loggedIn()
    } else {
      this.loggedOut()
    }
    this.eventBus.on('loggedIn', this.loggedIn, this)
    this.eventBus.on('loggedOut', this.loggedOut, this)
  },
  loggedIn () {
    this.$el.css({
      'visibility': 'visible',
      'display': 'initial'
    })
    this.render()
  },
  loggedOut () {
    this.$el.css({
      'visibility': 'hidden',
      'display': 'none'
    })
    this.render()
  },
  onSubmit (e) {
    e.preventDefault()
    let title = this.$('#addPostTitle').val()
    let text = this.$('#addPostText').val()
    let token = localStorage.getItem('bbb-jwt')
    $.post(
      '/posts',
      { title, text, token },
      function(data, status) {
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})

let AdminView = Backbone.View.extend({
  el: '#app',
  eventBus,
  // template: _.template($('#adminTemplate').html()),
  initialize () {
    if(localStorage.getItem('bbb-jwt')){
      this.eventBus.trigger('loggedIn')
      this.signedIn = true
    } else {
      this.eventBus.trigger('loggedOut')
      this.signedIn = false
    }
  },
  render () {
    // this.$el.html(this.template)
    this.$el.html('')
    let signinView = new SigninView({ signedIn: this.signedIn })
    this.$el.append(signinView.render().$el)
    let signoutView = new SignoutView({ signedIn: this.signedIn })
    this.$el.append(signoutView.render().$el)
    let signupView = new SignupView()
    this.$el.append(signupView.render().$el)
    let addPostView = new AddPostView({ signedIn: this.signedIn })
    this.$el.append(addPostView.render().$el)
    return this
  }
})
