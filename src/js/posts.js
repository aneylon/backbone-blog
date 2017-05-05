/* global
  Backbone
*/
let Post = Backbone.Model.extend()
let Posts = Backbone.Collection.extend({
  model: Post,
  url: '/posts'
})
let posts = new Posts()

posts.fetch({
  success(){
    console.log('posts fetch success')
  },
  fail(){
    console.log('posts fetch fail')
  }
})

let PostView = Backbone.View.extend({
  tagName: 'li',
  template: _.template($('#postsTemplate').html()),
  render () {
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

let PostsView = Backbone.View.extend({
  el: '#app',
  initialize (options) {
    if(options.id !== undefined){
      console.log(options.id)
      console.log('render single post')
    } else {
      console.log('render all posts')
    }
  },
  render () {
    this.$el.html('')
    this.model.forEach( item => {
      let postView = new PostView({ model: item })
      this.$el.append(postView.render().$el)
    })
    return this
  }
})
