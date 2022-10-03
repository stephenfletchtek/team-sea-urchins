import BaseGame from './BaseGame.js';
import Player from './Player.js'
import Obstacles from './Obstacles.js'
import Background from './Background.js';

export default class GamePlay extends BaseGame {
  constructor() {
    super('game-play');

    this.background = new Background(this)
    this.player = new Player(this)
    this.obstacles = new Obstacles(this)
  }

  create() {
    // turn gravity off and set bounds of screen
    this.matter.world.disableGravity();
    this.matter.world.setBounds(0, 0, 1920, 1080, 1, false, false, false, true);

    // create background
    this.background.createMovingBackground();

    // create player   
    this.player.createPlayer();

    // create obstacles
    this.obstacles.createObstacles();

    // GameOver on collision
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      // console.log("collisionstart");
      // console.log({ a: bodyA, b: bodyB});
      if ((bodyA.parent.label == "fish1" && bodyB.parent.label == "shark") ||
       (bodyB.parent.label == "fish1" && bodyB.parent.label == "shark") ) {
          this.scene.start("game-over")
        }
      });
  };

  update() {
    // update player
    this.player.updatePlayer();

    // update obstacles
    this.obstacles.updateObstacles();
  }
}
