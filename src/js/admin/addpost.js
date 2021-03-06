/* global
  Backbone
  _
  $
*/
let AddPostView = Backbone.View.extend({
  eventBus,
  template: _.template($('#addPostsTemplate').html()),
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
    let self = this
    e.preventDefault()
    let title = this.$('#addPostTitle').val()
    let text = this.$('#addPostText').val()
    let token = localStorage.getItem('bbb-jwt')
    $.post(
      '/api/posts',
      { title, text, token },
      function (data, status) {
        if (data.success) {
          $('#addPostTitle').val('')
          $('#addPostText').val('')
          self.$el.find('form').slideToggle()
        } else {
          $('#addPostError').text(data.message)
        }
      }
    )
  },
  render () {
    this.$el.html(this.template)
    return this
  }
})
