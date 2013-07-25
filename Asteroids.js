function Asteroid()
{
	var asteroid = {};
	var cnv = document.createElement("canvas");
	var ctx = cnv.getContext("2d");
	
	cnv.width = 100;
	cnv.height = 100;
	
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,100,100);
	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#ffffff";
	
	ctx.beginPath();

	asteroid.points = [];
	
	for (var i = 0; i < 8; i++)
	{
		var magnitude = (40 - (Math.random()*20));
		var x = (Math.cos((Math.PI/4)*i) * magnitude);
		var y = (Math.sin((Math.PI/4)*i) * magnitude);

		if (i == 0)
		{
			ctx.moveTo(x+50,y+50);
		}
		else
		{
			ctx.lineTo(x+50,y+50);
		}

		asteroid.points[i] = {};
		asteroid.points[i].x = x;
		asteroid.points[i].y = y;
		asteroid.points[i].r = magnitude;		
	}
	
	ctx.closePath();
	
	ctx.stroke();
	
	var render = new Image();
	render.src = cnv.toDataURL("image/png");

	/* asteroid exports */
	asteroid.image = render;

	function isPointInTriangle(px,py,ax,ay,bx,by,cx,cy)
	{
		var coordinate_1 = ((by - cy)*(px - cx) + (cx - bx)*(py - cy)) / ((by - cy)*(ax - cx) + (cx - bx)*(ay - cy));
		var coordinate_2 = ((cy - ay)*(px - cx) + (ax - cx)*(py - cy)) / ((by - cy)*(ax - cx) + (cx - bx)*(ay - cy));
		var coordinate_3 = 1 - coordinate_1 - coordinate_2;	
		
		console.log(coordinate_1);
		console.log(coordinate_2);
		console.log(coordinate_3);
		
		if ((coordinate_1 < 0.0) || (coordinate_1 > 1.0))
			return false;
		if ((coordinate_2 < 0.0) || (coordinate_2 > 1.0))
			return false;
		if ((coordinate_3 < 0.0) || (coordinate_3 > 1.0))
			return false;
			
		return true;
	}

	function containsPoint(x, y)
	{
		var delta_x = (x - 50);
		var delta_y = (50 - y);
		
		var angle = Math.atan2(delta_y, delta_x);
		
		if (delta_y < 0) { angle = Math.PI + (Math.PI + angle); }

		/* adjust and make rotation clockwise and not shortest distance */
		var segment = Math.floor(angle / (Math.PI/4))		
		

		var point1 = asteroid.points[segment];
		var point2 = asteroid.points[(segment + 1) % 7];

		console.log(point1);
		console.log(point2);

		return isPointInTriangle(x,y,50,50,50+point1.x,50+point1.y,50+point2.x,50+point2.y);
	}
	
	window.open(render.src);
	
	asteroid.ContainsPoint = containsPoint;
	return asteroid;
}
