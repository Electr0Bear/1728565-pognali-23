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
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("/style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
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

// JS

const scriptmin = () => {
  return gulp.src('source/js/script.js')
    .pipe(terser())
    .pipe(rename("/script.min.js"))
    .pipe(gulp.dest("build/js"));
}
exports.scriptmin = scriptmin;

// Images

const imagesOptimise = () => {
  return gulp.src('source/img/**/*.{jpg,png,svg}')
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"));
}
exports.imagesOptimise = imagesOptimise;

// Images-copy

const imagesCopy = done => {
  gulp.src("source/img/**/*.{jpg,png,svg}", {
      base: "source"
    })
    .pipe(gulp.dest("build"));
  done();
}
exports.imagesCopy = imagesCopy;

// Webp

const imagesWebp = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"));
}
exports.imagesWebp = imagesWebp;

// Sprites

const sprites = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build"))
}
exports.sprites = sprites;

//Copy

const copy = done => {
  gulp.src("source/fonts/*.{woff,woff2}", {
      base: "source"
    })
    .pipe(gulp.dest("build"));
  done();
}
exports.copy = copy;

//Clean

const clean = () => {
  return del("build");
}
exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Reload

const reload = done => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/script.js", gulp.series(scriptmin));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build

const build = gulp.series(
  clean,
  copy,
  imagesOptimise,
  gulp.parallel(
    styles,
    html,
    scriptmin,
    sprites,
    imagesWebp
  )
);
exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  imagesCopy,
  gulp.parallel(
    styles,
    html,
    scriptmin,
    sprites,
    imagesWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
