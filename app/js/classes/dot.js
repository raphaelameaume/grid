export default class Dot {

	constructor(x = 0, y = 0){
		this.x = x;
		this.y = y;
	}

	angle(element){
		var dx = element.x - this.x;
        var dy = element.y - this.y;
        return Math.atan2( dy, dx );
	}

	distance(element){
        var dx = element.x - this.x;
        var dy = element.y - this.y;
        return Math.sqrt( dx*dx + dy*dy );
    }

}