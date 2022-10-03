export default class GamePlay extends Phaser.Scene {
  constructor() {
    super('game');

    this.wasClicked = false;
    this.wasPushed = false;
    this.movePlayer;
    this.obstacles;
    this.ships;
    this.sharks;
  }

  init() { };

  preload() {
    // load in physics files 
    this.load.json('physics', 'assets/physics.json');
    this.load.json('fish-physics', 'assets/players/fish-physics.json');

    // load background
    //svg
    this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });
    

    // load player    
    this.load.atlas('player', 'assets/players/player-fish-spritesheet.png', 'assets/players/player-fish.json');

    // load obstacles 
    this.load.svg('rockObstacle', 'assets/obstacles/obstacle-rock.svg');
    this.load.image('shipObstacle', 'assets/obstacles/obstacle-ship-wreck.png');
    this.load.image('sharkObstacle', 'assets/obstacles/obstacle-shark.png')
  };

  create() {
    // turn gravity off and set bounds of screen
    this.matter.world.disableGravity();
    this.matter.world.setBounds(0, 0, 1920, 1080, 1, false, false, false, true);

    // load in physics files
    let physics = this.cache.json.get("physics");
    let fishPhysics = this.cache.json.get("fish-physics");

    // background
    let background = this.add.tileSprite(0, 0, 1920, 1080, 'background').setOrigin(0,0);
    // this.background.autoScroll(-100,0);
    let scaleX = this.cameras.main.width / background.width;
    let scaleY = this.cameras.main.height / background.height;
    let scale = Math.min(scaleX, scaleY);

    this.background = background
    this.background.setScale(scale)

    // player 
    let fishSwim = {
      key: 'fish-swim',
      frames: [
        { key: "player", frame: "fish1.png" },
        { key: "player", frame: "fish2.png" }
      ],
      frameRate: 3,
      repeat: -1
    }

    this.anims.create(fishSwim);
    this.scale = 0.5
    const screenCenterY = this.cameras.main.height / 2;
    this.player = this.matter.add.sprite(300, screenCenterY, 'player', null, { shape: fishPhysics.fish1 });
    this.player.setScale(this.scale).setScrollFactor(0);
    this.player.anims.load('fish-swim');
    this.player.anims.play('fish-swim');
    
    // *****************
    // *** obstacles ***
    // *****************
    this.obstacles = this.add.group()
    this.ships = this.add.group()
    this.sharks = this.add.group()

    // add 6 of each obstacle into their respective groups
    // make sure you don't get more obstacles on the the screen than there are in the group
    for (let i = 0; i < 5; i++) {
      this.obstacles.add(makeImage(this, 'rockObstacle', physics.rock)).setVisible(false);
      this.ships.add(makeImage(this, 'shipObstacle', physics.ship)).setVisible(false);
      this.sharks.add(makeImage(this, 'sharkObstacle', physics.shark)).setVisible(false)
    }

    // add sharks
    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        let obstaclePosition = Math.floor(Math.random() * 375) + 125
        this.sharks.get(this.cameras.main.width, obstaclePosition)
          .setActive(true)
          .setVisible(true)
          .setScale(0.5)
      }
    })

    // randomly alternate ships and rocks on bottom
    this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        if (Math.round(Math.random()) == 0){
          this.ships.get(this.cameras.main.width, 970)
          .setActive(true)
          .setVisible(true)
          .setScale(0.5)
        } else {
          this.obstacles.get(this.cameras.main.width, 970)
          .setActive(true)
          .setVisible(true)
          .setScale(0.5)
        }
      }
    })

    

    // GameOver on collision
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      // console.log("collisionstart");
      console.log({ a: bodyA, b: bodyB});
      if ((bodyA.parent.label == "fish1" && bodyB.parent.label == "shark") ||
       (bodyB.parent.label == "fish1" && bodyB.parent.label == "shark") ) {
          this.scene.start("game-over")
        }
      });

    function makeImage(scene, image, physics) {
      return scene.matter.add.image(-200, -200, image, null, { shape: physics });
    }
  };

  update() {

    this.background.tilePositionX += 5;


    const gamespeed = 3
    controlObstacle(this.obstacles, -3 * gamespeed)
    controlObstacle(this.ships, -3 * gamespeed)
    controlObstacle(this.sharks, -8 * gamespeed)

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
