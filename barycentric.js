function ctob(p,a,b,c)
{
	var coordinate_1 = ((b.y - c.y)*(p.x - c.x) + (c.x - b.x)*(p.y - c.y)) / ((b.y - c.y)*(a.x - c.x) + (c.x - b.x)*(a.y - c.y));
	var coordinate_2 = ((c.y - a.y)*(p.x - c.x) + (a.x - c.x)*(p.y - c.y)) / ((b.y - c.y)*(a.x - c.x) + (c.x - b.x)*(a.y - c.y));
	var coordinate_3 = 1 - coordinate_1 - coordinate_2;
	
	var coordinates = {};
	coordinates.a = coordinate_1;
	coordinates.b = coordinate_2;
	coordinates.c = coordinate_3;
	
	return coordinates;
}