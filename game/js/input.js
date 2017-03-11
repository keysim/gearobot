class Input {
    constructor () {
        this.arrows = null;
    }
    init() {
        this.arrows = game.input.keyboard.createCursorKeys();

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.arrows.left.onDown.add(function () {
            console.log("left");
        });
        this.arrows.right.onDown.add(function () {
            console.log("right");
        });
        space.onDown.add(function () {
            console.log("SPACE");
        }, this);
    }
    update() {
        if (this.arrows.up.isDown) {
            console.log("TEST UP");
        }
        else if (this.arrows.down.isDown) {
            console.log("TEST DOWN");
        }
    }
}