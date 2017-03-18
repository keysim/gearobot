# GeaRobot (Alpha)
GeaRobot is a browser-based bot fighting game in which you program your artificial intelligence to successfully defeat your enemy.
The main idea of the game is to create with a high level programming language a artificial intelligence of a little Gear Bot. At the begin of the match, the two players will have to write their code using a list of functionnalities displayed

## Motivation and ambition
The project was born during a Game design course at Beijing Jiaotong University in China between two students who wanted to create a game entirely based on programming. I (KeySim) dreamed to make a programming game since the first time I started to learn programming languages. In love with programmation, I wanted to share it through a easy access game so everybody could join and try it.
GeaRobot's ambition is to place programming in the middle of a funny, entertaining, playful browser-based video game so everybody even beginners can enjoy programmation and hopefully start learning programming languages afterward.


# The game (You just lose)

## Bots
The bot is the character which will be executing the actions of the script the player write.
#### Evolution of the bot design
The character has been made by my self. I'm pretty bad at designing as you can see but I did my best trying the character match the maps.

![Image of the bots](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/botDesign.png)

The last two character are the two player choosed to be in the game.

## Maps
Made from the original [**Isometric tiles texture**](http://opengameart.org/content/isometric-tileset) of TheValar and a bit modified by myself.

![Image of the tiles](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/mapTiles.png)

#### 3 type of map :
* Arena (3x15)
* Random (10x10)
* Biome (10x10)


Specifications :
* The soil under the tree or the bush will change to grass if he is in the grass biome
* The water move to create a nice little effect

## Funny bubble idea

# Installation

### Specifications :
- Hardware - 1 CPU, 512 Mo RAM, 40 Go Stockage
- Software - NodeJS, npm and Git

Installation through Git commands :
```bash
$ git clone http://github.com/keysim/gearobot
$ cd gearobot
$ npm install
$ npm start
```
Now that your server started, you can simply go on your prefered browser to this url :
```
> localhost:1234
```

Made with :
* [phaser.io](http://phaser.io) - Javasript Game Framwork
* [phaser isometric](http://rotates.org/phaser/iso) - Phaser isometric plugin


## Authors & Contributors
[![Keysim](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/keysim.jpg)](http://keysim.fr) | [![Vireth](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/vireth.jpg)](http://vireth.com)
---|---
[Simon menard](keysim.fr) | [Vireth Thach sok](vireth.com)

We are two Epitech students this project is only for our BJTU projects. Somes ideas came from the leekwar community and my wonderfull girlfriend.
I'm open to receive more ideas from anybody. For that, you just need to answer to the issues Github section on this ticket :

>[Yes, I have awesome ideas for the game !](https://github.com/keysim/gearobot/issues/1)

Every body who help will have their names in the credits of courses :sunglasses:


License
----

This project is licensed under the MIT License

**Free Software enjoy**