const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
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

exports.default = gulp.series(
  gulp.parallel(compileSass, comprimeImagens),
  function () {
    gulp.watch("./src/styles/**/*.scss", compileSass);
    gulp.watch("./src/images/**/*", comprimeImagens);
  },
);
