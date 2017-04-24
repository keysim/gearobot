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
        if(m.tick != this.tick && g.turn == "player" + this.player && g.started){
            console.log("CODE STARTED", g[g.turn]);
            if(g[g.turn].length == 0)
                this.pass();
            else
                this.play(g[g.turn]);
            // if(!value) {
            //     console.log("Nothing to do !");
            //     this.pass();
            // }
        }
        this.bubble.update();
        if(m.tick != this.tick)
            this.tick = m.tick;
    }

    play(code){
        var deepness = [0];
        var self = this;
        var readScope = function(res) {
            var scope = code;
            if(!res) {// || !scope[profondeur[profondeur.length - 1] + 1]
                if(deepness.length > 0) {
                    // console.log("Statement false => GOING BACK");
                    deepness.pop();
                }
                deepness[deepness.length - 1]++;
            }
            //else
                //console.log("Statement true => KEEP GOING");
            var pos = deepness[deepness.length - 1];
            for(var i = 0; deepness[i + 1] != undefined; i++) {
                if(scope[deepness[i]].type == "statement") {
                    scope = scope[deepness[i]].code;
                }
            }
            //console.log("pos : ", pos, ", scope : ", scope);
            if(scope[pos].type == "action") {
                //console.log("FOUND ACTION : ", scope[pos].name);
                self[scope[pos].name]();
                if(self.ap - scope[pos].ap < 0 || self.mp - scope[pos].mp < 0){
                    console.log("No enough points...");
                    self.pass();
                    return "EMPTY";
                }
                self.ap -= scope[pos].ap;
                self.mp -= scope[pos].mp;
                return "FOUND";
            }
            if(scope[pos].type == "statement") {
                //console.log("GOING DEEPER on statement : ", scope[pos].cond);
                deepness.push(0);
                jexl.eval(scope[pos].cond, context).then(readScope);
            }
        };
        readScope(42);
        // for(var i = 0; code[i]; i++){
        //     if(code[i].type == "statement"){ // IF FOUND
        //         jexl.evalAsync(code[i].cond, {}).then(function(res) {
        //             console.log(res);
        //             if(res)
        //                 return play(code[i].code);
        //             return null;
        //         });
        //     }
        //     if(code[i].type == "action"){
        //         if(this.ap - code[i].ap < 0 || this.mp - code[i].mp < 0){
        //             console.log("No enough points...");
        //             this.pass();
        //             return 1;
        //         }
        //         this[code[i].name]();
        //         this.ap -= code[i].ap;
        //         this.mp -= code[i].mp;
        //         return 1;
        //     }
        // }
        return 0;
    }
    pass(){
        if(this.player == 1)
            g.turn = "player2";
        else
            g.turn = "player1";
        this.ap = 6;
        this.mp = 3;
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
        //if(path.length > 2) {
            this.rot(this.getDir(path[1][0] - this.x, path[1][1] - this.y));
            this.move(path[1][0] - this.x, path[1][1] - this.y);
            sort = true;
        //}
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