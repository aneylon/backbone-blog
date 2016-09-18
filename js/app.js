var fbURL = 'https://flickering-torch-4028.firebaseio.com'
var blogName = 'myBackBoneBlog'
var token
var date
// var fireBaseRef = new Firebase('https://flickering-torch-4028.firebaseio.com')

$(function(){
  setDate()
  token = window.localStorage.getItem(blogName)
  if(token){
    var fbRef = new Firebase(fbURL)
    fbRef.authWithCustomToken(token, function(err, authData){
      if(err) console.log('error', err)
      else{
        showLoginView()
      }
    })
  } else {
    showLogoutView()
  }

  $('body').on('click', '.toggle', function(){
    $(this).parent().children('form').slideToggle('fast')
  })

  $('body').on('click', '.post-img', function(){
    // $(this).
    console.log('clicked img')
    // display modal for img
  })
})

var setDate = function(){
  date = new Date() // date.getDate()(day) .getFullYear() .getMonth()(+1)
  date = date.getMonth()+1 + '-' + date.getDate() + '-' + date.getFullYear()
  $('#inputDate').val(date)
}

var hideElement = function(elId, speed, after){
  $(elId).slideUp(speed, after)
}

var showElement = function(elId, speed, after){
  $(elId).slideDown(speed, after)
}

var showLoginView = function(){
  hideElement('#loginSection', 'fast', ()=>{})
  hideElement('#signUpSection', 'fast', ()=>{})
  showElement('#logOutSection', 'fast', ()=>{})
  showElement('#addSection', 'fast', ()=>{})
}

var showLogoutView = function(){
  hideElement('#addSection', 'fast', ()=>{})
  hideElement('#logOutSection', 'fast', ()=>{})
  showElement('#signUpSection', 'fast', ()=>{})
  showElement('#loginSection', 'fast', ()=>{})
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
    content: markdown.toHTML(contentField.value),
    images: imagesField.value,
    tags: tagsField.value.split(',').map(function(tag){return tag.trimLeft()})
  }
  // fbRef.child(name).set(newThing)
  var authData = fbRef.getAuth()
  if(authData){
    fbRef.push(newThing, function(err){ if(err) console.log('error adding:', err)})
  }

  titleField.value = ''
  dateField.value = ''
  contentField.value = ''
  imagesField.value = ''
  tagsField.value = ''
  setDate()
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
      Login()
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
      window.localStorage.setItem(blogName, data.token)
      emailField.value = ''
      pwField.value = ''
      showLoginView()
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
        hideElement('#changeForm', 'fast', ()=>{})
    }
  })
}

var Logout = function(){
  var fbRef = new Firebase(fbURL)
  fbRef.unauth()
  window.localStorage.removeItem(blogName)
  showLogoutView()
}

// backbone things move to other file? or move admin functions to other file?
var Link = Backbone.Model.extend({
  defaults: {
    url: '',
    text: ''
  }
})

var Links = Backbone.Collection.extend({
    model: Link
})

var LinkView = Backbone.View.extend({
  tagName: 'li',
  // className: 'button grey',
  template: _.template('<a href="<%= url %>" class="button grey"><%= text %>'),
  initilize: function(){
    this.render()
  },
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var LinksView = Backbone.View.extend({
  el: '#navLinks',
  initilize: function(){
    this.render()
  },
  render: function(){
    this.$el.html('')
    this.collection.forEach(function(link){
      var linkView = new LinkView({ model: link })
      this.$el.append(linkView.render().$el)
    }, this)
    return this
  }
})

var links = new Links([{text:'home', url:'/'},{text:'projects', url:'projects'},{text:'images', url:'images'},{text:'about', url:'about'},{text:'contact', url:'contact'}])
var linksView = new LinksView({collection: links})
linksView.render()

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

var postTemplate = '<div class="post">'+
'<img src="<%- \'img/\'+ images %>" alt="<%= images %>" class="post-img"/>' +
'<div class="post-title"><%= title %></div>' +
'<div class="post-date"><%= date %></div>' +
'<div class="post-content"><%= content %></div>' +
'<div class="post-tags"><%= tags %></div>' +
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
    var rev = []
    this.collection.forEach(function(item){
      rev.unshift(item)
    })
    rev.forEach(function(item){
      var postView = new PostView({ model: item })
      this.$el.append(postView.render().$el)
    }, this)
    setTimeout(function(){
      // console.log('done')
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
