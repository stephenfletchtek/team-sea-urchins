import BaseGame from './BaseGame.js';
import Player from '../components/Player.js';
import Obstacles from '../components/Obstacles.js';
import Background from '../components/Background.js';
import Collision from '../components/Collision.js';
import Score from '../components/Score.js';
import PowerUp from '../components/PowerUps.js';

export default class GamePlay extends BaseGame {
  constructor() {
    super('game-play');

    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = new Obstacles(this);
    this.collision = new Collision(this);
    this.score = new Score(this);
    this.powerups = new PowerUp(this);

    // this controls speed of moving background and adjusts obstacles in sympathy
    this.gameSpeed = 10;
    this.fasterTitle;
  }

  create() {
    // frames
    this.tick = 0;

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

    // create powerups
    this.powerups.createPowerUps();

    // GameOver on collision
    this.collision.createCollision();

    // scores
    this.score.createScore();

    // display faster title
    // this.fasterTitle = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'faster-title').setVisible(false)
  }

  update() {
    // update background
    this.background.updateMovingBackground();

    // update player
    this.player.updatePlayer();

    // update obstacles
    this.obstacles.updateObstacles();

    // update powerups
    this.powerups.updatePowerUps();

    // update score
    this.score.updateScore();

    //increase game speed for difficulty
    this.tick += 1;
    console.log(this.gameSpeed);
    if (this.tick % 500 === 0) {
      // this.music.setRate(this.music.rate + 0.04);
      // setTimeout(() => {
      this.gameSpeed += 2;
      this.fasterTitle = this.add
        .image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'faster-title')
        .setVisible(false);
      this.tweens.add({
        targets: this.fasterTitle.setVisible(true),
        alpha: -5,
        duration: 8000,
      });
      // }, 100);
    }
  }
}
