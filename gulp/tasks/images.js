import gulp from 'gulp';
import changed from 'gulp-changed';
import config from '../config';

gulp.task('images', () => {
    return gulp.src(config.watch.images)
        .pipe(changed(config.output.images))
        .pipe(gulp.dest(config.output.images));
});