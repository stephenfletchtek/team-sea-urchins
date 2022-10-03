import BaseGame from './BaseGame.js';

export default class GameStart extends BaseGame {
  constructor() {
    super('game-start');
  }

  create() {
    // background
    this.setStaticBackground()

    // start game button at beginning
    let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start-game-button").setDepth(1)
    startButton.setInteractive();
    startButton.on("pointerup", () => {
      console.log("lets play!")
      this.scene.start("game-play")
    })
  }
}