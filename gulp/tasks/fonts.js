import gulp from 'gulp';
import changed from 'gulp-changed';
import config from '../config';

gulp.task('fonts', () => {
    return gulp.src(config.watch.fonts)
        .pipe(changed(config.output.fonts))
        .pipe(gulp.dest(config.output.fonts));
});