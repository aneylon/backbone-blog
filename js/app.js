// console.log('test')
var fbURL = 'https://flickering-torch-4028.firebaseio.com'
// var fireBaseRef = new Firebase('https://flickering-torch-4028.firebaseio.com')

var AddPost = function(){
  var fbRef = new Firebase(fbURL + '/posts')
  var titleField = document.getElementById('inputTitle')
  var dateField = document.getElementById('inputDate')
  var contentField = document.getElementById('inputContent')
  var imagesField = document.getElementById('inputImages')

  var newThing = {
    title: titleField.value,
    date: dateField.value,
    content: contentField.value,
    images: imagesField.value
  }
  // fbRef.child(name).set(newThing)
  fbRef.push(newThing)

  console.log(newThing)
  titleField.value = ''
  dateField.value = ''
  contentField.value = ''
  imagesField.value = ''
}

var Post = Backbone.Model.extend({
  defaults: {
    title: '',
    date: '',
    images: [],
    content: ''
  }
})

var Posts = Backbone.Firebase.Collection.extend({
  url: fbURL + '/posts',
  model: Post
})

var posts = new Posts()

var postTemplate = '<div>'+
'<div><%= title %></div>' +
'<div><%= date %></div>' +
'<div><%= images %></div>' +
'<div><%= content %></div>' +
'</div>'

var PostView = Backbone.View.extend({
  template: _.template(postTemplate),
  initilize: function(){
    this.render()
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var PostsView = Backbone.View.extend({
  el: '#posts',
  initilize: function(){
    this.render()
  },
  render: function(){
    this.$el.html('')
    this.collection.forEach(function(item){
      var postView = new PostView({ model: item })
      this.$el.append(postView.render().$el)
    }, this)
    return this
  }
})

var postsView = new PostsView({ collection: posts })
setTimeout(function(){
  postsView.render()
  console.log('test')
},500)
