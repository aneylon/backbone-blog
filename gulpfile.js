const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync')

gulp.task('serve', () => {
  browserSync.init({
    proxy: 'localhost:8080'
  })
  gulp.watch('./public/*.html').on('change', browserSync.reload)
})

gulp.task('watch', () => {
  gulp.watch([
    './src/js/**/*.js',
    './server/**/*.js'
  ],['js'])
  gulp.watch(['./src/scss/**/*.scss'], ['css'])
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
    './src/js/*.js'
  ])
    .pipe(plugins.babel({
      presets: ['es2015']
    }))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('./public/js'))
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

gulp.task('default', ['css', 'lint', 'js', 'watch', 'serve'])
