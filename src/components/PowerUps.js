export default class PowerUp {
  constructor(scene){ 
    this.scene = scene
  }

  createPowerUps() {
    // load in physics files
    this.physics = this.scene.cache.json.get('worm-physics');
    
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
      this.#obstacleCallback(this.worms, YPos, 0.5)
    }

    this.#controlObstacle(this.worms, -2.5 * this.scene.gameSpeed)
  }

  #createGroups() {
    this.worms = this.scene.add.group();
  }

  #populateGroups(){  
    // make sure you don't get more objects on the the screen than there are in the group!
    for (let i = 0; i < 1; i++) {
      this.worms.add(this.#makeImage(this.scene, 'wormPower', this.physics.worm)).setVisible(false);
    }
  }

  #makeImage(scene, image, physics) {
    return scene.matter.add.image(-200, -200, image, null, { shape: physics });
  }

  #obstacleCallback(group, YPos, scale) {
    // only add child if there is one available in the pool
    if (group.countActive() < group.getLength()){
      group.get(this.scene.cameras.main.width, YPos)
      .setActive(true)
      .setVisible(true)
      .setScale(scale)          
    }
  }

  #controlObstacle(group, speed) {
    group.incX(speed);
    group.getChildren().forEach(obstacle => {
      obstacle.setAngle(0);
      obstacle.setVelocityX(0);
      obstacle.setVelocityY(0);

      if (obstacle.active && obstacle.x < -200) {
        group.killAndHide(obstacle)
      }
    })    
  }
}
