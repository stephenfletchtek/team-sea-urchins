export default class PowerUp {
  constructor(scene){ 
    this.scene = scene
  }

  createPowerUps() {
    // load in physics files
    this.physics = this.scene.cache.json.get('powerup-physics');
    
    this.tick = 0;

    // create and populate obstacle groups
    this.#createGroups()
    this.#populateGroups()
  }

  updatePowerUps() {
    this.tick += 1

    // add cans of worms
    if (this.tick % 50 == 0){
      let YPos = Math.floor(Math.random() * 300) + 100;
      this.#powerupCallback(this.worms, YPos, 0.5)
    }

    // add bubbles
    if (this.tick % 50 == 0){
      let powerupX = Math.floor(Math.random() * 300) + 100;
      this.#powerupCallback(this.bubbles, powerupX, 0.7)
    }

    this.#controlPowerUp(this.worms, -2.5 * this.scene.gameSpeed)
    this.#controlPowerUp(this.bubbles, 0.5 * this.scene.gameSpeed)
  }

  #createGroups() {
    this.worms = this.scene.add.group();
    this.bubbles = this.scene.add.group();
  }

  #populateGroups(){  
    // make sure you don't get more objects on the the screen than there are in the group!
    for (let i = 0; i < 1; i++) {
      this.worms.add(this.scene.matter.add.image(-200, -200, 'wormPower', null, { shape: this.physics.worm })).setVisible(false);
      this.bubbles.add(this.#bubblesAnimation());
    }
  }

  #powerupCallback(group, YPos, scale) {
    // only add child if there is one available in the pool
    if (group.countActive() < group.getLength()){
      group.get(this.scene.cameras.main.width, YPos)
      .setActive(true)
      .setVisible(true)
      .setScale(scale)          
    }
  }

  #bubblesAnimation() {
    let bubbleImage = this.scene.matter.add.sprite(300, 300, 'bubblePower', null, { shape: this.physics.bubbles });

    let bubblesMove = {
      key: 'bubbles-move',
      frames: [
        { key: "bubblePower", frame: "bubbles1.png" },
        { key: "bubblePower", frame: "bubbles2.png" },
        { key: "bubblePower", frame: "bubbles3.png" }
      ],
      frameRate: 2,
      repeat: -1
    }

    this.scene.anims.create(bubblesMove)
    bubbleImage.anims.load('bubbles-move')
    bubbleImage.anims.play('bubbles-move')

    return bubbleImage;
  }
  
  #controlPowerUp(group, speed) {
    group.incX(speed);
    group.getChildren().forEach(powerup => {
      powerup.setAngle(0);
      powerup.setVelocityX(0);
      powerup.setVelocityY(0);

      if (powerup.active && powerup.x < -200) {
        group.killAndHide(powerup)
      }
    })    
  }
}
