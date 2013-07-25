var TilesetManager =
(function()
{
	var exports = {};

	var tilesets = {}; /* string keys point to tilesets */
	
	var LoadTileset = function(filepath, name, tile_width, tile_height)
	{
		tilesets[name] = {};
		
		tilesets[name].image = new Image();
		tilesets[name].image.onload = function() { processTileset(name, tile_width, tile_height); };
		tilesets[name].image.src = filepath;
	};
	
	var processTileset = function(name, tile_width, tile_height)
	{
		/* allocate a workspace canvas */
		var workspace = document.createElement("canvas");
		workspace.width = tile_width;
		workspace.height = tile_height;

		var workspace_ctx = workspace.getContext("2d");
		console.log(tilesets[name].image.width);

		/* if tileset isn't dividable by the width and height, bail */
		if (((tilesets[name].image.width % tile_width) != 0) || ((tilesets[name].image.height % tile_height) != 0))
		{
			console.log("Invalid tile height or width.");
			return;
		}

		/* start splitting the tileset */
		var tile_count_x = (tilesets[name].image.width / tile_width);
		var tile_count_y = (tilesets[name].image.height / tile_height);
		
		tilesets[name].tiles = [];
		
		for (var tile_y = 0; tile_y < tile_count_y; tile_y++)
			for (var tile_x = 0; tile_x < tile_count_x; tile_x++)
			{
				var tile = new Image();
				
				workspace_ctx.drawImage(tilesets[name].image, (tile_x * tile_width), (tile_y * tile_height), tile_width, tile_height, 0, 0, 16, 16);				
				
				tile.src = workspace.toDataURL("image/png");
				
				tilesets[name].tiles[(tile_y*tile_count_y) + tile_x] = tile;
				
				console.log("ping");
			}
		
		//tilesets[name].image
	}
	
	exports.LoadTileset = LoadTileset;
	exports.Tilesets = tilesets;
	return exports;
})()