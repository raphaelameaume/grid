import Canvas from './canvas';

export default class Experiment {

	constructor(){
		this.container = document.getElementById('app');

		this.DELTA_TIME = 0;
    	this.LAST_TIME = Date.now();

		this.canvas = new Canvas(this.container);
		this.canvas.attach(this.container);

		this.addListeners();
	}

	addListeners(){
		window.addEventListener('resize', this.onResize.bind(this));
   	 	TweenMax.ticker.addEventListener('tick', this.update.bind(this));
	}

	update() {
	    this.DELTA_TIME = Date.now() - this.LAST_TIME;
	    this.LAST_TIME = Date.now();

	    this.canvas.update(this.DELTA_TIME);
  	}

	onResize(){
		this.canvas.resize();
	}
}