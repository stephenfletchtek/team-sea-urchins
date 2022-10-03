export default class StartGame extends Phaser.Scene {
  constructor() {
    super("start-game");
  }

  init() { };

  preload() {
    // load background
    this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });

    // load start button
    this.load.image("start-game-button", "assets/startup/start-game-button.png")
  }

  create() {
    // background
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    let scaleX = this.cameras.main.width / background.width;
    let scaleY = this.cameras.main.height / background.height;
    let scale = Math.min(scaleX, scaleY);
    background.setScale(scale).setScrollFactor(0);

    // start game button at beginning
    let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start-game-button").setDepth(1)
    startButton.setInteractive();
    startButton.on("pointerup", () => {
      console.log("lets play!")
      this.scene.start("game")
    })
  }
}