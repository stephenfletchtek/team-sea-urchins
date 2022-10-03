export default class Player {
  constructor(scene){
    this.scene = scene
    this.velocity = 25;
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

    this.player = this.scene.matter.add.sprite(300, screenCenterY, 'player', null, { shape: fishPhysics.fish1 });
    this.player.setScale(this.scene.scale).setScrollFactor(0);
    this.player.anims.load('fish-swim');
    this.player.anims.play('fish-swim');
  }

  updatePlayer() {
    // GameOver when out of bounds 
    if (this.player.x < 150) {
      this.scene.scene.start("game-over")};

    // set player angle to 0
    this.player.setAngle(0);
    if (this.player.x > 300) {
      this.player.x = 300;
    }

    // swipe 'dead band' ie a small movement is not a swipe
    const deadBand = 10

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

    // set player velocity
    this.player.setVelocityX(0);
    this.player.setVelocityY(this.#playerVelY())

  };

  #playerVelY() {
    // limits to stop player going off screen
    const upperLim = this.player.height * this.scene.scale / 2;
    const lowerLim = this.scene.cameras.main.height - upperLim;

    if (this.movePlayer == "down" && this.player.y < lowerLim) {
      return this.velocity
    } else if (this.movePlayer == "up" && this.player.y > upperLim) {
      return -(this.velocity)
    } else {
      this.movePlayer = null
      return 0
    }
  }
}