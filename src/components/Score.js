export default class Score {
  constructor(scene){
    this.scene = scene
    // initialise display score
    this.displayScore = 0;
  }

  createScore(){
    const style = { font: "bold 50px Arial", fill: "#000000" };
    this.text = this.scene.add.text(this.scene.cameras.main.width / 2, 0, ``, style)

    this.score = 0;
  }

  updateScore(){
    this.displayScore += 1;
    this.scene.time.addEvent({ delay: 1000, repeat: 1000000 }, (this.score += 1 * this.scene.gameSpeed/10));
    if(this.displayScore % 7 == 0){
      console.log(this.score);
      this.text.setText(`${this.score}`);
    }
  }
}