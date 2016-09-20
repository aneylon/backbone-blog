var ProjectsView = Backbone.View.extend({
  render: function(){
    this.$el.html('Projects View')
    return this
  }
})

var ImagesView = Backbone.View.extend({
  render: function(){
    this.$el.html('Images View')
    return this
  }
})

var AboutView = Backbone.View.extend({
  render: function(){
    this.$el.html('About View')
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

var links = new Links([
  {text:'home', url:'/'},
  {text:'projects', url:'projects'},
  {text:'images', url:'images'},
  {text:'about', url:'about'}
])

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
    // event for 'onRender'?
    setTimeout(function(){
      $('code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    },0)
    return this
  }
})

var postsView = new PostsView({ collection: posts })

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
    this.loadView(new ProjectsView())
  },
  viewImages: function(){
    this.loadView(new ImagesView())
  },
  viewAbout: function(){
    this.loadView(new AboutView())
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
    console.log('router nav click')
    var $li = $(e.target)
    router.navigate($li.attr('data-url'), {trigger: true})
  }
})

var navView = new NavView({ el: '#navLinks'})
