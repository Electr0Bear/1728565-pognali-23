const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const terser = require("gulp-terser");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'));
};
exports.html = html;

// CSS

const cssmin = () => {
  return gulp.src('source/css/style.css')
    .pipe(postcss([
      csso()
    ]))
    .pipe(rename("/style.min.css"))
    .pipe(gulp.dest("build/css"));
}
exports.cssmin = cssmin;

// JS
const scriptmin = () => {
  return gulp.src('source/js/script.js')
    .pipe(terser())
    .pipe(rename("/script.min.js"))
    .pipe(gulp.dest("build/js"));
}
exports.scriptmin = scriptmin;




// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);
