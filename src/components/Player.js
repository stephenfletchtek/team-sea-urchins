import PlayerController from './PlayerController.js';

export default class Player extends PlayerController {
  constructor(scene) {
    super(scene);
    this.scene = scene;
  }

  createPlayer() {
    //load in fish gravity
    // this.fishGravity = this.scene.scene.systems.plugins.plugins[0].plugin.fishGravity;

    // load in player physics files
    const fishPhysics = this.scene.cache.json.get('fish-physics');

    // fish X, Y position
    this.playerX = 500;
    const playerY = this.scene.cameras.main.height / 2;

    // player
    this.scene.scale = 0.3;
    this.player = this.scene.matter.add.sprite(this.playerX, playerY, 'player', null, {
      shape: fishPhysics.fish1,
    });
    this.player.setScale(this.scene.scale).setScrollFactor(0).setIgnoreGravity(true);
    this.#playerAnimation();

    // create pointers and cursors
    this.#pointersNCursors()

    // limits to stop player going off screen
    this.#screenBoundry()
  }

  updatePlayer() {
    this.fishGravity = this.scene.scene.systems.plugins.plugins[0].plugin.fishGravity;
    this.fishSpeed = this.scene.scene.systems.plugins.plugins[0].plugin.fishSpeed;

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
        { key: 'player', frame: 'fish1.png' },
        { key: 'player', frame: 'fish2.png' },
      ],
      frameRate: 3,
      repeat: -1,
    };

    this.scene.anims.create(fishSwim);
    this.player.anims.load('fish-swim');
    this.player.anims.play('fish-swim');
  }

  #pointersNCursors() {
    this.pointer = this.scene.input.activePointer;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.centreX = this.scene.cameras.main.width / 2;
    this.centreY = this.scene.cameras.main.height / 2
  }

  #screenBoundry() {
    this.leftLim = this.player.width * this.scene.scale / 2 + 20;
    this.rightLim = this.scene.cameras.main.width - this.leftLim;
    this.upperLim = this.player.height * this.scene.scale / 2;
    this.lowerLim = this.scene.cameras.main.height - this.upperLim;
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
