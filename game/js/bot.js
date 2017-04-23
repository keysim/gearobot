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
    }
    init () {
        this.bubble.init();
        this.sprite = game.add.isoSprite(map.cell.size * this.x, map.cell.size * this.y, 0, (this.player === 1) ? "bot" : "bot2", this.dir, isoGroup);
        this.sprite.anchor.set(0.5, 0.4);
        this.sprite.player = this.player;
        this.sprite.smoothed = false;
        this.sprite.body.moves = false;
    }
    update(){
        if(m.tick != this.tick && g.turn == "player" + this.player && g.started){
            //this[this.stack.shift()]();
            console.log("CODE STARTED", g[g.turn]);
            this.play(g[g.turn]);
        }
        this.bubble.update();
        if(m.tick != this.tick)
            this.tick = m.tick;
    }
    play(code){
        for(var i = 0; code[i]; i++){
            if(code[i].type == "action"){
                if(this.ap - code[i].ap < 0 || this.mp - code[i].mp < 0){
                    console.log("No enough points...");
                    if(this.player == 1)
                        g.turn = "player2";
                    else
                        g.turn = "player1";
                }
                this[code[i].name]();
                this.ap -= code[i].ap;
                this.mp -= code[i].mp;

                return;
            }
        }
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
        var path = map.getPath(this.x, this.y, bot2.x, bot2.y);
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