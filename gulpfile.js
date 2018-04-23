const gulp = require("gulp");
const browserSync = require("browser-sync");
const minifyCss = require("gulp-minify-css");
const gulpif = require("gulp-if");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const watch = require("gulp-watch");
const bs = require("browser-sync").create();

gulp.task("browser-sync", () => {
    browserSync({
        injectChanges: true,
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task("copy-index-file", () => {
    let stream = gulp.src("./app/index.html").pipe(gulp.dest("./public/"));
});
gulp.task("copy-html-files", () => {
    let stream = gulp
        .src("./app/views/**/*.html")
        .pipe(gulp.dest("./public/views/"));
    return stream;
});
/**
 * Will create a dist/css/main.css
 * @type {[type]}
 */
gulp.task("css-files", () => {
    let stream = gulp
        .src("./app/css/*.css")
        .pipe(gulpif("*.css", minifyCss()))
        .pipe(gulpif("*.css", gulp.dest("./public/")));
    return stream;
});

gulp.task("data-files", () => {
    gulp.src("./app/data/images/**").pipe(gulp.dest("./public/images"));

    gulp.src("./app/data/movies.json").pipe(gulp.dest("./public/data/"));
});

gulp.task("combine-js", () => {
    let stream = gulp
        .src([
            "./app/app.js",
            "./app/js/routes.js",
            "./app/js/controller/AppController.controller.js",
            "./app/js/service/data.service.js",
            "./app/js/directive/star.directive.js",
            "./app/js/service/barChart.service.js"
        ])
        .pipe(concat("ng-app.js"))
        .pipe(gulp.dest("./public/js/"));
    return stream;
});

gulp.task("clean", () => {
    let stream = gulp.src("./public/", { read: false }).pipe(clean());
    return stream;
});

gulp.task("watch", () => {
    gulp
        .watch("./app/views/*.html", ["copy-html-files"])
        .on("change", bs.reload);
    gulp.watch("./app/css/*.css", ["css-files"]).on("change", bs.reload);
    gulp.watch("./app/js/*.js", ["combine-js"]).on("change", bs.reload);
});

gulp.task("default", [
    "data-files",
    "css-files",
    "copy-index-file",
    "copy-html-files",
    "combine-js",
    "browser-sync",
    "watch"
]);
