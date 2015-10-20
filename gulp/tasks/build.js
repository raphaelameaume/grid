import gulp from 'gulp';
import watch  from 'gulp-watch';
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import livereload from 'gulp-livereload';

import options from '../options';
import config from '../config';

gulp.task('build', ['clean', 'stylus', 'static', 'scripts'], () => {
	if (options.watch) {
		livereload.listen();
		//Styles
		watch(config.watch.styles, () =>{
			gulp.start('stylus');
		});
		//Images
		watch(config.watch.images, () =>{
			gulp.start('images');
		});
		//Fonts
		watch(config.watch.fonts, () =>{
			gulp.start('fonts');
		});
		//Index
		watch(config.watch.index, () =>{
			gulp.start('html');
		});
		//Scripts
		gulp.start('scripts');
	}

  	if (options.minify) {
    	gulp.src(config.output.styles + '/' + config.output.filename + '.css')
			.pipe(minifyCss())
			.pipe(gulp.dest(config.output.styles));
  	}

  	gulp.start('serve');
});