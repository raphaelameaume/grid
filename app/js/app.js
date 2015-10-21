import Experiment from './classes/experiment';

export default class App {

	constructor(){
		this.container = document.getElementById('app');

		this.DELTA_TIME = 0;
    	this.LAST_TIME = Date.now();

		this.experiment = new Experiment(this.container);
		this.experiment.attach();

		this.addListeners();
	}

	addListeners(){
		window.addEventListener('resize', this.onResize.bind(this));
   	 	TweenMax.ticker.addEventListener('tick', this.update.bind(this));
	}

	update() {
	    this.DELTA_TIME = Date.now() - this.LAST_TIME;
	    this.LAST_TIME = Date.now();

	    this.experiment.update(this.DELTA_TIME);
	    this.experiment.render();
  	}

	onResize(){
		let w = window.innerWidth;
    	let h = window.innerHeight;

		this.experiment.resize(w, h);
	}
}