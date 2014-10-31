var gulp = require('gulp'),
    plugin = require('gulp-load-plugins')({camelize:true}),
    mainBowerFiles = require('main-bower-files');


// Paths
// =======================================================

var paths = {
  jade: 'app/**/*.jade',
  scss: 'app/assets/css/**/*.scss',
  images: 'app/assets/img/**',
  coffee: 'app/assets/coffee/**/*.coffee'
};


// Bower
// =======================================================

gulp.task('vendor', function() {
  return gulp.src(mainBowerFiles(), { 
    base: 'app/vendor/'
  })
  .pipe(gulp.dest('dist/assets/vendor'))
});


// HTML
// =======================================================

gulp.task('html', function() {
  return gulp.src(paths.jade)
    .pipe(plugin.jade())
    .pipe(gulp.dest('dist/'))
    .pipe(plugin.connect.reload())
});


// CSS
// =======================================================

gulp.task('css', function() {
  return gulp.src(paths.scss)
    .pipe(plugin.sass())
    .pipe(plugin.autoprefixer("last 1 version"))
    .pipe(plugin.minifyCss())
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(plugin.connect.reload())
});


// Coffee
// =======================================================

gulp.task('coffee', function() {
  gulp.src(paths.coffee)
    .pipe(plugin.concat('scripts.min.js'))
    .pipe(plugin.coffee({}).on('error', plugin.util.log))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(plugin.connect.reload());
});


// Images
// =======================================================

gulp.task('optimizeImages', function() {
  return gulp.src(paths.images)
    .pipe(plugin.newer('dist/assets/img'))
    .pipe(plugin.imagemin())
    .pipe(gulp.dest('app/assets/img/'))
})

gulp.task('cleanImages', ['optimizeImages'], function() {
  return gulp.src('dist/assets/img')
    .pipe(plugin.clean())
});

gulp.task('copyImages', ['cleanImages'], function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/assets/img'))
});


// Watch
// =======================================================

gulp.task('watch', ['compile'], function() {
  gulp.watch(paths.jade, ['html']);
  gulp.watch(paths.icons, ['css']);
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.images, ['copyImages']);
});


// Server
// =======================================================

gulp.task('connect', function() {
  plugin.connect.server({
    root: 'dist',
    port: '8000',
    livereload: true
  });
});


// Tasks
// =======================================================

gulp.task('default', ['watch', 'connect']);
gulp.task('compile', ['vendor', 'html', 'css', 'copyImages', 'coffee'])
