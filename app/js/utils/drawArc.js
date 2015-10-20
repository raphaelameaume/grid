const drawArc = (ctx, x, y, radius, color) => {
	//commence un ensemble d'instructions de dessin
    ctx.beginPath();
    //instruction de dessin d'un arc
    ctx.arc( x, y, radius, 0,Math.PI*2 );
    //ferme la forme
    ctx.closePath();
    //dessine
    ctx.fillStyle = color;
    ctx.fill();
};

export default drawArc;