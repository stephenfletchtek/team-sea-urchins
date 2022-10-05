export default class Powerup {
  constructor(scene){
    this.scene = scene
  }

  createPowerup() {
    // load in powerup physics files
    this.powerupPhysics = this.scene.cache.json.get('powerup-physics');
    
    this.tick = 0;

    // create and populate powerup groups
    this.#createGroups()
    this.#populateGroups()
    this.#bubblesAnimation(this.bubbles)
    console.log(this.bubbles);
  }

  updatePowerup() {
    this.tick += 1

    // add bubbles
    if (this.tick % 50 == 0){
      let powerupX = Math.floor(Math.random() * 375) + 125;
      this.#powerupCallback(this.bubbles, powerupX, 0.7)
    }

    this.#controlPowerup(this.bubbles, 2 * this.scene.gameSpeed)
  }

  #bubblesAnimation(group) {
    group.getChildren().forEach(powerup => {
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
      powerup.anims.load('bubbles-move');
      powerup.anims.play('bubbles-move');
    })
  }

  #createGroups() {
    this.bubbles = this.scene.add.group();
  }

  #populateGroups(){  
    // add 6 of each obstacle into their respective groups
    // make sure you don't get more obstacles on the the screen than there are in the group
    for (let i = 0; i < 2; i++) {
      this.bubbles.add(this.#makeImage(this.scene, 'bubbles', this.powerupPhysics.rock)).setVisible(false);
    }
  }

  #makeImage(scene, image, physics) {
    const screenCenterY = this.scene.cameras.main.height;
    return scene.matter.add.sprite(300, screenCenterY, image, null, { shape: physics });

    // this.scene.scale = 0.5
    // const screenCenterY = this.scene.cameras.main.height / 2;
    // this.bubbles = this.scene.matter.add.sprite(300, screenCenterY, 'bubbles', null, { shape: powerupPhysics.bubbles });
    // this.bubbles.setIgnoreGravity(true);
    // this.bubbles.setScale(this.scene.scale).setScrollFactor(0);
  }

  #powerupCallback(powerups, powerupX, scale) {
    powerups.get(this.scene.cameras.main.width, powerupX)
      .setActive(true)
      .setVisible(true)
      .setScale(scale)
  }

  #controlPowerup(group, speed) {
    group.incY(speed);
    group.getChildren().forEach(powerup => {
      powerup.setAngle(0);
      console.log(powerup.y);
      // powerup.setVelocityX(0);
      // powerup.setVelocityY(0);

      if (powerup.active && powerup.y < 0) {
        group.killAndHide(powerup)
      }
    })    
  }
}