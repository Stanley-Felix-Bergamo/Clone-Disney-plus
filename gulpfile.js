const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const terser = require("gulp-terser");
function comprimeJs() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(terser())
    .pipe(gulp.dest("./dist/js"));
}

function comprimeImagens() {
  return gulp
    .src("./src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"));
}

function compileSass() {
  return gulp
    .src("./src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./dist/css"));
}

exports.images = comprimeImagens;
exports.sass = compileSass;
exports.js = compileSass;

exports.default = gulp.series(
  gulp.parallel(compileSass, comprimeImagens, comprimeJs),
  function () {
    gulp.watch("./src/styles/**/*.scss", compileSass);
    gulp.watch("./src/images/**/*", comprimeImagens);
    gulp.watch("./src/js/**/*", comprimeJs);
  },
);
