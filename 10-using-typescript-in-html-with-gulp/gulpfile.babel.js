import { src, dest, series, parallel, watch } from 'gulp';
import clean from 'gulp-clean';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import { create } from 'browser-sync';
import merge from 'merge-stream';

const browsersync = create();

// syncBrowser
const syncBrowser = (callback) => {
  browsersync.init({
    server: {
      baseDir: 'public',
    },
    port: 3000,
  });
  callback();
};

// Clean public directory
export const cleanAll = () => {
  // const js = src('public/js/*').pipe(clean({ force: true }));
  const css = src('public/css/*').pipe(clean({ force: true }));
  const html = src(['public/index.html', 'public/html/*'], {
    allowEmpty: true,
  }).pipe(clean({ force: true }));

  // return merge(js, css, html);
  return merge(css, html);
};

// Transpile SCSS to CSS
const transpileSCSS = () => {
  return src('src/scss/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('public/css'))
    .pipe(browsersync.stream({ stream: true }));
};

// check some file is fiexed
const isFixed = (file) => {
  return file.eslint !== null && file.eslint.fixed;
};

// lint TypeScript and JavaScript
export const lintAll = () => {
  const js = src('src/ts/**/*.(ts|js)')
    .pipe(plumber())
    .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, dest('src/ts')))
    .pipe(eslint.failAfterError())
    .pipe(browsersync.stream({ stream: true }));

  // const gulpfile = src('gulpfile.babel.js')
  //   .pipe(plumber())
  //   .pipe(eslint({ configFile: '.eslintrc.yml', fix: true }))
  //   .pipe(eslint.format())
  //   .pipe(gulpIf(isFixed, dest('./')))
  //   .pipe(eslint.failAfterError());

  //return merge(js, gulpfile).pipe(browsersync.stream({ stream: true }));

};

// Copy HTML
export const copyHtml = () => {
  const root = src('src/index.html').pipe(dest('public'));
  const children = src('src/html/**/*.html').pipe(dest('public/html'));

  return merge(root, children).pipe(browsersync.stream({ stream: true }));
};

const watchFiles = () => {
  watch(['src/index.html', 'src/html/**/*.html'], copyHtml);
  watch('src/scss/**/*.scss', transpileSCSS);
  watch('src/ts/**/*.(ts|js)', lintAll);
};

export const watchAll = parallel(watchFiles, syncBrowser);
const build = series(cleanAll, parallel(transpileSCSS, copyHtml, lintAll));

export default build;
