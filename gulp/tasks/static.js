import gulp from 'gulp';

gulp.task('static', () => {
	gulp.start('images');
	gulp.start('fonts');
	gulp.start('html');
});