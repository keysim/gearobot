var game = new Phaser.Game(1200, 860, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

//var isoGroup, cursorPos, cursor;
var isoGroup, cursorPos, player, water = [], moved = false;
Phaser.Plugin.Isometric.CLASSIC = 0.523599;//Math.atan(0.5);

var botTile = ["botBR", "botBL", "botTR", "botTL"];

BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.load.atlasJSONHash('tileset', 'img/map/tiles.png', 'img/map/tiles.json');

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.82, 0.30);

        botTile.forEach(function (name) {
            game.load.image(name, 'img/bot/'+name+'.png');
        });
        //game.iso.anchor.setTo(0.5, 0.2);


    },
    create: function () {

        /*// Create a group for our tiles.
        isoGroup = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();*/

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        isoGroup = game.add.group();

        // we won't really be using IsoArcade physics, but I've enabled it anyway so the debug bodies can be seen
        isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        var tileArray = [];
        tileArray[0] = 'tree';
        tileArray[1] = 'bush';
        tileArray[2] = 'brick';
        tileArray[3] = 'dirt';
        tileArray[4] = 'grass';
        tileArray[5] = 'water';

        var tiles = [
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


        var size = 74;

        tile = game.add.isoSprite(size * 2, size * 0, 0, 'botBL', null, isoGroup);
        tile.anchor.set(0.5, 1);
        tile.smoothed = false;
        tile.body.moves = false;

        var i = 0, tile;
        for (var y = 0; y <= size * (15 - 1); y += size) { //(game.physics.isoArcade.bounds.frontY - size)
            for (var x = 0; x <= size * (3 - 1); x += size) {//game.physics.isoArcade.bounds.frontX - size
                tile = game.add.isoSprite(x, y, 0, 'tileset', tileArray[tiles[i]], isoGroup);//tileArray[tiles[i]].match("water") ? 0 : game.rnd.pick([2, 3, 4])
                tile.anchor.set(0.5, 1);
                tile.smoothed = false;
                if(tile.body)
                    tile.body.moves = false;
                if (tiles[i] === 0 || tiles[i] === 1) {
                    tile.isoZ = 73;
                }
                if (tiles[i] == 5) {
                    tile.scale.x = game.rnd.pick([-1, 1]);
                }
                if (tiles[i] === 5) {
                    water.push(tile);
                }
                if (tiles[i] === 0 || tiles[i] === 1) {
                    tile = game.add.isoSprite(x, y, -1, 'tileset', tileArray[3], isoGroup);
                    tile.anchor.set(0.5, 1);
                    tile.smoothed = false;
                    tile.body.moves = false;
                }
                i++;
            }
        }

        moved = true;

        this.cursors = game.input.keyboard.createCursorKeys();

        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR
        ]);

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        space.onDown.add(function () {
            console.log("Jump ?");
        }, this);
    },
    update: function () {
        water.forEach(function (w) {
            w.isoZ = (-4 * Math.sin((game.time.now + (w.isoX * 7)) * 0.004)) + (-1 * Math.sin((game.time.now + (w.isoY * 8)) * 0.005)) - 6;
            w.alpha = Phaser.Math.clamp(1 + (w.isoZ * 0.01), 0.2, 1);
        });
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x +147-5, cursorPos.y + 147-5);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x86bfda;
                if(tile.isoZ == 0)
                    game.add.tween(tile).to({ isoZ: 30 }, 200, Phaser.Easing.Quadratic.InOut, true);
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
                if(tile.isoZ >= 0 && tile.isoZ <= 30)
                    game.add.tween(tile).to({ isoZ: 0 }, 300, Phaser.Easing.Quadratic.InOut, true);
            }
        });


        if (this.cursors.up.isDown) {
            console.log("toto");
        }
        if(moved) {
            game.iso.topologicalSort(isoGroup);
            moved = false;
        }
    },
    render: function () {
        /*game.debug.text("Move your mouse around!", 2, 36, "#ffffff");
        game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");*/
        isoGroup.forEach(function (tile) {
            game.debug.body(tile, 'rgba(255, 0, 0, 0)', false);
        });
        //game.debug.text(game.time.fps || '--', 2, 14, "#a7aebe");
         //game.debug.text(Phaser.VERSION, 2, game.world.height - 2, "#ffff00");
    }/*,
    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 256; xx += 38) {
            for (var yy = 0; yy < 256; yy += 38) {
                // Create a tile using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0, 0);
            }
        }
    }*/
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');