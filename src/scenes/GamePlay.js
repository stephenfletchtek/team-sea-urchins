import BaseGame from './BaseGame.js';
import Player from '../components/Player.js';
import Obstacles from '../components/Obstacles.js';
import Background from '../components/Background.js';
import Collision from '../components/Collision.js';
import Score from '../components/Score.js'

export default class GamePlay extends BaseGame {
  constructor() {
    super('game-play');

    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = new Obstacles(this);
    this.collision = new Collision(this);
    this.score = new Score(this);

    // this controls speed of moving background and adjusts obstacles in sympathy
    this.gameSpeed = 10;
  }

  create() {
    // music
    this.music = this.sound.add('theme', { loop: true });
    this.music.play();

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

    // scores
    this.score.createScore();
  };

  update() {
    // update background
    this.background.updateMovingBackground();

    // update player
    this.player.updatePlayer();

    // update obstacles
    this.obstacles.updateObstacles();

    // update score
    this.score.updateScore();
  }
}
