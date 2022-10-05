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
      let XPosWorms = Math.floor(Math.random() * 1200) + 80;
      this.#powerupCallback(this.worms, XPosWorms, -100, 0.5)
    }

    // add bubbles
    if (this.tick % 50 == 0){
      let XPosBubbles = Math.floor(Math.random() * 1200) + 80;
      this.#powerupCallback(this.bubbles, XPosBubbles, 1200, 0.4)
    }

    this.#controlPowerUp(this.worms, 0.5 * this.scene.gameSpeed, -101, 1200)
    this.#controlPowerUp(this.bubbles, -0.5 * this.scene.gameSpeed, -200, 1300)
  }

  #createGroups() {
    this.worms = this.scene.add.group();
    this.bubbles = this.scene.add.group();
  }

  #populateGroups(){  
    // make sure you don't get more objects on the the screen than there are in the group!
    for (let i = 0; i < 1; i++) {
      this.worms.add(this.scene.matter.add.image(-200, -200, 'wormPower', null, { shape: this.physics.worm }));
      this.bubbles.add(this.#bubblesAnimation());
    }
  }

  #powerupCallback(group, XPos, YPos, scale) {
    // only add child if there is one available in the pool
    if (group.countActive() < group.getLength()){
      group.get(XPos, YPos)
      .setActive(true)
      .setVisible(true)
      .setScale(scale)          
    }
  }

  #bubblesAnimation() {
    let bubbleImage = this.scene.matter.add.sprite(-200, -200, 'bubblePower', null, { shape: this.physics.bubbles });

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
  
  #controlPowerUp(group, speed, upperLim, lowerLim) {
    group.incY(speed);
    group.getChildren().forEach(powerup => {
      powerup.setAngle(0);
      powerup.setVelocityX(0);
      powerup.setVelocityY(0);

      if (powerup.active && (powerup.y < upperLim || powerup.y > lowerLim)) {
        group.killAndHide(powerup)
      }
    })
  }
}
