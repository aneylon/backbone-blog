/* global
  Backbone
*/

const Link = Backbone.Model.extend()
const Links = Backbone.Collection.extend({
  model: Link
})
const links = new Links([
  { text: 'posts', url: '/' },
  { text: 'about', url: '/about' },
  { text: 'contact', url: '/contact' }
])

const LinkView = Backbone.View.extend({
  tagName: 'li',
  render () {
    this.$el.html('a link')
  }
})

const LinksView = Backbone.View.extend({
  el: '#navLinks',
  initialize () {
    this.render()
  },
  render () {
    this.$el.html('links here')
    return this
  }
})

const linksView = new LinksView()
