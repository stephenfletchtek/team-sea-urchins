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

    // this controls speed of moving background and adjusts obstacles in sympathy
    this.gameSpeed = 10;
    // initialise display score
    this.displayScore = 0;
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


    // scores
    const style = { font: "bold 50px Arial", fill: "#000000" };
    this.text = this.add.text(this.cameras.main.width / 2, 0, ``, style)

    this.score = 0;
  };

  update() {
    // update background
    this.background.updateMovingBackground();

    // update player
    this.player.updatePlayer();

    // update obstacles
    this.obstacles.updateObstacles();

    // update score
    this.displayScore += 1;
    this.time.addEvent({ delay: 1000, repeat: 1000000 }, (this.score += 1 * this.gameSpeed/10));
    if(this.displayScore % 7 == 0){
      console.log(this.score);
      this.text.setText(`${this.score}`);
    }
  }
}
