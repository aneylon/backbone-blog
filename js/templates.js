var projectsTemp = `
<div class="post">
  <div src="post-title"><%= title %></div>
  <img src="<%- \'img/\' + image %>" alt="<%= image %>" class="post-img" />
  <div class="post-content"><%= description %></div>
</div>
`

var imagesTemp = `
<div class="image-post">
  <img src="<%- \'img/\' + image %>" alt="<%= image %>" class="post-img" />
</div>
`

var aboutTemp = `
<div class="about">
  <img src="img/test1.png" />
  <h1>About me</h1>
  <p>I live and work in San Francisco doing <a href="/#projects">computer stuff.</a></p>
  <p>I like languages and tromping through the woods.</p>
  <p>Sometimes I <a href="/#images">scribble</a> in either 2 or 3d.</p>
  <p>You can follow me on <a href="http://twitter.com/ArlenNeylon">Twitter</a> if you like.</p>
  <p>Or contact me through <a href="http://linkedin.com/in/arlenneylon">LinkedIn.</a></p>
</div>
`

var postTemplate = `
<div class="post">
  <div class="post-title"><%= title %></div>
  <div class="post-date"><%= date %></div>
  <div class="spacer"></div>
  <img src="<%- \'img/\'+ images %>" alt="<%= images %>" class="post-img"/>
  <div class="post-content"><%= content %></div>
  <div class="post-tags"><%= tags.join(", ") %></div>
</div>
`

var adminTemp = `
<div id="msgArea">
</div>

<div id="logOutSection" class="input-group hideOnStart">
  <h2 class="input-group title toggle">Logout</h2>
  <form class="input-group form hideOnStart">
    <input type="button" onClick="Logout()" value="Logout">
  </form>
</div>

<div id="signUpSection" class="input-group">
  <h2 id="signUpTitle" class="input-group title toggle">Signup</h2>
  <form id="signUpForm" class="input-group form hideOnStart">
    <input type="email" placeholder="email" id="signUpEmail" required>
    <input type="password" placeholder="password" id="signUpPw" required>
    <input type="button" onClick="SignUp()" value="SignUp">
  </form>
</div>

<div id="loginSection" class="input-group">
  <h2 id="loginTitle" class="input-group title toggle">Login</h2>
  <form id="loginForm" class="input-group form hideOnStart">
    <input type="email" placeholder="email" id="loginEmail" required>
    <input type="password" placeholder="password" id="loginPw" required>
    <input type="button" onClick="Login()" value="Login">
  </form>
</div>

<div id="addSection" class="input-group hideOnStart">
  <h2 id="addTitle" class="input-group title toggle">Add Post</h2>
  <form id="addForm" class="input-group form hideOnStart">
    <input type="text" placeholder="Title" id="inputTitle" required>
    <input type="text" placeholder="Date" id="inputDate" required>
    <!-- <input type="text" placeholder="Content" id="inputContent" required> -->
    <textarea placeholder="Content" id="inputContent"></textarea>
    <input type="text" placeholder="Image" id="inputImages">
    <input type="text" placeholder="Tags" id="inputTags">
    <input type="button" onClick="AddPost()" value="Submit">
  </form>
</div>

<div id="addProject" class="input-group hideOnStart">
  <h2 id="addProjectTitle" class="input-group title toggle">Add Project</h2>
  <form id="addProjectForm" class="input-group form hideOnStart">
    <input type="text" placeholder="Title" id="inputProjectTitle" required />
    <textarea placeholder="Description" id="inputProjectDescription"></textarea>
    <input type="text" placeholder="Image" id="inputProjectImage" />
    <input type="button" onClick="AddProject()" value="Submit" />
  </form>
</div>

<div id="addImage" class="input-group hideOnStart">
  <h2 id="addImage" class="input-group title toggle">Add Image</h2>
  <form id="addImageForm" class="input-group form hideOnStart">
    <input type="text" placeholder="Image" id="inputImageImage" />
    <input type="button" onClick="AddImage()" value="Submit" />
  </form>
</div>

<div id="changeSection" class="input-group">
  <h2 id="changeTitle" class="toggle input-group title">Change Password</h2>
  <form id="changeForm" class="hideOnStart input-group form">
    <input type="email" placeholder="email" id="changeEmail" required>
    <input type="password" placeholder="old password" id="changeOldPw" required>
    <input type="password" placeholder="new password" id="changeNewPw" required>
    <input type="button" onClick="ChangePw()" value="Login">
  </form>
</div>
`
