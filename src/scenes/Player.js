export default class Player {
  constructor(scene){
    this.scene = scene

    // this.wasClicked = false;
    // this.wasPushed = false;
    // this.movePlayer;

    // scene.player
  }

  createPlayer() {
    // load in player physics files
    let fishPhysics = this.scene.cache.json.get("fish-physics");

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

    this.scene.anims.create(fishSwim);
    this.scene.scale = 0.5
    const screenCenterY = this.scene.cameras.main.height / 2;
    this.scene.player = this.scene.matter.add.sprite(300, screenCenterY, 'player', null, { shape: fishPhysics.fish1 });
    this.scene.player.setScale(this.scene.scale).setScrollFactor(0);
    this.scene.player.anims.load('fish-swim');
    this.scene.player.anims.play('fish-swim');
  }

  updatePlayer() {
    // GameOver when out of bounds 
    if (this.scene.player.x < 150) {
      this.scene.scene.start("game-over")};

    // set player angle to 0
    this.scene.player.setAngle(0);
    if (this.scene.player.x > 300) {
      this.scene.player.x = 300;
    }

    // setting the speed that the player moves
    const velocity = 25;

    // swipe 'dead band' ie a small movement is not a swipe
    const deadBand = 10

    // limits to stop player going off screen
    const upperLim = this.scene.player.height * this.scene.scale / 2;
    const lowerLim = this.scene.sys.game.canvas.height - upperLim;

    // player direction responds to up and down swipe
    const pointer = this.scene.input.activePointer
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
    const cursors = this.scene.input.keyboard.createCursorKeys();
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
    if (this.movePlayer == "down" && this.scene.player.y < lowerLim) {
      this.scene.player.setVelocityY(velocity)
    } else if (this.movePlayer == "up" && this.scene.player.y > upperLim) {
      this.scene.player.setVelocityY(-velocity)
    } else {
      this.scene.player.setVelocity(0)
      this.movePlayer = null
    }
  };
}