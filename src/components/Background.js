export default class Background {
  constructor(scene){
    this.scene = scene
  }

  createMovingBackground() {
    this.scene.add.image(0, 0, 'background').setOrigin(0, 0);
  }
}