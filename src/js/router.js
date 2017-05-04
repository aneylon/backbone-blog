/* global
  Backbone
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
    let view
    if(id !== null){
      view = new PostsView({ id })
    } else {
      view = new PostsView()
    }

    view.render()
  }
})
let router = new Router()

// Backbone.history.start()
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
