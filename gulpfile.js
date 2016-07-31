var gulp         = require('gulp'),
sass         = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
cleanCSS    = require('gulp-clean-css'),
rename       = require('gulp-rename'),
browserSync  = require('browser-sync').create(),
concat       = require('gulp-concat'),
babel        = require('gulp-babel'),
uglify       = require('gulp-uglify');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
	browserSync.init({
		server: {
			baseDir: "./app"
		},
		notify: false
	});
});


gulp.task('es6', () => {
	return gulp.src('js/common.js')
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(gulp.dest("./app/js/"));
});


gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/modernizr/modernizr.js',
		'./app/libs/jquery/dist/jquery.min.js',
		'./app/libs/owl.carousel/dist/owl.carousel.min.js',
		'./app/libs/snap.svg-min.js',
		'./app/libs/Slicebox/js/jquery.slicebox.min.js'

		])
	.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
	});

gulp.task('watch', function () {
	gulp.watch('js/common.js', ['es6']);
	gulp.watch('sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['scripts']);
	gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
