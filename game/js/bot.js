var toto = null;
class Bot {
    constructor (player) {
        this.rotMap = ["DR", "UL", "DL", "UR"];
        this.sprite = null;
        this.x = -1;
        this.y = -1;
        this.cell = null;
        this.dir = this.rotMap[Math.floor(Math.random() * 4)];
        this.player = player;
        this.bubble = new Bubble(this);
        this.tick = 0;
        this.mp = 3;
        this.ap = 6;
        this.enemy = null;
        this.actions = [];
        this.item = null;
    }
    init () {
        if(this.player == 1)
            this.enemy = bot2;
        else
            this.enemy = bot;
        this.bubble.init();
        this.sprite = game.add.isoSprite(map.cell.size * this.x, map.cell.size * this.y, 0, (this.player === 1) ? "bot" : "bot2", this.dir, isoGroup);
        this.sprite.anchor.set(0.5, 0.4);
        this.sprite.player = this.player;
        this.sprite.smoothed = false;
        this.sprite.body.moves = false;
    }
    update(){
        if(m.tick != this.tick && g.turn == "player" + this.player){
            if(g.started){
                g.started = false;
                var self = this;
                this.updateContext();
                this.play(g[g.turn], function (actions) {
                    console.log(actions);
                    self.actions = actions;
                    if(!actions.length)
                        self.pass();
                });
            }
            if(this.actions.length > 0){
                var action = this.actions.shift();
                this[action]();
                this.actions = [];
                if(!this.actions.length)
                    this.pass();
            }
        }
        this.bubble.update();
        if(m.tick != this.tick)
            this.tick = m.tick;
    }
    updateContext(){
        context.e_dist = map.getPath(this.x, this.y, this.enemy.x, this.enemy.y).length - 2;
        context.s_cell = this.x + this.y * map.w;
        context.e_cell = this.enemy.x + this.enemy.y * map.w;
        context.e_item = this.enemy.item;
        context.e_x = this.enemy.x;
        context.e_y = this.enemy.y;
        // context.i_damage
        // context.i_range
        context.s_ap = this.ap;
        context.m_h = map.h;
        context.s_item = this.item;
        context.s_mp = this.mp;
        context.m_w = map.w;
        context.s_x = this.x;
        context.s_y = this.y;
        //console.log(context);
    }
    play(code, then){
        console.log("COMPILATION PLAYER ", this.player, "...");
        var deepness = [];
        var actions = [];
        var readCode = function (res) {
            var elem = getNextElem(res, code, deepness);
            if (!elem) {
                then(actions);
                return null;
            }
            if(elem.type == "action") {
                actions.push(elem.name);
                return readCode(false);
            }
            else if(elem.type == "statement")
                jexl.eval(elem.cond, context).then(readCode);
        };
        readCode(true);
        return 0;
    }
    pass(){
        if(this.player == 1)
            g.turn = "player2";
        else
            g.turn = "player1";
        this.ap = 6;
        this.mp = 3;
        g.started = true;
    }
    move(x, y) {
        var arrival = map.getBlock(this.x + x, this.y + y, true);
        if (arrival == "empty") {
            this.x += x;
            this.y += y;
            this.sprite.isoPosition.setTo(this.x * map.cell.size, this.y * map.cell.size, 0);
        }
        else if (arrival == "block" || arrival == "out"){
            this.bubble.set("out");
        }
        else if (arrival == "water"){
            this.bubble.set("water");
        }
        else if(arrival == "bot")
            this.bubble.set("out");
    }
    moveToward(){
        var path = map.getPath(this.x, this.y, this.enemy.x, this.enemy.y);
        this.rot(this.getDir(path[1][0] - this.x, path[1][1] - this.y));
        this.move(path[1][0] - this.x, path[1][1] - this.y);
        sort = true;
    }
    moveBackward(){
        var path = map.getPath(this.x, this.y, this.enemy.x, this.enemy.y);
        if(map.getBlock(this.x + 1, this.y) == "empty" && path.length < map.getPath(this.x + 1, this.y, this.enemy.x, this.enemy.y).length) {
            this.rot(this.getDir(1, 0));
            this.move(1, 0);
        }
        else if(map.getBlock(this.x - 1, this.y) == "empty" && path.length < map.getPath(this.x - 1, this.y, this.enemy.x, this.enemy.y).length) {
            this.rot(this.getDir(-1, 0));
            this.move(-1, 0);
        }
        else if(map.getBlock(this.x, this.y + 1) == "empty" && path.length < map.getPath(this.x, this.y + 1, this.enemy.x, this.enemy.y).length) {
            this.rot(this.getDir(0, 1));
            this.move(0, 1);
        }
        else if(map.getBlock(this.x, this.y - 1) == "empty" && path.length < map.getPath(this.x, this.y - 1, this.enemy.x, this.enemy.y).length) {
            this.rot(this.getDir(0, -1));
            this.move(0, -1);
        }
        sort = true;
    }
    stab(){
        console.log("STABED !");
    }
    getDir(x, y){
        if(x == 1)
            return "DR";
        else if(x == -1)
            return "UL";
        else if(y == 1)
            return "DL";
        else if(y == -1)
            return "UR";
    }
    rot(dir){
        this.dir = dir;
        this.sprite.frame = this.rotMap.indexOf(dir);
    }
}

// var code = code1;
// var steps = [];
// var deepness = [];

function getNextElem(res, code, deepness) { // Res is : true or false
    var scope = code;
    for (var i = 0; deepness[i + 1] != undefined; i++)
        if(scope[deepness[i]].type == "statement")
            scope = scope[deepness[i]].code;
    if(deepness.length == 0) { // first time only to fill deepness
        deepness.push(0);
        return scope[0];
    }
    if(res && scope[deepness[deepness.length - 1]].code.length > 0){
        deepness.push(0);
        return scope[deepness[deepness.length - 2]].code[0];
    }
    if(scope[deepness[deepness.length - 1] + 1]) {
        deepness[deepness.length - 1]++;
        return scope[deepness[deepness.length - 1]];
    }
    if(deepness.length > 1) {
        deepness.pop();
        return getNextElem(false, code, deepness);
    }
    return null;
}