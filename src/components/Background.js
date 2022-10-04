export default class Background {
  constructor(scene){
    this.scene = scene
  }

  createMovingBackground() {
    let background = this.scene.add.image(0, 0, 'background6').setOrigin(0,0);
    let scaleX = this.scene.cameras.main.width / background.width;
    let scaleY = this.scene.cameras.main.height / background.height;
    let scale = Math.min(scaleX, scaleY);

    // this.ground6 = this.scene.add.tileSprite(this.scene, 0, 0, 1920, 1080, 'background6').setOrigin(0,0).setScale(scale);
    this.ground5 = this.scene.add.tileSprite( 0, 0, 1920, 1080, 'background5').setOrigin(0,0);
    this.ground4 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background4').setOrigin(0,0);
    this.ground3 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background3').setOrigin(0,0);
    this.ground2 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background2').setOrigin(0,0);
    this.ground1 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background1').setOrigin(0,0);

    // this.background = background
    // this.background.setScale(scale)
  }

  updateMovingBackground(){
    this.ground1.tilePositionX += 1 * this.scene.gameSpeed;
    this.ground2.tilePositionX += 0.6 * this.scene.gameSpeed;
    this.ground3.tilePositionX += 0.4 * this.scene.gameSpeed;
    this.ground4.tilePositionX += 0.3 * this.scene.gameSpeed;
    this.ground5.tilePositionX += 0.2 * this.scene.gameSpeed;
    // this.ground6.tilePositionX += 0.05 * this.scene.gameSpeed;
  }
}
