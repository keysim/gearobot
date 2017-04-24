var jexl = require('Jexl');
var game = new Phaser.Game(1300, 850, Phaser.CANVAS, 'game', null, true, false);

var BasicGame = function (game) { };

BasicGame.Boot = function (game) { };

$.ajaxSetup({
    async: false
});

Phaser.Plugin.Isometric.CLASSIC = Math.PI * (30) / 180;//0.523599;//Math.atan(0.5);
var isoGroup, cursorPos;
var sort = true;

var m = {tick:0, type:"biome", debug:false, plants:15, pos:{x:0.5, y:0.05}, posBot1:{x:0, y:0}, posBot2:{x:0, y:0}, time:10};
var g = {started:false, turn:"player1", time:0, player1:[], player2:[]};
var menu = new Menu();
var map = null, input = null, bot2 = null, bot = null;
var ide = new Ide();
setInterval(function () {
    m.tick++;
}, 800);

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
context = {};
function testFor() {
    var tab = ["hey", "lol", "ok"];
    for(var i = 0; tab[i]; i++){
        jexl.eval("0 == 0", context).then(function(res) {
            console.log(res);
            return "ok";
        }).then(function (res) {
            console.log(res);
        });
        console.log(i);
    }
}
var code = [
    {
        type:"statement",
        cond: "1 < 2",
        code: [
            {
                type:"statement",
                cond: "1 < 2",
                code:[
                    {
                        type:"statement",
                        cond: "1 < 2",
                        code:[
                            {
                                type: "action",
                                name: "PENIS"
                            }]
                    },
                    {
                        type: "action",
                        name: "move"
                    }]
            },
            {
                type: "action",
                name: "stab_neck"
            }
        ]
    },
    {
        type:"statement",
        cond: "1 > 2",
        code: [
            {
                type: "action",
                name: "move_back"
            }
        ]
    },
    {
        type:"action",
        name: "stab"
    }
];

var profondeur = [0];
cb(42);

function cb(res) {
    var scope = code;
    if(!res) {// || !scope[profondeur[profondeur.length - 1] + 1]
        if(profondeur.length > 0) {
            //console.log("Statement false => GOING BACK");
            profondeur.pop();
        }
        profondeur[profondeur.length - 1]++;
    }
    // else
    //     console.log("Statement true => KEEP GOING");
    var pos = profondeur[profondeur.length - 1];
    for(var i = 0; profondeur[i + 1] != undefined; i++) {
        if(scope[profondeur[i]].type == "statement") {
            scope = scope[profondeur[i]].code;
        }
    }
    //console.log("pos : ", pos, ", scope : ", scope);
    if(scope[pos].type == "action") {
        //console.log("FOUND ACTION : ", scope[pos].name);
        return "FOUND";
    }
    if(scope[pos].type == "statement") {
        //console.log("GOING DEEPER on statement : ", scope[pos].cond);
        profondeur.push(0);
        jexl.eval(scope[pos].cond, context).then(cb);
    }
}

//testIt();
//testFor();