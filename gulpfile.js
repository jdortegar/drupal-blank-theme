const gulp = require('gulp'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  browserSync = require('browser-sync').create();

gulp.task('style', () => {
  return gulp
    .src(['./node_modules/bootstrap/scss/bootstrap.scss', './themes/custom/gftheme/sass/**/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest('./themes/custom/gftheme/css'))
    .pipe(browserSync.stream());
});

gulp.task('script', () => {
  return (
    gulp
      .src([
        './node_modules/bootstrap/dist/js/bootstrap.min.js',
        './node_modules/jquery/dist/jquery.min.js',
        './node_modules/popper.js/dist/umd/popper.min.js',
        './themes/custom/gftheme/lib/*.js'
      ])
      // .pipe(uglify())
      .pipe(gulp.dest('./themes/custom/gftheme/js'))
      .pipe(browserSync.stream())
  );
});

gulp.task('fontAwesome', () => {
  return gulp
    .src(['./node_modules/font-awesome/css/font-awesome.min.css'])
    .pipe(gulp.dest('./themes/custom/gftheme/css'));
});

gulp.task('fonts', () => {
  return gulp.src(['./node_modules/font-awesome/fonts/*']).pipe(gulp.dest('./themes/custom/gftheme/fonts'));
});

gulp.task(
  'serve',
  gulp.series(['style', 'script'], () => {
    browserSync.init({
      proxy: 'http://localhost:8888/d8theming/'
    });
    gulp.watch('./themes/custom/gftheme/sass/**/*.scss', gulp.series('style'));
    gulp.watch('./themes/custom/gftheme/lib/*.js', gulp.series('script'));
    gulp.watch('./themes/custom/gftheme/*.*.twig').on('change', browserSync.reload);
  })
);

gulp.task('default', gulp.series('style', 'serve', 'script', 'fontAwesome', 'fonts'));
