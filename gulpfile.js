const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass")); // Compila Sass para CSS
const cleanCSS = require("gulp-clean-css"); // Minifica o CSS final

// Tarefa para processar o Sass
function compileSass() {
  return gulp
    .src("./src/styles/**/*.scss") // Local dos arquivos .scss
    .pipe(sass().on("error", sass.logError)) // Transpila para CSS
    .pipe(cleanCSS()) // Minifica o arquivo gerado
    .pipe(gulp.dest("./dist/css")); // Pasta de destino
}

// Exporta a tarefa
exports.default = compileSass;

exports.watch = function () {
  gulp.watch("./src/styles/*.scss", gulp.parallel(compileSass));
};
