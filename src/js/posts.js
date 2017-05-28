/* global
  Backbone
  _
  $
*/
let Post = Backbone.Model.extend()
let Posts = Backbone.Collection.extend({
  model: Post,
  url: '/api/posts'
})
let posts = new Posts()

let SinglePostView = Backbone.View.extend({
  el: '#app',
  tagName: 'div',
  template: _.template($('#singlePostTemplate').html()),
  render () {
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

let PostView = Backbone.View.extend({
  tagName: 'li',
  className: 'post',
  events: {
    'click': 'onClick'
  },
  onClick () {
    router.navigate('posts/' + this.model.get('id'), { trigger: true })
  },
  template: _.template($('#postsTemplate').html()),
  render () {
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

let PostsView = Backbone.View.extend({
  el: '#app',
  render () {
    this.$el.html('')
    this.model.forEach(item => {
      let postView = new PostView({ model: item, router: this.router })
      this.$el.prepend(postView.render().$el)
    })
    return this
  }
})
