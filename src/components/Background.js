export default class Background {
  constructor(scene){
    this.scene = scene
  }

  createMovingBackground() {
    this.ground6 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background6').setOrigin(0,0);
    this.ground5 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background5').setOrigin(0,0);
    this.ground4 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background4').setOrigin(0,0);
    // this.ground3 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background3').setOrigin(0,0);
    this.ground2 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background2').setOrigin(0,0);
    this.ground1 = this.scene.add.tileSprite(0, 0, 1920, 1080, 'background1').setOrigin(0,0);
  }

  updateMovingBackground(){
    this.ground1.tilePositionX += this.scene.gameSpeed/6 * 20;
    this.ground2.tilePositionX += this.scene.gameSpeed/6 * 14;
    // this.ground3.tilePositionX += this.scene.gameSpeed/6 * 10;
    this.ground4.tilePositionX += this.scene.gameSpeed/6 * 12;
    this.ground5.tilePositionX += this.scene.gameSpeed/6 * 8;
    this.ground6.tilePositionX += this.scene.gameSpeed/6 * 1;
  }
}
