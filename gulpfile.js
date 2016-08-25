// TODO: this version of gulp-jsdoc is not working properly, either use jsdoc cli or find a better task for it
//jsdoc = require('gulp-jsdoc'),

var gulp = require('gulp'),
	clean = require('gulp-clean'),
	jscs = require('gulp-jscs'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	paths = {
		bower: ['bower_components/**/*.js'],
		html: ['src/html/**/*.html'],
		scripts: ['src/js/**/*.js'],
		img: ['src/img/**/*{.png,.jpg,.gif,.svg}'],
		less: ['src/less/**/*.less']
	},
	less = require('gulp-less-sourcemap'),
	plumber = require('gulp-plumber'),
	livereload = require('gulp-livereload');


// CLEAN TASKS
gulp.task('clean:css', function () {
	return gulp.src('public/css', { read: false })
		.pipe(clean());
});

gulp.task('clean:less', function () {
	return gulp.src('public/less', { read: false })
		.pipe(clean());
});

gulp.task('clean:html', function () {
	return gulp.src('public/html', { read: false })
		.pipe(clean());
});

gulp.task('clean:js', function () {
	return gulp.src('public/js', { read: false })
		.pipe(clean());
});

gulp.task('clean:bower', function () {
	return gulp.src('public/bower_components', { read: false })
		.pipe(clean());
});

gulp.task('clean:img', function () {
	return gulp.src('public/img', { read: false })
		.pipe(clean());
});

// COPY TASKS
gulp.task('copy:less', ['clean:less'], function () {
	return gulp.src(paths.less)
		.pipe(gulp.dest('public/less'));
});

gulp.task('copy:html', ['clean:html'], function () {
	return gulp.src(paths.html)
		.pipe(gulp.dest('public/html'));
});

gulp.task('copy:js', ['clean:js'], function () {
	return gulp.src(paths.scripts)
		.pipe(gulp.dest('public/js'));
});

gulp.task('copy:bower', ['clean:bower'], function () {
	return gulp.src(paths.bower)
		.pipe(gulp.dest('public/bower_components'));
});

gulp.task('copy:img', ['clean:img'], function () {
	return gulp.src(paths.img)
		.pipe(gulp.dest('public/img'));
});

// CSS TASKS
gulp.task('less', ['clean:css'], function () {
	return gulp.src(paths.less)
		.pipe(plumber())
		.pipe(less({
			sourceMap: {
				sourceMapURL: 'pdp.css.map',
				sourceMapRootpath: 'src/less',
				sourceMapFileInline: false
			}
		}))
		.pipe(gulp.dest('public/css'))
		.pipe(livereload());
});

// JS TASKS
gulp.task('jscs', function () {
	return gulp.src(paths.scripts.concat(['*.js']))
		.pipe(jscs())
		.pipe(jscs.reporter());
});

gulp.task('jslint', function () {
	return gulp.src(paths.scripts.concat(['*.js']))
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// DEFINE TASKS
gulp.task('default', ['bower', 'css', 'html', 'js', 'img']);

gulp.task('bower', ['copy:bower']);

gulp.task('clean', ['clean:html', 'clean:css', 'clean:less', 'clean:js', 'clean:bower', 'clean:img']);

gulp.task('copy', ['copy:html', 'copy:less', 'copy:js', 'copy:bower', 'copy:img']);

gulp.task('css', ['less', 'copy:less']);

gulp.task('html', ['copy:html']);

gulp.task('img', ['copy:img']);

gulp.task('js', ['jscs', 'jslint', 'copy:js']);

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.html, ['html']);
	gulp.watch(paths.scripts, ['jscs', 'jslint', 'copy:js']);
	gulp.watch(paths.less, ['css']);
});
