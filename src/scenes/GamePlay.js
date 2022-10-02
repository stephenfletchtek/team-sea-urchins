export default class GamePlay extends Phaser.Scene {
  constructor() {
    super('game');

    this.wasClicked = false;
    this.wasPushed = false;
    this.movePlayer;
    this.obstacles;
  }

  init() { };

  preload() {
    // load in physics files 
    this.load.json('physics', 'assets/physics.json');
    this.load.json('fish-physics', 'assets/players/fish-physics.json');

    // load background
    this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });

    // load player    
    this.load.atlas('player', 'assets/players/player-fish-spritesheet.png', 'assets/players/player-fish.json');

    // load obstacles 
    this.load.svg('rockObstacle', 'assets/obstacles/obstacle-rock.svg');
    this.load.image('obstacle-ship', 'assets/obstacles/obstacle-ship-wreck.png');
  };

  create() {
    // turn gravity off and set bounds of screen
    this.matter.world.disableGravity();
    this.matter.world.setBounds(0, 0, 1920, 1080, 1, false, false, false, true);

    // load in physics files
    let physics = this.cache.json.get("physics");
    let fishPhysics = this.cache.json.get("fish-physics");

    // background
    let canvas = this.sys.game.canvas, width = window.innerWidth, height = window.innerHeight;
    let wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
      canvas.style.width = width + "px";
      canvas.style.height = (width / ratio) + "px";
    } else {
      canvas.style.width = (height * ratio) + "px";
      canvas.style.height = height + "px";
    }

    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

    let scaleX = this.cameras.main.width / background.width;
    let scaleY = this.cameras.main.height / background.height;
    let scale = Math.min(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);

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

    // add 3 rocks and 3 ships alternately into the group
    for (let i = 0; i < 3; i++) {
      this.obstacles.add(makeSprite(this, 'rockObstacle', physics.rock));
      this.obstacles.add(makeSprite(this, 'obstacle-ship', physics.ship));
    }

    this.time.addEvent({
      // make sure you don't get more obstacles on the the screen than there are in the group
      delay: 3000,
      loop: true,
      callback: () => {
        let obstaclePosition = Math.floor(Math.random() * 5);
        this.obstacles.get(this.cameras.main.width, [125, 360, 595, 780, 900][obstaclePosition])
          .setActive(true)
          .setVisible(true)
          .setScale(0.7)
      }
    })

    // collisions
    this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
      console.log("listening to event");
      console.log({ a: bodyA, b: bodyB })
      if (bodyA.parent.label == "fish1") {
        console.log("1");
        if (bodyA.bounds.max.x < 0) {
          console.log(bodyA);
          this.scene.start("game-over")
        }
      } else if (bodyB.parent.label == "fish1") {
        console.log("2");
        console.log(bodyB);
        if (bodyB.bounds.max.x < 0) {
          console.log(bodyA);
          this.scene.start("game-over")
        }
      }
    });

    function makeSprite(game, image, physics) {
      return game.matter.add.sprite(-200, -200, image, null, { shape: physics })
    }
  };

  update() {
    this.obstacles.incX(-8);
    this.obstacles.getChildren().forEach(obstacle => {
      // stop rotation and movement
      obstacle.setAngle(0);
      obstacle.setVelocityX(0);
      obstacle.setVelocityY(0);

      if (obstacle.active && obstacle.x < -200) {
        this.obstacles.killAndHide(obstacle);
      }
    })

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

  // Additional code
  resize() {
    let canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    let wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
      canvas.style.width = width + "px";
      canvas.style.height = (width / ratio) + "px";
    } else {
      canvas.style.width = (height * ratio) + "px";
      canvas.style.height = height + "px";
    }

  }
}
