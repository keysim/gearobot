class Bot {
    constructor (player) {
        this.rotMap = ["DR", "UL", "DL", "UR"];
        this.sprite = null;
        this.x = -1;
        this.y = -1;
        this.dir = this.rotMap[Math.floor(Math.random() * 4)];
        this.player = player;
        this.bubble = new Bubble(this);
    }
    init () {
        while(map.getBlock(this.x, this.y) != "empty"){
            this.x = Math.floor((Math.random() * map.w));
            this.y = Math.floor((Math.random() * map.h));
        }
        this.bubble.init();
        this.sprite = game.add.isoSprite(blockSize * this.x, blockSize * this.y, 0, (this.player === 1) ? "bot" : "bot2", this.dir, isoGroup);
        /*if(this.player == 1)
            this.sprite.tint = 0xFF0000;
        else
            this.sprite.tint = 0xEEEEFF;*/
        this.sprite.anchor.set(0.5, 0.4);
        this.sprite.player = this.player;
        this.sprite.smoothed = false;
        this.sprite.body.moves = false;
    }
    update(){
        this.bubble.update();
    }
    move(x, y) {
        var arrival = map.getBlock(this.x + x, this.y + y);
        if (arrival == "empty") {
            this.x += x;
            this.y += y;
            this.sprite.isoPosition.setTo(this.x * blockSize, this.y * blockSize, 0);
        }
        else if (arrival == "block"){
            this.bubble.set("out");
        }
        else if (arrival == "water"){
            this.bubble.set("water");
        }
        else
            this.bubble.set("out");
    }
    rot(dir){
        this.dir = dir;
        this.sprite.frame = this.rotMap.indexOf(dir);
    }
}