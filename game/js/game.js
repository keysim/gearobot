var game = new Phaser.Game(1200, 860, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

var map = new Map();
var bot2 = new Bot(1, 3, "DL", 1);
var bot = new Bot(1, 11, "UR", 2);
var input = new Input();

BasicGame.Boot.prototype =
{
    preload: function () {
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        game.iso.anchor.setTo(0.82, 0.1);

        game.load.atlasJSONHash('tileset', 'img/map/tiles.png', 'img/map/tiles.json');
        game.load.atlasJSONHash("bot", 'img/bot/tiles.png', 'img/bot/tiles.json');
        game.load.atlasJSONHash("bubble", 'img/bubble/tiles.png', 'img/bubble/tiles.json');

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
            game.iso.topologicalSort(isoGroup);
            sort = false;
        }
        bot2.update();
    },
    render: function () {
        map.debug(false);
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');