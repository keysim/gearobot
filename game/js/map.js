class Map {
    constructor() {
        this.tex = ['tree', 'bush', 'brick', 'dirt', 'grass', 'water'];
        this.walkable = ['brick', 'dirt', 'grass'];
        this.water = [];
        this.tiles = [
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
        this.h = 15;
    }
    init() {
        var i = 0, tile;
        for (var y = 0; y <= blockSize * (this.h - 1); y += blockSize) {
            for (var x = 0; x <= blockSize * (this.w - 1); x += blockSize) {
                tile = game.add.isoSprite(x, y, 0, 'tileset', this.tex[this.tiles[i]], isoGroup);
                tile.anchor.set(0.5, 0);
                tile.smoothed = false;
                if(tile.body)
                    tile.body.moves = false;
                if (this.tiles[i] === 0)// Tree
                    tile.anchor.set(0.5, 0.66);
                else if(this.tiles[i] === 1)// Bush
                    tile.anchor.set(0.5, 0.03);
                if (this.tiles[i] == 5) {
                    tile.scale.x = game.rnd.pick([-1, 1]);
                    tile.static = true;
                }
                if (this.tiles[i] === 5) {
                    this.water.push(tile);
                }
                if (this.tiles[i] === 0 || this.tiles[i] === 1) {
                    tile.static = true;
                    tile = game.add.isoSprite(x, y, -1, 'tileset', this.tex[3], isoGroup);
                    tile.static = true;
                    tile.anchor.set(0.5, 0);
                    tile.smoothed = false;
                    tile.body.moves = false;
                }
                i++;
            }
        }
    }
    update() {
        this.water.forEach(function (w) {
            w.isoZ = (-4 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005)) - 6;
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.01), 0.2, 1);
        });
        game.iso.unproject(game.input.activePointer.position, cursorPos);
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
        });
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
    debug(active) {
        if(active) {
            isoGroup.forEach(function (tile) {
                game.debug.body(tile, 'rgba(150, 150, 150, 0.7)', false);
            });
            game.debug.text("FPS = " + game.time.fps || '--', 2, 14, "#a7aebe");
            game.debug.text("V : " + 0.1, 2, game.world.height - 2, "#ffff00");
        }
    }
}