import Dot from './dot';
import drawArc from '../utils/drawArc';

export default class Experiment {

	constructor(){
		this.w = window.innerWidth;
		this.h = window.innerHeight;

		this.ctx = this.getContext(this.w, this.h);
		this.canvas = this.ctx.canvas;
		document.body.appendChild(this.canvas);

		this.createDots();
	}

	getContext(w, h){
		var canvas = document.createElement( "canvas" );
	    canvas.width = this.w;
	    canvas.height = this.h;
	    canvas.classList.add('canvas');
	    return canvas.getContext("2d");
	}

	createDots(){
		var w = this.w;
		var h = this.h;
		var dots = [];

		var x = 40;
		var y = 40;
		var coeff = 1;

        for( var i = 1; i < 85; i++ ){
            var d = new Dot(x, y);
            dots.push(d);

            if(i % 14 == 0){
        		y += 40; 
        		x = 0;
        	}
        	x += 40;

        	TweenLite.to(d, 2, { x : d.x + coeff*40, ease : Power3.easeOut });

        	if(i % 7 == 0){
        		coeff = - coeff;
        	}
        }

        this.dots = dots;
        this.draw();
	}	

	draw(){
		var ctx = this.ctx;
		var w = this.w;
		var h = this.h;
		var i = 0;
		var dots = this.dots;
		var drawnDots = [];
		var length = dots.length;
		var rdm = 0;

		function raf(){
			requestAnimationFrame(raf);

			if(drawnDots.length < length){
				ctx.clearRect(0,0, w, h);
				rdm = Math.floor(Math.random() * dots.length);
				drawnDots.push(dots[rdm]);

				for (var i = drawnDots.length - 1; i >= 0; i--) {
					drawArc(ctx, drawnDots[i].x, drawnDots[i].y, 4, 'white');
				}
				dots.splice(rdm, 1);
			}
			

			
			
		}

		raf();
	}
}