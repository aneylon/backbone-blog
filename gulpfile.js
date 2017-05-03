const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const browserSync = require('browser-sync')

gulp.task('serve', () => {
  browserSync.init({
    // server: {
    //   baseDir: './public'
    // },
    proxy: 'localhost:8080'
  })
})

gulp.task('watch', () => {
  gulp.watch([
    './src/js/**/*.js',
    './server/**/*.js'
  ],['js'])
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

gulp.task('default', ['lint', 'js', 'watch', 'serve'])
