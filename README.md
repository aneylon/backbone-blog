# Backbone Blog
Simple Full Stack JavaScript blogging app featuring:

 - [Backbone](http://backbonejs.org/)
   - [Underscore](http://underscorejs.org/)
   - [jQuery](http://jquery.com/)
 - [Express](http://expressjs.com/)
 - [Bookshelf](http://bookshelfjs.org)
   - [Knex](http://knexjs.org/)
   - [Sqlite](https://github.com/kriasoft/node-sqlite)
 - [Bootstrap](http://getbootstrap.com/)

Live Example : My-Backbone-Blog

## Setup
### Local
Run `npm i` to install dependencies

Include a `.env` file in the root of the app with the following settings.
```
PORT = 8080 # Whatever port you need.
SECRET = someSecret # For creating JWTs.
CODE = SomeString # For signing up new users.
```
Run `nodemon` to start the sever.
Run `gulp` to execute all built and lint tasks and start Browser Sync.

### Deployment
Configure environment variables as mentioned above.

Compile `src` directory and deploy to hosting site. Leave out the `src` directory when deploying.

### Design Decisions

Libraries are loaded via CDN to improve performance.

Front end is split in to multiple files in the `src` directory for ease of editing.

Files must be compiled with gulp tasks before changes will be visible.
