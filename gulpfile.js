"use strict";

var gulp = require("gulp");
var less = require("gulp-less"); 
var sourcemap = require("gulp-sourcemaps");
var server = require("browser-sync").create();
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var del = require("del");

gulp.task("development", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("live reload", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch("source/less/**/*.less", gulp.series("development"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("images optimization", function() {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel:3}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("create webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
})

gulp.task("clean build", function () {
	return del("build");
});

gulp.task("css for production", function () {
  return gulp.src("source/css/style.css")
    .pipe(gulp.dest("build/css"));
});

gulp.task("compress js", function() {
  return gulp.src("source/js/*.js")
  .pipe(gulp.dest("build/js"));
});

gulp.task("html for production", function() {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"));
})

gulp.task("copy other", function() {
	return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.{ico,png}",
    "source/video/*.{mp4,webm,ogg}"
    ], {
			base: "source"
		})
		.pipe(gulp.dest("build"));
});

gulp.task("start", gulp.series(
  "development",
  "live reload"
));

gulp.task("build", gulp.series(
  "clean build",
  "development",
  "images optimization",
  "create webp",
  "html for production",
  "css for production",
  "compress js",
  "copy other"
));
