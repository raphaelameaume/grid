export default class Scene {

	constructor(_width, _height){
	    this.width = _width;
	    this.height = _height;

	    this.children = [];

	    this.stage = new PIXI.Container();
	    this.renderer = new PIXI.WebGLRenderer(this.width, this.height, { antialias : true });
 	}

 	addChild(child){
	    if ( child instanceof PIXI.DisplayObject === false ) {
	      	throw new Error("child has to be an instance of PIXI.DisplayObject");
	    }
	    
	    this.stage.addChild(child);
  	}

  	removeChild(child){
    	this.stage.removeChild(child);
  	}

  	render(){
    	this.renderer.render(this.stage);
  	}

  	resize(_width, _height){
	    this.width = _width;
	    this.height = _height;

	    this.renderer.view.style.width = this.width + 'px';
	    this.renderer.view.style.height = this.height + 'px';
  	}

}