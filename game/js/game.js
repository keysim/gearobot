var game = new Phaser.Game(1300, 850, Phaser.CANVAS, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

$.ajaxSetup({
    async: false
});

Phaser.Plugin.Isometric.CLASSIC = Math.PI * (30) / 180;//0.523599;//Math.atan(0.5);
var isoGroup, cursorPos;
var sort = true;

var m = {type:"biome", debug:false, plants:15, pos:{x:0.5, y:0.05}, posBot1:{x:0, y:0}, posBot2:{x:0, y:0}};
var menu = new Menu();
var map = null, input = null, bot2 = null, bot = null;
var ide = new Ide();

BasicGame.Boot.prototype =
{
    preload: function () {
        map = new Map(m.type);

        bot = new Bot(1);
        bot2 = new Bot(2);
        input = new Input();

        sort = true;
        game.time.advancedTiming = true;
        game.debug.renderShadow = false;
        game.stage.disableVisibilityChange = true;

        game.plugins.add(new Phaser.Plugin.Isometric(game));

        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        if(m.type == "arena")
            game.iso.anchor.setTo(0.8, 0.1);
        else
            game.iso.anchor.setTo(m.pos.x, m.pos.y);

        game.load.atlasJSONHash('map', 'img/map/tiles.png', 'img/map/tiles.json');
        game.load.atlasJSONHash("bot", 'img/bot/tiles.png', 'img/bot/tiles.json');
        game.load.atlasJSONHash("bot2", 'img/bot/tiles2.png', 'img/bot/tiles2.json');
        game.load.atlasJSONHash("bubble", 'img/bubble/tiles.png', 'img/bubble/tiles.json');
        game.load.image('axes', 'img/map/axes.png');
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
        map.render();
    }
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');