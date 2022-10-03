import BaseGame from './BaseGame.js';
import Player from '../components/Player.js'
import Obstacles from '../components/Obstacles.js'
import Background from '../components/Background.js';
import Collision from '../components/Collision.js'

export default class GamePlay extends BaseGame {
  constructor() {
    super('game-play');

    this.background = new Background(this)
    this.player = new Player(this)
    this.obstacles = new Obstacles(this)
    this.collision = new Collision(this)
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
    this.collision.createCollision()
  };

  update() {
    // update player
    this.player.updatePlayer();

    // update obstacles
    this.obstacles.updateObstacles();
  }
}
