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

        for( var i = 1; i < 85; i++ ){
            var d = new Dot(x, y);
            dots.push(d);

            if(i % 14 == 0){
            	console.log('modulo');
            	console.log(i);
        		y += 40; 
        		x = 0;
        	}
        	x += 40;
        }

        this.dots = dots;
        this.draw();
	}	

	draw(){
		var ctx = this.ctx;
		var i = 0;
		var dots = this.dots;
		var length = dots.length;

		function raf(){
			requestAnimationFrame(raf);

			if(i < length){
				drawArc(ctx, dots[i].x, dots[i].y, 4, 'white');
			}
			
			i++;
		}

		raf();
	}
}