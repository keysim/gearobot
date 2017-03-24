class Map {
    constructor(type) {
        this.grid = [];
        this.cell = {size:74};
        this.tex = ['tree', 'bush', 'brick', 'soil', 'grass', 'water'];
        this.texPos = [0.699, 0.14, 0.05, 0.05, 0.05, 0.05];
        this.finder = new PF.AStarFinder();
        this.lastDebugState = false;
        this.water = [];
        this.loader = new MapLoader(type);
    }
    init() {
        this.setAxe();
        this.loader.load();
        this.pfGrid = new PF.Grid(this.loader.getBinary());
        this.it(this.setTile);
        this.placeBots([bot, bot2]);
    }
    setAxe(){
        var tile = game.add.isoSprite(-this.cell.size, -this.cell.size, 0, 'axes', 0, isoGroup);
        tile.smoothed = false;
        tile.body.moves = false;
        tile.anchor.set(0.5, 0.2);
    }
    setTile(x, y){
        if(map.grid[y][x].tex == null)
            return;
        map.grid[y][x].tile = map.createTile(x,y);
        if (map.grid[y][x].tex == "water")
            map.water.push(map.grid[y][x].tile);
        if (map.grid[y][x].tex == "tree" || map.grid[y][x].tex == "bush")
            map.grid[y][x].underTile = map.createTile(x,y, true);
    }
    update() {
        this.water.forEach(function (w) {
            w.isoZ = (-4 * Math.sin((game.time.now + (w.isoX * 8)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005))-2;
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.03), 0.2, 1);
        });
    }
    placeBots(bots){
        for (var i = 0; bots[i]; i++){
            while (map.getBlock(bots[i].x, bots[i].y) != "empty"){
                bots[i].x = Math.floor((Math.random() * map.w));
                bots[i].y = Math.floor((Math.random() * map.h));
                for (var z = 0; bots[z]; z++){
                    if(bots[z].cell == bots[i].x + bots[i].y * map.w) // if someone else in this cell, restart placement
                        bots[i].y = -1;
                }
                if(bots[i].y == -1)
                    console.log("WRONG POS : RESTART PLACEMENT");
                bots[i].cell = bots[i].x + bots[i].y * map.w;
            }
        }
    }
    getBlock(x, y){ // OR give just the cell on X
        if(y == undefined){
            var cell = x;
            x = cell % map.w;
            y = Math.floor(cell / map.w);
        }
        if (x < 0 || x >= this.w || y < 0 || y >= this.h)
            return "out";
        var blockType = this.grid[y][x].tex;
        if(blockType == "tree" || blockType == "bush")
            return "block";
        else if(blockType == "water")
            return "water";
        return "empty";
    }
    render() {
        if(m.debug) {
            isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(150, 150, 150, 0.7)', false);
            });
            game.debug.text("FPS = " + game.time.fps || '--', game.world.width - 80, 14, "#a7aebe");
            game.debug.text("V : " + 0.1, game.world.width - 80, game.world.height - 2, "#ffff00");
            this.lastDebugState = true;
        }
        else{
            if(this.lastDebugState) {
                isoGroup.forEach(function (tile) {
                    game.debug.body(tile, 'rgba(150, 150, 150, 0)', false);
                });
                this.lastDebugState = false;
            }
            game.debug.text("FPS = " + game.time.fps || '--', game.world.width - 80, 14, "#a7aebe");
        }
    }
    createTile(x, y, under) {
        var tile = game.add.isoSprite(x * map.cell.size, y * map.cell.size, 0, 'map', under ? map.tex[map.grid[y][x].under] : map.grid[y][x].tex, isoGroup);
        tile.smoothed = false;
        tile.body.moves = false;
        tile.anchor.set(0.5, under ? map.texPos[map.grid[y][x].under] : map.texPos[map.grid[y][x].id]);
        return tile;
    }
    getPath(x1, y1, x2, y2){ // cell ID : from % map.w, Math.floor(from / map.w), to % map.w, Math.floor(to / map.w)
        return map.finder.findPath(x1, y1, x2, y2, map.pfGrid);
    }
    it(callback){
        for (var y = 0; y < this.h; y++)
            for (var x = 0; x < this.w; x++)
                callback(x, y);
    }
}