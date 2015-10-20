import gulp from 'gulp';
import util from 'gulp-util';
import htmlreplace from 'gulp-html-replace';
import changed from 'gulp-changed';
import config from '../config';
import options from '../options';

gulp.task('html', function () {

    return gulp.src(config.watch.index)
        .pipe(changed(config.output.index))
        .pipe(options.minify ? htmlreplace({
			'js': '/js/build.js',
		}) : util.noop())
        .pipe(gulp.dest(config.output.index));
});