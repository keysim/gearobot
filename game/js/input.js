class Input {
    constructor () {
        this.arrows = null;
    }
    init() {
        this.arrows = game.input.keyboard.createCursorKeys();

        var space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        game.input.keyboard.addKey(Phaser.Keyboard.Q).onDown.add(function () {
            bot.move(0, 1);
            bot.rot("DL");
            sort = true;
        });
        game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(function () {
            bot.move(0, -1);
            bot.rot("UR");
            sort = true;
        });
        game.input.keyboard.addKey(Phaser.Keyboard.Z).onDown.add(function () {
            bot.move(-1, 0);
            bot.rot("UL");
            sort = true;
        });
        game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(function () {
            bot.move(1, 0);
            bot.rot("DR");
            sort = true;
        });
        this.arrows.left.onDown.add(function () {
            bot2.move(0, 1);
            bot2.rot("DL");
            sort = true;
        });
        this.arrows.right.onDown.add(function () {
            bot2.move(0, -1);
            bot2.rot("UR");
            sort = true;
        });
        this.arrows.up.onDown.add(function () {
            bot2.move(-1, 0);
            bot2.rot("UL");
            sort = true;
        });
        this.arrows.down.onDown.add(function () {
            bot2.move(1, 0);
            bot2.rot("DR");
            sort = true;
        });
        space.onDown.add(function () {
            map.water[0].frame = 3;
            console.log("SPACE");
        }, this);
    }
    update() {
        /*if (this.arrows.up.isDown) {
            console.log("TEST UP");
        }
        else if (this.arrows.down.isDown) {
            console.log("TEST DOWN");
        }*/
    }
}