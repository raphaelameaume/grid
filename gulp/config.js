const app = './app';
const staticFolder = './static';

const config = {
	browserSupport : ['last 2 versions', '> 5%'],
	entry : {
		path : app,
		scripts : app + '/js/index.js',
		vendors : app + '/js/vendors.js',
		styles : app + '/css/index.styl'
	},
	watch : {
		styles : app + '/css/**/*.styl',
		scripts : app + '/js/**/*.js',
		images : app + '/assets/images/*',
		fonts : app + '/assets/fonts/*',
		index : app + '/index.html'
	},
	output : {
		path : staticFolder,
		filename : 'build',
		publicPath : staticFolder,
		styles : staticFolder + '/css',
		scripts : staticFolder + '/js',
		images : staticFolder + '/assets/images/',
		fonts : staticFolder + '/assets/fonts/',
		index : staticFolder + '/'
	}
};

export default config;