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
  className: 'btn btn-default',
  render () {
    this.$el.html(`${this.model.get('text')}`)
    this.$el.attr('data-url', this.model.get('url'))
    return this
  }
})

const LinksView = Backbone.View.extend({
  el: '#navLinks',
  initialize () {
    this.render()
  },
  render () {
    this.$el.html('')
    this.model.forEach( link => {
      let newLink = new LinkView({ model: link })
      this.$el.append(newLink.render().$el)
    })
    this.$el.addClass('btn-group')
    return this
  }
})

const linksView = new LinksView({ model: links })
