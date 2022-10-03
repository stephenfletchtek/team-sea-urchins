export default class Obstacles {
  constructor(scene){
    this.scene = scene
  }

  makeObstacles() {
    // load in physics files
    let physics = this.scene.cache.json.get("physics");

    // add to group
    this.scene.obstacles = this.scene.add.group()
    this.scene.ships = this.scene.add.group()
    this.scene.sharks = this.scene.add.group()

    // add 6 of each obstacle into their respective groups
    // make sure you don't get more obstacles on the the screen than there are in the group
    for (let i = 0; i < 5; i++) {
      this.scene.obstacles.add(makeImage(this.scene, 'rockObstacle', physics.rock)).setVisible(false);
      this.scene.ships.add(makeImage(this.scene, 'shipObstacle', physics.ship)).setVisible(false);
      this.scene.sharks.add(makeImage(this.scene, 'sharkObstacle', physics.shark)).setVisible(false)
    }

    // add sharks
    this.scene.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        let obstaclePosition = Math.floor(Math.random() * 375) + 125
        this.scene.sharks.get(this.scene.cameras.main.width, obstaclePosition)
          .setActive(true)
          .setVisible(true)
          .setScale(0.5)
      }
    })

    // randomly alternate ships and rocks on bottom
    this.scene.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        if (Math.round(Math.random()) == 0){
          this.scene.ships.get(this.scene.cameras.main.width, 970)
          .setActive(true)
          .setVisible(true)
          .setScale(0.5)
        } else {
          this.scene.obstacles.get(this.scene.cameras.main.width, 970)
          .setActive(true)
          .setVisible(true)
          .setScale(0.5)
        }
      }
    })

    function makeImage(scene, image, physics) {
      return scene.matter.add.image(-200, -200, image, null, { shape: physics });
    }
  }
}