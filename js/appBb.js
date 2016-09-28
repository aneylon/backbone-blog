var AboutView = Backbone.View.extend({
  render: function(){
    this.$el.html(aboutTemp)
    return this
  }
})

var AdminView = Backbone.View.extend({
  events: {
    'click .toggle': 'toggleView'
  },
  toggleView: function(e){
    $(e.target).parent().children('form').slideToggle('fast')
  },
  render: function(){
    this.$el.html(adminTemp)
    checkLogin()
    setTimeout(()=>{
      setDate()
    },0)
    return this
  }
})

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
  template: _.template('<a data-url="<%= url %>" class="button grey"><%= text %>'),
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var LinksView = Backbone.View.extend({
  el: '#navLinks',
  render: function(){
    this.$el.html('')
    this.collection.forEach(function(link){
      var linkView = new LinkView({ model: link })
      this.$el.append(linkView.render().$el)
    }, this)
    return this
  }
})

var links = new Links([
  {text:'home', url:'/'},
  {text:'projects', url:'projects'},
  {text:'images', url:'images'},
  {text:'about', url:'about'}
])

var linksView = new LinksView({collection: links})
linksView.render()

var Image = Backbone.Model.extend({
  defaults: {
    image: ''
  }
})

var Images = Backbone.Firebase.Collection.extend({
  url: fbURL + '/images',
  model: Image
})

var ImageView = Backbone.View.extend({
  template: _.template(imagesTemp),
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var ImagesView = Backbone.View.extend({
  render: function(){
    this.$el.html('')
    this.collection.forEach(function(item){
      var imageView = new ImageView({ model : item })
      this.$el.append(imageView.render().$el)
    }, this)
    return this
  }
})

var Project = Backbone.Model.extend({
  defaults: {
    title: '',
    image: '',
    description: ''
  }
})

var Projects = Backbone.Firebase.Collection.extend({
  url: fbURL + '/projects',
  model: Project
})

var ProjectView = Backbone.View.extend({
  template: _.template(projectsTemp),
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var ProjectsView = Backbone.View.extend({
  render: function(){
    this.$el.html('')
    this.collection.forEach(function(item){
      var projectView = new ProjectView({ model: item })
      this.$el.append(projectView.render().$el)
    }, this)
    return this
  }
})

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

var PostView = Backbone.View.extend({
  template: _.template(postTemplate),
  render: function(){
    this.$el.html(this.template(this.model.attributes))
    return this
  }
})

var PostsView = Backbone.View.extend({
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
      $('code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },0)
    return this
  }
})

var Router = Backbone.Router.extend({
  routes: {
    '': 'viewHome',
    'projects': 'viewProjects',
    'images': 'viewImages',
    'about': 'viewAbout',
    'admin': 'viewAdmin',
    '*other': 'viewHome'
  },
  viewHome: function(){
    var posts = new Posts()
    posts.on('sync',(col)=>{
      this.loadView(new PostsView({ collection: posts}))
    })
  },
  viewProjects: function(){
    var projects = new Projects()
    projects.on('sync', (col)=>{
      this.loadView(new ProjectsView({ collection: projects }))
    })
  },
  viewImages: function(){
    var images = new Images()
    images.on('sync', col => {
      this.loadView(new ImagesView({ collection: images }))
    })
  },
  viewAbout: function(){
    this.loadView(new AboutView())
  },
  viewAdmin: function(){
    this.loadView(new AdminView())
  },
  loadView: function(view){
    if(this._currentView){
      this._currentView.remove()
    }
    $('#posts').html(view.render().$el)
    this._currentView = view
  }
})

var router = new Router()
Backbone.history.start()

var NavView = Backbone.View.extend({
  events: {
    'click': 'onClick'
  },
  onClick: function(e){
    var $li = $(e.target)
    router.navigate($li.attr('data-url'), {trigger: true})
  }
})

var navView = new NavView({ el: '#navLinks'})
