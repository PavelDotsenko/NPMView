'use strict';

// ================================================
//			Connecting modules
// ================================================
const gulp 	   = require('gulp'),
	  sass 	   = require('gulp-sass'),
	  prefixer = require('gulp-autoprefixer'),
	  cssnano  = require('gulp-cssnano'),
	  concat   = require('gulp-concat'),
	  uglify   = require('gulp-uglify-es').default;

// ================================================
//			Variables
// ================================================
const
	source = 'src/',
	out    = 'www/',
	src    = {
		js: {
			libs: source + 'js/libs/*.js',
			classes: [
				source + 'js/classes/Game.js',
				source + 'js/classes/GameObject.js',
				source + 'js/classes/NameEnter.js'
			],
			custom: [
					source + 'js/functions.js',
					source + 'js/main.js'
				],
			all: source + 'js/**/*.js'
		},
		sass: {
			libs: 'sass/libs/*.sass',
			custom: source + 'sass/*.sass',
			all: source + 'sass/**/*.sass'
		}
	},
	dest = {
		js: {
			libs: out + 'js/',
			classes: out + 'js/',
			custom: out + 'js/'
		},
		css: out + 'css/'
	};


// ================================================
//			Functions
// ================================================

function customStyle() {
	return gulp.src(src.sass.custom)
		.pipe(sass())
		.pipe(prefixer({browsers: ['last 2 versions'], cascade: false}))
		.pipe(cssnano({discardUnused: {fontFace: false}}))
		.pipe(gulp.dest(dest.css))
}

function customJS() {
	return gulp.src(src.js.custom)
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest.js.custom))
}

function libsJS() {
	return gulp.src(src.js.libs)
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest.js.libs))
}

function classesJS() {
	return gulp.src(src.js.classes)
		.pipe(concat('classes.js'))
		.pipe(uglify())
		.pipe(gulp.dest(dest.js.classes))
}

function watchFiles() {
	gulp.watch(src.sass.custom, customStyle);
	gulp.watch(src.js.custom, customJS);
	gulp.watch(src.js.libs, libsJS);
	gulp.watch(src.js.classes, classesJS)
}

gulp.task('libsJS', libsJS);
gulp.task('classesJS', classesJS);
gulp.task('customJS', customJS);
gulp.task('customStyle', customStyle);


gulp.task('default', gulp.series(
	'libsJS',
	'classesJS',
	'customJS',
	'customStyle',
	gulp.parallel(watchFiles)
));
