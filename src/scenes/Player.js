export default class Player {
  constructor(scene){
    this.scene = scene
  }

  makePlayer() {
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
}