const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const imagemin = require("gulp-imagemin");

function comprimeImagens() {
  return gulp
    .src("./src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"));
}

function compileSass() {
  return gulp
    .src("./src/styles/**/*.scss") 
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"));
}

// Exporta as tarefas individuais
exports.images = comprimeImagens;
exports.sass = compileSass;

// Tarefa padrão: Roda tudo e depois fica vigiando
exports.default = gulp.series(
  gulp.parallel(compileSass, comprimeImagens),
  function () {
    gulp.watch("./src/styles/**/*.scss", compileSass);
    gulp.watch("./src/images/**/*", comprimeImagens);
  },
);
