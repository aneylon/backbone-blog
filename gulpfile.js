const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync')

gulp.task('serve', () => {
  browserSync.init({
    proxy: 'localhost:8080'
  })
  // gulp.watch('./public/*.html').on('change', browserSync.reload)
})

gulp.task('watch', () => {
  gulp.watch([
    './src/js/**/*.js',
    './server/**/*.js'
  ], ['js'])
  gulp.watch(['./src/scss/**/*.scss'], ['css'])
  gulp.watch(['./src/html/**/*.html'], ['html'])
})

gulp.task('css', () => {
  return gulp.src([
    './src/scss/**/*.scss'
  ])
    .pipe(plugins.concat('style.css'))
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    // .pipe(plugins.cssmin())
    .pipe(plugins.autoprefixer())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

gulp.task('js', () => {
  return gulp.src([
    './src/js/links.js',
    './src/js/about.js',
    './src/js/admin.js',
    './src/js/contact.js',
    './src/js/posts.js',
    './src/js/router.js'
  ])
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(plugins.concat('app.js'))
    // .pipe(plugins.uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream())
})

gulp.task('html', () => {
  return gulp.src([
    './src/html/index.html',
    './src/html/templates/**/*.html',
    './src/html/scripts.html',
    './src/html/end.html'
  ])
    .pipe(plugins.concat('index.html'))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream())
})

gulp.task('lint', () => {
  return gulp.src([
    './src/**/*.js'
  ])
    .pipe(plugins.standard())
    .pipe(plugins.standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('default', [
  // 'lint',
  'css',
  'html',
  'js',
  'watch',
  'serve'
])
