//Paket som används
const {src, dest, watch, series, parallel} = require("gulp")
const browserSync = require("browser-sync").create()
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const uglifyCss = require("gulp-clean-css");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

//Sökvägar
const files = {
    htmlPath: "src/**/*.html",
    sassPath: "src/**/*.scss",
    jsPath: "src/**/*.js",
    imgPath: "src/images/**"
}

//Kopiera HTML-filer
function copyHtml() {
    return src(files.htmlPath)
        .pipe(dest("pub"))
        .pipe(browserSync.stream())
}

//Task konverterar från SCSS till CSS, sammanslår, minifierar och kopierar CSS-filer 
function sassTask() {
    return src(files.sassPath)
        .pipe(sass().on("error", sass.logError))
        .pipe(concat("style.css"))
        .pipe(uglifyCss())
        .pipe(dest("pub/scss"))
        .pipe(browserSync.stream())
}

//Task sammanslå, minifiera och kopiera JS-filer
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("pub/js"))
        .pipe(browserSync.stream())
}

//Kopiera alla bilder
function copyImg() {
    return src(files.imgPath)
    .pipe(dest("pub/images/"))
    .pipe(browserSync.stream())
}

//Task watcher
function watchTask() {
    browserSync.init({
        server: {
            baseDir: 'pub/'
        }
    });
    watch([files.htmlPath, files.sassPath, files.jsPath, files.imgPath],
        parallel(copyHtml, sassTask, jsTask, copyImg)
    ).on('change', browserSync.reload);
}

//Gör funktionerna publika
exports.default = series(
    parallel(copyHtml, sassTask, jsTask, copyImg),
    watchTask
);