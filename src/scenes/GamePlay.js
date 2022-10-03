import BaseGame from './BaseGame.js';
import Player from './Player.js'
import Obstacles from './Obstacles.js'

export default class GamePlay extends BaseGame {
  constructor() {
    super('game-play');

    this.wasClicked = false;
    this.wasPushed = false;
    this.movePlayer;
    this.obstacles;
    this.ships;
    this.sharks;
  }

  create() {
    // turn gravity off and set bounds of screen
    this.matter.world.disableGravity();
    this.matter.world.setBounds(0, 0, 1920, 1080, 1, false, false, false, true);

    // background
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    let scaleX = this.cameras.main.width / background.width;
    let scaleY = this.cameras.main.height / background.height;
    let scale = Math.min(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);

    // player   
    (new Player(this)).makePlayer();

    // player
    (new Obstacles(this)).makeObstacles();
    

    // GameOver on collision
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      // console.log("collisionstart");
      console.log({ a: bodyA, b: bodyB});
      if ((bodyA.parent.label == "fish1" && bodyB.parent.label == "shark") ||
       (bodyB.parent.label == "fish1" && bodyB.parent.label == "shark") ) {
          this.scene.start("game-over")
        }
      });
  };

  update() {
    controlObstacle(this.obstacles, -3)
    controlObstacle(this.ships, -3)
    controlObstacle(this.sharks, -8)

    function controlObstacle(group, speed){
      group.incX(speed);
      group.getChildren().forEach(obstacle => {
        obstacle.setAngle(0);
        obstacle.setVelocityX(0);
        obstacle.setVelocityY(0);

        if (obstacle.active && obstacle.x < -200) {
          group.killAndHide(obstacle)
        }
      })    
    }

    // GameOver when out of bounds 
    if (this.player.x < 150) {
      this.scene.start("game-over")};

    // set player angle to 0
    this.player.setAngle(0);
    if (this.player.x > 300) {
      this.player.x = 300;
    }

    // setting the speed that the player moves
    const velocity = 25;

    // swipe 'dead band' ie a small movement is not a swipe
    const deadBand = 10

    // limits to stop player going off screen
    const upperLim = this.player.height * this.scale / 2;
    const lowerLim = this.sys.game.canvas.height - upperLim;

    // player direction responds to up and down swipe
    const pointer = this.input.activePointer
    if (pointer.isDown) {
      this.wasClicked = true
      if ((pointer.downY - pointer.y) > deadBand) {
        this.movePlayer = "up"
      } else if ((pointer.y - pointer.downY) > deadBand) {
        this.movePlayer = "down"
      } else {
        this.movePlayer = null
      }
    } else if (this.wasClicked == true) {
      this.wasClicked = false
      this.movePlayer = null
    }

    // player direction responds to the up and down keys
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.down.isDown) {
      this.wasPushed = true
      this.movePlayer = "down"
    } else if (cursors.up.isDown) {
      this.wasPushed = true
      this.movePlayer = "up"
    } else if (this.wasPushed == true) {
      this.wasPushed = false
      this.movePlayer = null
    }

    // movement for up, down and stop
    if (this.movePlayer == "down" && this.player.y < lowerLim) {
      this.player.setVelocityY(velocity)
    } else if (this.movePlayer == "up" && this.player.y > upperLim) {
      this.player.setVelocityY(-velocity)
    } else {
      this.player.setVelocity(0)
      this.movePlayer = null
    }
  };
}
