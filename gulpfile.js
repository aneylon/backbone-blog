const gulp = require('gulp')
const plugins = require('gulp-load-plugins')()

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

gulp.task('default', ['js'])
