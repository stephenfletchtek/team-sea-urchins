export default class Background {
  constructor(scene){
    this.scene = scene
  }

  makeMovingBackground() {
    const background = this.scene.add.image(0, 0, 'background').setOrigin(0, 0);
    let scaleX = this.scene.cameras.main.width / background.width;
    let scaleY = this.scene.cameras.main.height / background.height;
    let scale = Math.min(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);
  }
}