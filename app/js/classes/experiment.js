import Scene from './scene';
import Particle from './particle';

export default class Experiment {

	constructor(_container){
		this.container = _container;

	    let w = window.innerWidth;
	    let h = window.innerHeight;
	    this.scene = new Scene( w, h );

	    this.nbParticles = 85;
	    this.particles = [];
	    this.drawnParticles = [];

	    let spaceBetween = 50;
	    let x = w/2 - (spaceBetween*7);
		let y = h/2 - (spaceBetween*3);

	    for (var i = 1; i < this.nbParticles; i++) {
	    	this.particle = new Particle(x, y, i);
   			this.scene.addChild(this.particle);
   			this.particles.push(this.particle);

   			if(i % 14 == 0){
	    		y += spaceBetween; 
	    		x = w/2 - (spaceBetween*7) - spaceBetween;
	    	}
	    	x += spaceBetween;
	    };
	    
	}

	attach() {		
    	this.container.appendChild(this.scene.renderer.view);
  	}

	update(DELTA_TIME) {
		if(this.drawnParticles.length < this.nbParticles - 1){
			var rdmIndex = Math.floor(Math.random()*this.particles.length);
			var particle = this.particles[rdmIndex];
			this.drawnParticles.push(particle);

			for (var i = 0; i < this.drawnParticles.length; i++) {
				if(!this.drawnParticles[i].visible){
					this.drawnParticles[i].show();
				}
			};

			this.particles.splice(rdmIndex, 1);
		}

		console.log(this.scene.renderer.plugins.interaction.mouse.global);
  	}

  	render(){
  		this.scene.render();
  	}

	resize(_width, _height) {
    	this.scene.resize( _width, _height);
  	}
}