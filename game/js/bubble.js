class Bubble {
    constructor (bot) {
        this.types = ["clear", "hurt", "out", "water"];
        this.bot = bot;
        this.sprite = null;
    }
    init () {
        this.sprite = game.add.isoSprite(blockSize * this.bot.x+5, blockSize * this.bot.y+10, 50, "bubble", "empty", isoGroup);
        this.sprite.anchor.set(0, 1);
        this.sprite.player = this.player;
        //this.sprite.tint = 0xED5565;
        this.sprite.static = true;
        this.sprite.smoothed = false;
        this.sprite.body.moves = false;
        this.sprite.frame = 2;
        this.sprite.alpha = 0;
    }
    update() {
        this.sprite.isoZ = this.bot.sprite.isoZ + 50;
    }
    set(type){
        //game.iso.topologicalSort(isoGroup);
        this.sprite.isoX = this.bot.x * blockSize+5;
        this.sprite.isoY = this.bot.y * blockSize+10;
        this.sprite.frame = this.types.indexOf(type);
        var tween = game.add.tween(this.sprite).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true);
        tween.onComplete.add(function () {
            game.add.tween(this.sprite).to({ alpha: 0 }, 1500, Phaser.Easing.Quadratic.InOut, true);
        }, this);
    }
}