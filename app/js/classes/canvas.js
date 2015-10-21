import Dot from './dot';
import drawArc from '../utils/drawArc';

export default class Canvas {

	constructor(){
		this.ctx = this.getContext(this.w, this.h);
		this.el = this.ctx.canvas;

		this.createDots();
	}

	createDots(){
		this.dotsNumber = 85;
		this.dots = [];
		this.drawnDots = [];

		var x = 40;
		var y = 40;

        for( var i = 1; i < this.dotsNumber; i++ ){
            var d = new Dot(x, y);
            this.dots.push(d);

            if(i % 14 == 0){
	    		y += 40; 
	    		x = 0;
	    	}
	    	x += 40;
        }

        this.animateDots();
	}

	animateDots(){
		var coeff = 1;

		for( var i = 0; i < this.dotsNumber - 1; i++ ){
			var d = this.dots[i];
            
	    	TweenLite.to(d, 2, { x : d.x + coeff*40, ease : Power3.easeOut });

	    	if(i % 7 == 0){
	    		coeff = - coeff;
	    	}
        }
	}

	attach(container){
		container.appendChild(this.el);
	}

	getContext(w, h){
		var canvas = document.createElement( "canvas" );
	    canvas.width = window.innerWidth;
	    canvas.height = window.innerHeight;
	    canvas.classList.add('canvas');
	    return canvas.getContext("2d");
	}

	update(deltaTime){
		if(this.drawnDots.length < this.dotsNumber){
			this.ctx.clearRect(0,0, this.el.width, this.el.height);
			var rdm = Math.floor(Math.random() * this.dots.length);
			this.drawnDots.push(this.dots[rdm]);

			for (var i = 0; i < this.drawnDots.length - 1; i++) {
				drawArc(this.ctx, this.drawnDots[i].x, this.drawnDots[i].y, 4, 'white');
			}
			this.dots.splice(rdm, 1);
		}
	}

	resize(){
		this.el.width = window.innerWidth;
		this.el.height = window.innerHeight;
	}


}