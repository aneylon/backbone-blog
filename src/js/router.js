/* global
  Backbone
  _
  $
*/
const Router = Backbone.Router.extend({
  routes: {
    'admin': 'viewAdmin',
    'about': 'viewAbout',
    'contact': 'viewContact',
    'posts/:id': 'viewPosts',
    '*other': 'viewPosts'
  },
  viewAdmin () {
    let view = new AdminView()
    view.render()
  },
  viewAbout () {
    let view = new AboutView()
    view.render()
  },
  viewContact () {
    let view = new ContactView()
    view.render()
  },
  viewPosts (id) {
    if (id === null) {
      posts.fetch({
        success () {
          let view = new PostsView({ model: posts, router: this })
          view.render()
        },
        fail () {
          let view = new ErrorView()
          view.render()
        }
      })
    } else {
      console.log('showing post' + id)
      $.get(
        '/api/posts/' + id,
        function (data, status) {
          let singlePost = new Post(data)
          let view = new SinglePostView({ model: singlePost })
          view.render()
        }
      )
    }
  }
})
let router = new Router()

Backbone.history.start({ pushState: true })

let NavView = Backbone.View.extend({
  el: '#navLinks',
  events: {
    'click': 'onClick'
  },
  onClick (e) {
    let $li = $(e.target)
    router.navigate($li.attr('data-url'), {trigger: true})
  }
})
let navView = new NavView()
