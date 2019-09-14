//Paket som används
const {src, dest, watch, series, parallel} = require("gulp")
const browserSync = require("browser-sync").create()
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const uglifyCss = require("gulp-clean-css");

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
        .pipe(dest("pub"))
        .pipe(browserSync.stream())
}

//Task sammanslå, minifiera och kopiera CSS-filer
function cssTask() {
    return src(files.cssPath)
        .pipe(concat("style.css"))
        .pipe(uglifyCss())
        .pipe(dest("pub/css"))
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
    watch([files.htmlPath, files.cssPath, files.jsPath, files.imgPath],
        parallel(copyHtml, cssTask, jsTask, copyImg)
    ).on('change', browserSync.reload);
}

//Gör funktionerna publika
exports.default = series(
    parallel(copyHtml, cssTask, jsTask, copyImg),
    watchTask
);