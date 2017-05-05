/* global
  Backbone
*/
let SigninView = Backbone.View.extend({
  template: _.template($('#signinTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  onSubmit (e) {
    e.preventDefault()
    console.log('submit signin')
    let username = $('#signinUsername').val()
    let password = $('#signinPassword').val()
    console.log({ username, password })
    $.post(
      '/users/signin',
      { username, password },
      function(data, status) {
        console.log('data', data)
        console.log('status', status)
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})

let SignupView = Backbone.View.extend({
  template: _.template($('#signupTemplate').html()),
  events: {
    'submit': 'onSubmit'
  },
  onSubmit (e) {
    e.preventDefault()
    console.log('submit signup')
    let username = $('#signupUsername').val()
    let password = $('#signupPassword').val()
    console.log({ username, password })
    $.post(
      '/users/signup',
      { username, password },
      function(data, status) {
        console.log('data', data)
        console.log('status', status)
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})

let AddPostView = Backbone.View.extend({
  template: _.template($('#addPostsTemplate').html()),
  events:{
    'submit': 'onSubmit'
  },
  onSubmit (e) {
    e.preventDefault()
    console.log('add post')
    let title = this.$('#addPostTitle').val()
    let text = this.$('#addPostText').val()
    console.log({ title, text })
    $.post(
      '/posts',
      { title, text },
      function(data, status) {
        console.log('data', data)
        console.log('status', status)
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
  template: _.template($('#adminTemplate').html()),
  render () {
    // this.$el.html(this.template)
    this.$el.html('')
    let signinView = new SigninView()
    this.$el.append(signinView.render().$el)
    let signupView = new SignupView()
    this.$el.append(signupView.render().$el)
    let addPostView = new AddPostView()
    this.$el.append(addPostView.render().$el)
    return this
  }
})
