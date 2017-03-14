var game = new Phaser.Game(1300, 860, Phaser.AUTO, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

Phaser.Plugin.Isometric.CLASSIC = Math.PI * (30) / 180;//0.523599;//Math.atan(0.5);
var isoGroup, cursorPos;
var sort = true;
var blockSize = 74;

var menu = null;
var map = null;
var bot2 = null;
var bot = null;
var input = null;

BasicGame.Boot.prototype =
{
    preload: function () {
        console.log("PENIS");
        sort = true;
        menu = new Menu();
        map = new Map();
        bot2 = new Bot(1);
        bot = new Bot(2);
        input = new Input();
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);

        game.iso.anchor.setTo(0.5, 0.05);//0.82, 0.1

        game.load.atlasJSONHash('tileset', 'img/map/tiles.png', 'img/map/tiles.json');
        game.load.atlasJSONHash("bot", 'img/bot/tiles.png', 'img/bot/tiles.json');
        game.load.atlasJSONHash("bot2", 'img/bot/tiles2.png', 'img/bot/tiles2.json');
        game.load.atlasJSONHash("bubble", 'img/bubble/tiles.png', 'img/bubble/tiles.json');

    },
    create: function () {
        cursorPos = new Phaser.Plugin.Isometric.Point3();

        isoGroup = game.add.group();

        isoGroup.enableBody = true;
        isoGroup.physicsBodyType = Phaser.Plugin.Isometric.ISOARCADE;

        map.init();
        bot.init();
        bot2.init();
        input.init();
        menu.init();
    },
    update: function () {
        map.update();
        input.update();
        if(sort) {
            game.iso.topologicalSort(isoGroup, 4);
            sort = false;
        }
        bot.update();
        bot2.update();
    },
    render: function () {
        map.debug(false);
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');