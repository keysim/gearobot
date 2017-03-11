var game = new Phaser.Game(1200, 860, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var map = new Map();
var bot = new Bot(1, 3, "BL", 1);
var bot2 = new Bot(1, 11, "TR", 2);
var input = new Input();

BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.load.atlasJSONHash('tileset', 'img/map/tiles.png', 'img/map/tiles.json');

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.82, 0.1);

        botTile.forEach(function (name) {
            game.load.image(name, 'img/bot/'+name+'.png');
        });
    },
    create: function () {
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        isoGroup = game.add.group();

        isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        bot.init();
        bot2.init();
        map.init();

        input.init();
    },
    update: function () {
        map.update();
        input.update();
        if(sort) {
            console.log("Tiles sorted.");
            game.iso.topologicalSort(isoGroup);
            sort = false;
        }
    },
    render: function () {
        map.debug(true);
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');