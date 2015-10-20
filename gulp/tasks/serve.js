import gulp from 'gulp';
import { create as browserSync} from 'browser-sync';

gulp.task('serve', () => {
	browserSync().init({
		server : {
			baseDir: './static',
			index : 'index.html'
		}
	});
});