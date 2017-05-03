/* global
  Backbone
*/

const TestModel = Backbone.Model.extend()
let TestCol = Backbone.Collection.extend({
  model: TestModel,
  url: '/posts'
})
const testCol = new TestCol()
testCol.fetch({
  success (col, res, opt) {
    console.log('got er')
    testViews.render()
  }
})

const TestView = Backbone.View.extend({
  tagName: 'ul',
  render () {
    this.$el.html(this.model.get('name') + ' : ' + this.model.get('id'))
    return this
  }
})

const TestViews = Backbone.View.extend({
  el: '#app',
  initialize () {
    // this.render()
  },
  render () {
    this.$el.html('')
    this.model.forEach((item) => {
      let testView = new TestView({ model: item })
      this.$el.append(testView.render().$el)
    })
    return this
  }
})

const testViews = new TestViews({ model: testCol })
