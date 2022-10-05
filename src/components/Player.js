import PlayerController from './PlayerController.js';

export default class Player extends PlayerController {
  constructor(scene){
    super(scene)
  }

  createPlayer() {
    // load in player physics files
    const fishPhysics = this.scene.cache.json.get('fish-physics');

    // fish X, Y position
    this.playerX = 500;
    const playerY = this.scene.cameras.main.height / 2;
    
    // player
    this.scene.scale = 0.5;
    this.player = this.scene.matter.add.sprite(this.playerX, playerY, 'player', null, { shape: fishPhysics.fish1 });
    this.player.setScale(this.scene.scale).setScrollFactor(0);
    
    this.#playerAnimation();

    // create pointers and cursors
    this.pointer = this.scene.input.activePointer;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.centreX = this.scene.cameras.main.width / 2;
    this.centreY = this.scene.cameras.main.height / 2
  }

  updatePlayer() {
    // GameOver when out of bounds
    if (this.player.x < (this.player.width * this.scene.scale / 2)) {
      this.scene.music.stop()
      this.scene.scene.start("game-over", { score: this.scene.score.score } )
    };

    // set player angle to 0
    this.player.setAngle(0);

    // player direction responds to up and down swipe
    this.swipeControl(this.pointer);

    // player direction responds to the up and down keys
    this.cursorControl(this.cursors);

    this.player.setVelocity(this.playerVelX(), this.playerVelY())
  };

  #playerAnimation() {
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
    this.player.anims.load('fish-swim');
    this.player.anims.play('fish-swim');
  }

  /*
  #createKeys() {
    let keyA; let keyS; let keyD; let keyW;
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  }
  */
  
}