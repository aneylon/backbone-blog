var fbURL = 'https://flickering-torch-4028.firebaseio.com'
// var fireBaseRef = new Firebase('https://flickering-torch-4028.firebaseio.com')

$(function(){
  $('body').on('click', '.toggle', function(){
    $(this).parent().children('.hideOnStart').slideToggle('fast')
  })
})

var hideElement = function(elId, speed, after){
  $(elId).slideUp(speed, after)
}

var showElement = function(elId, speed, after){
  $(elId).slideDown(speed, after)
}

var AddPost = function(){
  var fbRef = new Firebase(fbURL + '/posts')
  var titleField = document.getElementById('inputTitle')
  var dateField = document.getElementById('inputDate')
  var contentField = document.getElementById('inputContent')
  var imagesField = document.getElementById('inputImages')
  var tagsField = document.getElementById('inputTags')

  var newThing = {
    title: titleField.value,
    date: dateField.value,
    content: contentField.value,
    images: imagesField.value,
    tags: tagsField.value.split(',').map(function(tag){return tag.trimLeft()})
  }
  // fbRef.child(name).set(newThing)

  var authData = fbRef.getAuth()
  console.log(authData)
  if(authData){
    fbRef.push(newThing, function(err){ if(err) console.log('error adding:', err)})
  }

  console.log(newThing)
  titleField.value = ''
  dateField.value = ''
  contentField.value = ''
  imagesField.value = ''
  tagsField.value = ''
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
      console.dir(data)
      Login();
    }
  })
}

var Login = function(){
  var fbRef = new Firebase(fbURL)
  var emailField = document.getElementById('loginEmail')
  var pwField = document.getElementById('loginPw')
  fbRef.authWithPassword({
    email: emailField.value,
    password: pwField.value
  }, function(error, data){
    if(error){
      console.log('login failed:', error)
    } else {
      console.log('logged in:', data)
      // store data ?
      // clear info
      emailField.value = ''
      pwField.value = ''
      hideElement('#loginSection', 'fast', ()=>{console.log('loggged in')})
      hideElement('#signUpSection', 'fast', ()=>{console.log('loggged in')})
      showElement('#logOutSection', 'fast', ()=>{console.log('loggged in')})
    }
  })
}

var ChangePw = function(){
  var fbRef = new Firebase(fbURL)
  var changeEmail = document.getElementById('changeEmail')
  var changeOldPw = document.getElementById('changeOldPw')
  var changeNewPw = document.getElementById('changeNewPw')
  fbRef.changePassword({
    email: changeEmail.value,
    oldPassword: changeOldPw.value,
    newPassword: changeNewPw.value
  },function(err){
    if(err) console.log('Password change error:', err)
    else {
        changeEmail.value = ''
        changeOldPw.value = ''
        changeNewPw.value = ''
    }
  })
}
// change fb write rule to "auth.uid === 'admin'" or equivalent
var Logout = function(){
  var fbRef = new Firebase(fbURL)
  fbRef.unauth();
  // ui changes
}

// backbone things move to other file? or move admin functions to other file?

var Post = Backbone.Model.extend({
  defaults: {
    title: '',
    date: '',
    images: [],
    content: '',
    tags: ''
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
'<div><%= tags %></div>' +
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
    this.collection.forEach(function(item,i){
      var postView = new PostView({ model: item })
      this.$el.append(postView.render().$el)
      console.log(i)
    }, this)
    setTimeout(function(){
      console.log('done')
      // highlight js processing
    },500)
    return this
  }
})

var postsView = new PostsView({ collection: posts })
setTimeout(function(){
  postsView.render()
  // better way to do this?
  // console.log('test')
},500)
