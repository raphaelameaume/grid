import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import util from 'gulp-util';
import config from '../config';
import options from '../options';
import errorHandler from '../utils/error-handler';

gulp.task('scripts', () => {
	if(options.debug){
		gulp.start('watchify');

	}else{
		gulp.start('browserify');
	}
	gulp.start('vendors');
});

gulp.task('browserify', () => {
	const bundler = watchify(browserify({
		entries : config.entry.scripts
	})).transform(babelify, { /* opts */ })

	bundleJS(bundler, config.output.filename);
});

gulp.task('watchify', () => {
	const filename = config.output.filename

	const bundler = watchify(browserify({
		entries : config.entry.scripts,
		debug: true,
		cache: {}, 
		packageCache: {}, 
		fullPaths: true
	})).transform(babelify, { /* opts */ })

	bundleJS(bundler, filename);

	bundler.on('update', () => {
		console.log(filename + '.js has been updated');
		bundleJS(bundler, filename);
	})
});

gulp.task('vendors', () =>{
	const bundler = browserify({
		entries : config.entry.vendors
	});

	bundleJS(bundler, 'vendors');
});

const bundleJS = (bundler, filename) => {
	return bundler.bundle()
		.on('error', errorHandler)
		.pipe(source('main.js'))
    	.pipe(buffer())
		.pipe(rename(filename + '.js'))
		.pipe(options.debug ? sourcemaps.init({ loadMaps: true}) : util.noop())
		.pipe(uglify())
		.pipe(options.debug ? sourcemaps.write() : util.noop())
		.pipe(gulp.dest(config.output.scripts))
}