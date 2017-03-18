class Map {
    constructor() {
        this.lastDebugState = false;
        this.tiles = [];
        this.w = 10;
        this.h = 10;
        this.tex = ['tree', 'bush', 'brick', 'dirt', 'grass', 'water'];
        //this.walkable = ['brick', 'dirt', 'grass'];
        this.water = [];
        var x = 0;
        var y = 0;
        var i = 0;
        if(params.mapType == "small") {
            /*this.tiles = [
                2, 2, 2,
                2, 0, 2,
                2, 2, 2,
                4, 2, 4,
                4, 4, 4,
                4, 5, 4,
                3, 5, 3,
                3, 1, 3,
                3, 5, 3,
                4, 5, 4,
                4, 4, 4,
                4, 2, 4,
                2, 2, 2,
                2, 0, 2,
                2, 2, 2
            ];
            this.w = 3;
            this.h = 15;*/
            this.tiles = [
                9, 9, 9, 9, 9, 5,
                9, 9, 9, 9, 4, 9,
                9, 9, 9, 3, 9, 9,
                9, 9, 2, 9, 9, 9,
                9, 1, 9, 9, 9, 9,
                0, 9, 9, 9, 9, 9
            ];
            this.w = 6;
            this.h = 6;
        }
        else if(params.mapType == "random") {
            for (y = 0; y < blockSize * this.h; y += blockSize) {
                for (x = 0; x < blockSize * this.w; x += blockSize) {
                    var r = Math.floor(Math.random() * 10);
                    if (r > 1)
                        this.tiles.push(Math.floor((Math.random() * (this.tex.length - 3)) + 2));
                    else if (r == 0)
                        this.tiles.push(Math.floor((Math.random() * 2)));
                    else
                        this.tiles.push(5);
                }
            }
        }
        else {
            var biome = [];
            var biomeInfo = [];
            for(i = 0; i < 4; i++){
                biomeInfo.push({});
                biomeInfo[i].type = i + 2;
                biomeInfo[i].x = Math.floor((Math.random() * this.w));
                biomeInfo[i].y = Math.floor((Math.random() * this.h));
            }
            for (y = 0; y < 10; y++) {
                for (x = 0; x < 10; x++) {
                    var nearest = '.';
                    var  dist = 99999999;
                    for (var z = 0; z < biomeInfo.length; z++) {
                        var xdiff = biomeInfo[z].x - x;
                        var ydiff = biomeInfo[z].y - y;
                        var cdist = xdiff*xdiff + ydiff*ydiff;
                        if (cdist < dist) {
                            nearest = biomeInfo[z].type;
                            dist = cdist;
                        }
                    }
                    biome.push(nearest);
                }
            }
            for (i = 0; i < 6; i++) {
                x = Math.floor((Math.random() * this.w));
                y = Math.floor((Math.random() * this.h));
                if (biome[x + (y * 10)] != 5 && biome[x + (y * 10)] > 2) {
                    trees.push({was: biome[x + (y * 10)], pos: x + (y * 10)});
                    biome[x + (y * 10)] = 0;
                }
                else
                    i--;
            }
            for (i = 0; i < 4; i++) {
                x = Math.floor((Math.random() * this.w));
                y = Math.floor((Math.random() * this.h));
                if (biome[x + (y * 10)] != 5 && biome[x + (y * 10)] > 2) {
                    trees.push({was: biome[x + (y * 10)], pos: x + (y * 10)});
                    biome[x + (y * 10)] = 1;
                }
                else
                    i--;
            }
            this.tiles = biome;
        }
        this.grid = new PF.Grid(this.w, this.h);
        for (i = 0; i < this.h * this.w; i++) {
            this.grid.setWalkableAt(i % this.w, Math.floor(i / this.w), (this.tiles[i] >= 2 && this.tiles[i] <= 4));
        }
        this.finder = new PF.AStarFinder();
    }
    init() {
        var i = 0, tile;
        for (var y = 0; y <= blockSize * (this.h - 1); y += blockSize) {
            for (var x = 0; x <= blockSize * (this.w - 1); x += blockSize) {
                if(this.tex[this.tiles[i]] == undefined) {
                    i++;
                    continue;
                }
                tile = game.add.isoSprite(x, y, 0, 'tileset', this.tex[this.tiles[i]], isoGroup);
                tile.static = true;
                tile.anchor.set(0.5, 0.05);
                tile.smoothed = false;
                this.path.forEach(function (cell) {
                    if(cell[0] == i % map.w && cell[1] == Math.floor(i / map.w))
                        tile.tint = 0x555555;
                });
                if(tile.body)
                    tile.body.moves = false;
                if (this.tiles[i] === 0) {// Tree
                    tile.anchor.set(0.5, 0.699);//0.5, 0.66);
                }
                else if(this.tiles[i] === 1)// Bush
                    tile.anchor.set(0.5, 0.14);//0.5, 0.03);
                else if (this.tiles[i] === 5) {
                    //tile.scale.x = game.rnd.pick([-1, 1]);
                    this.water.push(tile);
                }
                else
                    tile.static = false;
                if (this.tiles[i] === 0 || this.tiles[i] === 1) {
                    tile = game.add.isoSprite(x, y, 0, 'tileset', this.tex[getWas(i)], isoGroup);
                    tile.static = true;
                    tile.anchor.set(0.5, 0.05);
                    tile.smoothed = false;
                    tile.body.moves = false;
                }
                i++;
            }
        }
    }
    update() {
        this.water.forEach(function (w) {
            w.isoZ = (-4 * Math.sin((game.time.now + (w.isoX * 8)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005))-2;
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.03), 0.2, 1);
        });
        /*game.iso.unproject(game.input.activePointer.position, cursorPos);
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            if (!tile.selected && inBounds) {
                tile.selected = true;
                if(!tile.player)
                    tile.tint = 0x86bfda;
                if(!tile.static)
                    game.add.tween(tile).to({ isoZ: 30 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                if(!tile.player)
                    tile.tint = 0xffffff;
                if(!tile.static)
                    game.add.tween(tile).to({ isoZ: 0 }, 300, Phaser.Easing.Quadratic.InOut, true);
            }
        });*/
    }
    getBlock(x, y){
        var blockType = this.tiles[x + y * this.w];
        if (x < 0 || x >= this.w || y < 0 || y >= this.h)
            return "out";
        else if(this.tex[blockType] == "tree" || this.tex[blockType] == "bush")
            return "block";
        else if(this.tex[blockType] == "water")
            return "water";
        return "empty"; // this.walkable.indexOf(this.tex[blockType]) >= 0 : true
    }
    render() {
        if(params.debug) {
            isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(150, 150, 150, 0.7)', false);
            });
            game.debug.text("FPS = " + game.time.fps || '--', 2, 14, "#a7aebe");
            game.debug.text("V : " + 0.1, 2, game.world.height - 2, "#ffff00");
            this.lastDebugState = true;
        }
        else{
            if(this.lastDebugState) {
                isoGroup.forEach(function (tile) {
                    game.debug.body(tile, 'rgba(150, 150, 150, 0)', false);
                });
                this.lastDebugState = false;
            }
            game.debug.text("FPS = " + game.time.fps || '--', 2, 14, "#a7aebe");
        }
    }
    getPath(from, to){ // cell ID
        this.path = this.finder.findPath(from % this.w, Math.floor(from / this.w), to % this.w, Math.floor(to / this.w), this.grid);
    }
}

function getWas(pos) {
    for (var i = 0; i < trees.length; i++) {
        if(trees[i].pos == pos)
            return trees[i].was;
    }
    return 3;
}