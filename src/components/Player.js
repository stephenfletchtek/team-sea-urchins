import PlayerController from './PlayerController.js';

export default class Player extends PlayerController {
  constructor(scene){
    super(scene)
  }

  createPlayer() {
    // load in player physics files
    const fishPhysics = this.scene.cache.json.get('fish-physics');

    // player
    this.scene.scale = 0.5
    const screenCenterY = this.scene.cameras.main.height / 2;
    this.player = this.scene.matter.add.sprite(300, screenCenterY, 'player', null, { shape: fishPhysics.fish1 });
    this.player.setScale(this.scene.scale).setScrollFactor(0);
    
    this.#playerAnimation();
  }

  updatePlayer() {
    // GameOver when out of bounds
    if (this.player.x < 150) {
      this.scene.music.stop()
      this.scene.scene.start("game-over", { score: this.scene.score.score } )
    };

    // set player angle to 0
    this.player.setAngle(0);
    if (this.player.x > 300) {
      this.player.x = 300;
    }

    // player direction responds to up and down swipe
    const pointer = this.scene.input.activePointer;
    this.movePlayer = this.swipeControl(pointer);

    // player direction responds to the up and down keys
    const cursors = this.scene.input.keyboard.createCursorKeys();
    this.movePlayer = this.cursorControl(cursors);

    // set player velocity
    this.player.setVelocityX(0);
    this.player.setVelocityY(this.playerVelY())
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
}