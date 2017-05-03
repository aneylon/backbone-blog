const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()
const standard = require('gulp-standard')

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
})

gulp.task('lint', () => {
  return gulp.src([
    './src/**/*.js'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('default', ['lint', 'js'])
