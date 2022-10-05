export default class Powerup {
  constructor(scene){
    this.scene = scene
  }

  createPowerup() {
    // load in powerup physics files
    const powerupPhysics = this.scene.cache.json.get('powerup-physics');

    // powerup
    this.scene.scale = 0.5
    const screenCenterY = this.scene.cameras.main.height / 2;
    this.bubbles = this.scene.matter.add.sprite(300, screenCenterY, 'bubbles', null, { shape: powerupPhysics.bubbles });
    this.bubbles.setIgnoreGravity(true);
    this.bubbles.setScale(this.scene.scale).setScrollFactor(0);
    
    this.#bubblesAnimation();
  }

  #bubblesAnimation() {
    let bubblesMove = {
      key: 'bubbles-move',
      frames: [
        { key: "bubbles", frame: "bubbles1.png" },
        { key: "bubbles", frame: "bubbles2.png" },
        { key: "bubbles", frame: "bubbles3.png" }
      ],
      frameRate: 2,
      repeat: -1
    }

    this.scene.anims.create(bubblesMove);
    this.bubbles.anims.load('bubbles-move');
    this.bubbles.anims.play('bubbles-move');
  }
}