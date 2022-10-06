export default class Obstacles {
  constructor(scene) {
    this.scene = scene;
  }

  createObstacles() {
    // load in physics files
    this.physics = this.scene.cache.json.get('obstacles-physics');

    this.tick = 0;

    // create and populate obstacle groups
    this.#createGroups();
    this.#populateGroups();
  }

  updateObstacles() {
    this.tick += 1;

    // add sharks
    if (this.tick % 325 == 0) {
      let obstacleY = Math.floor(Math.random() * 350) + 150;
      this.#obstacleCallback(this.sharks, obstacleY, 0.7);
    }

    // add random mix of rocks and ships
    if (this.tick % 100 == 0) {
      if (Math.random() < 0.7) {
        this.#obstacleCallback(this.rocks, 920, 0.9);
      } else {
        this.#obstacleCallback(this.ships, 950, 1.1);
      }
    }

    this.#controlObstacle(this.rocks, -this.scene.gameSpeed);
    this.#controlObstacle(this.ships, -this.scene.gameSpeed);
    this.#controlObstacle(this.sharks, -2 * this.scene.gameSpeed);
  }

  #createGroups() {
    this.rocks = this.scene.add.group();
    this.ships = this.scene.add.group();
    this.sharks = this.scene.add.group();
  }

  #populateGroups() {
    // make sure you don't get more obstacles on the the screen than there are in the group!
    for (let i = 0; i < 2; i++) {
      this.sharks
        .add(this.#makeImage(this.scene, 'sharkObstacle', this.physics.shark))
        .setVisible(false);
    }
    this.rocks
      .add(this.#makeImage(this.scene, 'rockObstacle', this.physics.rock))
      .setVisible(false);
    this.ships
      .add(this.#makeImage(this.scene, 'shipObstacle', this.physics.ship))
      .setVisible(false);
  }

  #makeImage(scene, image, physics) {
    return scene.matter.add
      .image(-200, -200, image, null, { shape: physics })
      .setIgnoreGravity(true);
  }

  #obstacleCallback(obstacles, obstacleY, scale) {
    // only add obstacle if there is one available in the pool
    if (obstacles.countActive() < obstacles.getLength()) {
      obstacles
        .get(this.scene.cameras.main.width, obstacleY)
        .setActive(true)
        .setVisible(true)
        .setScale(scale);
    }
  }

  #controlObstacle(group, speed) {
    group.incX(speed);
    group.getChildren().forEach((obstacle) => {
      obstacle.setAngle(0);
      obstacle.setVelocityX(0);
      obstacle.setVelocityY(0);

      if (obstacle.active && obstacle.x < -200) {
        group.killAndHide(obstacle);
      }
    });
  }
}
