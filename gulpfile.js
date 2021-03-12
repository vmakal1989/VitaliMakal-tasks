const {src, dest, parallel, series, watch} = require('gulp')

// Load plugins

const changed = require('gulp-changed')
const browsersync = require('browser-sync').create()
const imagemin = require('gulp-imagemin')
const clean = require('gulp-clean')
const autoprefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')
const cssnano = require('gulp-cssnano')


sass.compiler = require('node-sass')



function clear() {
	return src('./build/*', {
		read: false
	})
		.pipe(clean());
}

// CSS 

function scss() {
	const source = './src/scss/**/*.scss';

	return src(source)
		.pipe(changed(source))
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		}))
		.pipe(cssnano())
		.pipe(dest('./build/css'))
		.pipe(browsersync.stream());
}

// Optimize images

function img() {
	return src('./src/images/**/*')
		.pipe(imagemin())
		.pipe(dest('./build/images'))
		.pipe(browsersync.stream());
}

// html

function html() {
	return src('./src/*.html')
		.pipe(dest('./build/'))
		.pipe(browsersync.stream());
}

// Watch files

function watchFiles() {
	watch('./src/scss/**/*', scss);
	watch('./src/*.html', html);
	watch('./src/images/*', img);
}

// BrowserSync

function browserSync() {
	browsersync.init({
		server: {
			baseDir: './build'
		},
		port: 3000
	});
}

exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(html, scss, img))