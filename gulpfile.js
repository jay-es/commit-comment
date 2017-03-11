const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

const jsPath = 'src/scripts/';
const jsFiles = [
  `${jsPath}pubsub-es2015.js`,
  `${jsPath}cc.js`,
  `${jsPath}historyData.js`,
  `${jsPath}form.js`,
  `${jsPath}comment.js`,
  `${jsPath}branchHistory.js`,
  `${jsPath}radioLists.js`,
  `${jsPath}init.js`,
];

const sassPath = 'src/sass/';
const sassFile = `${sassPath}style.scss`;


gulp.task('all', ['sass', 'js']);

gulp.task('w', () => {
  gulp.watch(jsFiles, ['js']);
  gulp.watch(`${sassPath}*.scss`, ['sass']);
});

gulp.task('sass', () => {
  gulp.src(sassFile)
  .pipe(concat('style.css'))
  .pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
  gulp.src(jsFiles)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('dist'));
});
