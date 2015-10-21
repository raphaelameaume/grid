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
	    this.lastMousePos = null;
	    this.time = 0;
	    this.goingHome = false;

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
		}else {
			this.checkParticleMovement();
		}
  	}

  	checkParticleMovement(){
  		let scope = this;
  		let mousePosition = this.scene.renderer.plugins.interaction.mouse.global;

  		if(mousePosition == this.lastMousePos){
  			this.time++

  			if(this.time > 200){
  				this.time = 0;
  				this.goingHome = true;

  				TweenMax.staggerTo(this.drawnParticles, 0.5, {
  					cycle : {
  						x : function(i){
  							return scope.drawnParticles[i].initialPosition.x
  						},
  						y : function(i){
  							return scope.drawnParticles[i].initialPosition.y
  						},
  						ease : Power4.easeOut
  					},
  					onComplete : () =>{
  						scope.goingHome = false;
  					}
  				}, 0.01)
  			}
  		}
  		if(!this.goingHome){
  			for (var i = 0; i < this.drawnParticles.length; i++) {
	  			var particle = this.drawnParticles[i];
	  			var distance = particle.distanceTo(mousePosition)
	  			if( distance < 70){
	  				TweenLite.to(particle.position, 2, { 
	  					x: particle.position.x - (mousePosition.x - particle.position.x),
	  					y: particle.position.y - (mousePosition.y - particle.position.y),
	  					ease: Power4.easeOut
	  				});
	  			}
  			}
  		}

  		this.lastMousePos = mousePosition;
  	}

  	render(){
  		this.scene.render();
  	}

	resize(_width, _height) {
    	this.scene.resize( _width, _height);
  	}
}