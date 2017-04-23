![Image of the bots](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/title.png)
## Short
GeaRobot is a browser-based bot fighting game in which you program your artificial intelligence to successfully defeat your enemy.

## Motivation and ambition
The project was born during a Game design course at Beijing Jiaotong University in China between two students who wanted to create a game entirely based on programming. I (KeySim) dream to make a programming game since the first time I started to learn programming languages. In love with programmation, I wanted to share it through an easy access game so everybody can join and try it.
GeaRobot's ambition is to place programming in the middle of a funny, entertaining, playful browser-based video game so everybody even beginners can enjoy programmation and hopefully start learning programming languages afterward.


# The game (You loosed)

## Description
The main idea of the game is to create with a high level programming language an artificial intelligence of a little Gear Bot. 
At the beginning of the match, the two players will have to write their code using a list of functionality displayed ...

## Bots
The bot is the character that will be executing actions of the player's script.

The character has been made by myself :

![Image of the bots](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/botDesign.png)

The last two characters are the two players chosen to be in the game.

## Maps
Made from the original [**Isometric tiles texture**](http://opengameart.org/content/isometric-tileset) of TheValar and a bit modified by myself.

![Image of the tiles](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/mapTiles.png)

#### 3 types of map :

![Image of the maps](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/maps.png)

Specifications :
* The soil under the tree or the bush will change to grass if he is in the grass biome
* The water move to create a nice little effect
* Every generated is tested to be playable (a Path-Finding is launch between the two bots which has to be unoccupied)

## Funny bubble idea
We think about a way to tell the player when his AI is doing something. We were going on an animation way but lack of design knowledge we decided to find a funny and easy way. So we found this bubble idea. 
Here is two kind of bubble you can see appearing when the AI is going in a wrong direction for example :

![Image of the bubbles](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/bubbles.png)

# Installation

### Specifications :
- Hardware - 1 CPU, 512 Mo RAM, 40 Go Storage
- Software - NodeJS, npm and Git

Installation through Git commands :
```bash
$ git clone http://github.com/keysim/gearobot
$ cd gearobot
$ npm install
$ npm start
```
Now that your server started, you can simply go on your browser to this url :
```
> localhost:1234
```

Made with :
* [phaser.io](http://phaser.io) - Javasript Game Framework
* [isometric plugin](http://rotates.org/phaser/iso) - Phaser isometric plugin


## Authors & Contributors
[![Keysim](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/keysim.png)](http://keysim.fr) | [![Vireth](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/vireth.png)](http://vireth.com) | [![Tang](https://raw.githubusercontent.com/keysim/gearobot/master/doc/img/tang.png)](http://keysim.fr)
---|---|---
[Simon Menard](keysim.fr) | [Vireth Thach sok](vireth.com) | [Jean-Luc Tang](keysim.fr)

**A special thanks to the Leekwar community and my wonderful girlfriend who gave me some ideas.**

You can submit your ideas if you want to help, just answer to this ticket :

>[Yes, I have awesome ideas for the game !](https://github.com/keysim/gearobot/issues/1)

Every body who help will have their names in the credits of courses :sunglasses:


License
----

This project is licensed under the MIT License

**Free Software enjoy**