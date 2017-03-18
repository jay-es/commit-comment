const gulp = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

const jsPath = 'src/scripts/';
const jsFiles = [
  `${jsPath}pubsub-es2015.js`,
  `${jsPath}cc.js`,
  `${jsPath}historyData.js`,
  `${jsPath}form.js`,
  `${jsPath}comment.js`,
  `${jsPath}historyList.js`,
  `${jsPath}radioLists.js`,
  `${jsPath}init.js`,
];
const babelConf = {
  presets: ['babili'],
};

const sassPath = 'src/sass/';
const sassFile = `${sassPath}style.scss`;
const sassConf = {
  outputStyle: 'compact',
};

gulp.task('all', ['sass', 'js-min']);

gulp.task('w', ['all'], () => {
  gulp.watch(jsFiles, ['js']);
  gulp.watch(`${sassPath}*.scss`, ['sass']);
});

gulp.task('sass', () => {
  gulp.src(sassFile)
  .pipe(sass(sassConf))
  .pipe(concat('style.css'))
  .pipe(gulp.dest('docs'));
});

gulp.task('js', () => {
  gulp.src(jsFiles)
  .pipe(concat('app.js'))
  .pipe(gulp.dest('docs'));
});

gulp.task('js-min', () => {
  gulp.src(jsFiles)
  .pipe(concat('app.js'))
  .pipe(babel(babelConf))
  .pipe(gulp.dest('docs'));
});
