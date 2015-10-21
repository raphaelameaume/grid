export default class Particle extends PIXI.Graphics {

	constructor(_x, _y, index){
		super();

		var coeff = -1;

		if(index % 7 == 0){
			coeff = -coeff;
		}


		this.shifts = [50, 100, 150];


		this.position.x = _x + coeff*this.shifts[Math.floor(Math.random()*this.shifts.length)];
		this.position.y = _y;
		this.initialPosition = {
			x : _x,
			y : _y
		};
		this.visible = false;
		this.lastMove = null;

	    this.vx = Math.random();
	    this.vy = Math.random();

	    this.beginFill( 0xffffff );
	    this.drawCircle( 0, 0, 3 );
	    this.endFill();
	}

	show(){
		this.visible = true;
		TweenLite.to(this.position, 2, { x: this.initialPosition.x, y: this.initialPosition.y, ease: Power4.easeOut});
	}

	update() {
	    // this.position.x += this.vx;
	    // this.position.y += this.vy;
  	}

  	distanceTo(point){
  		return Math.sqrt(this.distanceToSq(point));
  	}

  	distanceToSq(v) {
    	var dx = this.position.x - v.x, dy = this.position.y - v.y;
    	return dx * dx + dy * dy;
	}

	tryToGoHome(now){
		if(this.lastMove && (now - this.lastMove > 200)){
			TweenMax.to(this.position, 2, { x: this.initialPosition.x, y: this.initialPosition.y, ease: Power4.easeOut});
		}
	}



}