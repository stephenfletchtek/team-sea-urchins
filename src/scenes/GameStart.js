import BaseGame from './BaseGame.js';

export default class GameStart extends BaseGame {
  constructor() {
    super('game-start');
  }

  create() {
    // background
    this.setStaticBackground()

    // start game button at beginning
    const startButton = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2, 
      "start-game-button")
    startButton.setDepth(1).setInteractive();
    startButton.on("pointerup", () => {
      this.scene.start("game-play")
    })
  }
}
