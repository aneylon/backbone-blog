var fbURL = 'https://flickering-torch-4028.firebaseio.com'
var blogName = 'myBackBoneBlog'
var token
var date
// var fireBaseRef = new Firebase('https://flickering-torch-4028.firebaseio.com')

$(function(){
  setDate()
  token = window.localStorage.getItem(blogName)

  $('body').on('click', '.post-img', function(){
    showImage($(this).attr('src'))
  })

  $('body').on('click', '.modal', function(){
    hideImage()
  })
})

var showImage = function(imgUrl){
  $('#modal-image').attr('src', imgUrl)
  $('#modal').css('display', 'block')
}

var hideImage = function(){
  $('#modal').css('display', 'none')
}

var checkLogin = function(){
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
}

var setDate = function(){
  date = new Date()
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
  showElement('#addProject', 'fast', ()=>{})
  showElement('#addImage', 'fast', ()=>{})
}

var showLogoutView = function(){
  hideElement('#addSection', 'fast', ()=>{})
  hideElement('#logOutSection', 'fast', ()=>{})
  showElement('#signUpSection', 'fast', ()=>{})
  showElement('#loginSection', 'fast', ()=>{})
  hideElement('#addProject', 'fast', ()=>{})
  hideElement('#addImage', 'fast', ()=>{})
}

// fbRef.child(name).set(newThing)
var AddPost = function(){
  var fbRef = new Firebase(fbURL + '/posts')

  var authData = fbRef.getAuth()
  if(authData){

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

    fbRef.push(newThing, function(err){
      if(err) {
        console.log('error adding:', err)
        ShowMessage('#msgArea', 'Adding Failed', 'fail')
      }
    })

    titleField.value = ''
    dateField.value = ''
    contentField.value = ''
    imagesField.value = ''
    tagsField.value = ''
    setDate()
  } else {
    ShowMessage('#msgArea', 'Auth Failed', 'fail')
  }
}

var AddImage = function(){
  var fbRef = new Firebase(fbURL + '/images')
  var authData = fbRef.getAuth()
  if(authData){
    // get fields
    var imgField = document.getElementById('inputImageImage')
    // make obj
    var newImg = {
      image: imgField.value
    }
    // push to db
    fbRef.push(newImg, function(err) {
      if(err){
        console.log('error adding: ', err)
        ShowMessage('#msgArea', 'Adding Failed', 'fail')
      }
    })
    // clear fields
    imgField.value = ''
  } else {
    ShowMessage('#msgArea', 'Auth Failed', 'fail')
  }
}

var AddProject = function(){
  var fbRef = new Firebase(fbURL + '/projects')
  var authData = fbRef.getAuth()
  if(authData){
    // get fields
    var titleField = document.getElementById('inputProjectTitle')
    var descriptionField = document.getElementById('inputProjectDescription')
    var imageField = document.getElementById('inputProjectImage')
    // make new obj
    var newProj = {
      title: titleField.value,
      description: descriptionField.value,
      image: imageField.value,
    }
    // push to db
    fbRef.push(newProj, function(err){
      if(err){
        console.log('error adding: ', err)
        ShowMessage('#msgArea', 'Adding Failed', 'fail')
      }
    })
    // clear fields
    titleField.value = ''
    descriptionField.value = ''
    imageField.value = ''
  } else {
    ShowMessage('#msgArea', 'Auth Failed', 'fail')
  }
}

var ShowMessage = function(tag, message, style){
  var classes = ['fail', 'success']
  // remove old
  $(tag).html('')
  classes.forEach(function(cls){
    $(tag).removeClass(cls)
  })
  // add new
  $(tag).html(message)
  $(tag).addClass(style)
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
