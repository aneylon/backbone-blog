console.log('test')

var fireBaseRef = new Firebase('https://flickering-torch-4028.firebaseio.com')

var myFunc = function(){
  var nameField = document.getElementById('inputName')
  var numberField = document.getElementById('inputNumber')
  var name = nameField.value
  var number = numberField.value

  var newThing = {
    name: name,
    number: number
  }

  fireBaseRef.push(newThing)

  console.log('name:',name,'number:',number)
  nameField.value = ''
  numberField.value = ''
}

var Item = Backbone.Model.extend({
  defaults: {
    text: 'default'
  }
})

var Items = Backbone.Collection.extend({
  model: Item
})

var ItemView = Backbone.View.extend({
  template: _.template('<li><%= text %></li>'),
  initialize: function(){
    this.render()
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var ItemsView = Backbone.View.extend({
  el:'#test',
  initialize: function(){
    this.render()
  },
  render: function(){
    this.collection.forEach(function(item){
      var itemView = new ItemView({ model: item })
      this.$el.append(itemView.render().$el)
    }, this)
    return this
  }
})

var items  = new Items([{text:'one'},{text:'two'},{text:'three'},{}])

var itemsView = new ItemsView({collection: items})
