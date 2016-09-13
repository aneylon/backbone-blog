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

  var authData = getAuth()
  console.log(authData)
  if(authData){
    fbRef.push(newThing, function(err){ if(err) console.log('error adding:', err)})
  }


  console.log(newThing)
  titleField.value = ''
  dateField.value = ''
  contentField.value = ''
  imagesField.value = ''
}

var SignUp = function(){
  var fbRef = new Firebase(fbURL)
  fbRef.createUser({
    email: document.getElementById('signUpEmail').value,
    password: document.getElementById('signUpPw').value
  }, function(error, data){
    if(error) {
      console.log('error adding user:', error)
    } else {
      // console.log('created user with uid:', data.uid)
      console.dir(data)
      // window.LocalStorage.setItem('bbb', data) ? or call Login ?
    }
  })
}

var Login = function(email,pw){
  var fbRef = new Firebase(fbURL)
  fbRef.authWithPassword({
    email: document.getElementById('signUpEmail').value,
    password: document.getElementById('signUpPw').value
  }, function(error, data){
    if(error){
      console.log('login failed:', error)
    } else {
      console.log('logged in:', data)
      // store data ?
    }
  })
}
// change fb write rule to "auth.uid === 'admin'" or equivalent
var Logout = function(){
  var fbRef = new Firebase(fbURL)
  fbRef.unauth();
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
