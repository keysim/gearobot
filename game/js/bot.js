class Bot {
    constructor (x, y, dir, player) {
        this.rotMap = ["DR", "UL", "DL", "UR"];
        this.sprite = null;
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.player = player;
        this.bubble = new Bubble(this);
    }
    init () {
        this.bubble.init();
        this.sprite = game.add.isoSprite(blockSize * this.x, blockSize * this.y, 0, "bot", this.dir, isoGroup);
        this.sprite.anchor.set(0.5, 0.4);
        this.sprite.player = this.player;
        if(this.player === 2)
            this.sprite.tint = 0x555555;
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