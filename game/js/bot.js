class Bot {
    constructor (x, y, dir, player) {
        this.spr = null;
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.player = player;
    }
    init () {
        this.spr = game.add.isoSprite(blockSize * this.x, blockSize * this.y, 0, "bot" + this.dir, null, isoGroup);
        this.spr.anchor.set(0.5, 0.4);
        this.spr.player = this.player;
        if(this.player === 2)
            this.spr.tint = 0x555555;
        this.spr.smoothed = false;
        this.spr.body.moves = false;
    }
}