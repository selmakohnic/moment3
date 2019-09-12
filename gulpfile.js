//Paket som används
const {src, dest, watch, series, parallel} = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const uglifyCss = require("gulp-clean-css");
const livereload = require("gulp-livereload");

//Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    cssPath: "src/**/*.css",
    jsPath: "src/**/*.js",
    imgPath: "src/images/**"
}

//Kopiera HTML-filer
function copyHtml() {
    return src(files.htmlPath)
        .pipe(dest("pub")
        .pipe(livereload())
    );
}

//Task sammanslå, minifiera och kopiera CSS-filer
function cssTask() {
    return src(files.cssPath)
        .pipe(concat("style.css"))
        .pipe(uglifyCss())
        .pipe(dest("pub/css")
        .pipe(livereload())
    );
}

//Task sammanslå, minifiera och kopiera JS-filer
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("pub/js")
        .pipe(livereload())
    );
}

//Kopiera alla bilder
function copyImg() {
    return src(files.imgPath)
    .pipe(dest("pub/images/")
    .pipe(livereload())
    );
}

//Task watcher
function watchTask() {
    livereload.listen();
    watch([files.htmlPath, files.cssPath, files.jsPath, files.imgPath],
        parallel(copyHtml, cssTask, jsTask, copyImg)
    );
}

//Gör funktionerna publika
exports.default = series(
    parallel(copyHtml, cssTask, jsTask, copyImg),
    watchTask
);