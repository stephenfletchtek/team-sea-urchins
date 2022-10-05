export default class Score {
  constructor(scene) {
    this.scene = scene;
  }

  createScore() {
    this.tick = 0;
    this.score = 0;
    const style = { font: 'bold 50px Arial', fill: '#000000' };
    this.text = this.scene.add
      .text(this.scene.cameras.main.width / 2, 50, ``, style)
      .setOrigin(0.5);
  }

  updateScore() {
    this.tick += 1;
    // score increment linked to gamespeed
    this.score += (1 * this.scene.gameSpeed) / 10;

    // print score every 7th frame
    if (this.tick % 7 == 0) {
      this.text.setText(`${Math.floor(this.score)} ${IS_TOUCH}`);
    }
  }
}
