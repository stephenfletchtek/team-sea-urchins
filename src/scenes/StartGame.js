export default class StartGame extends Phaser.Scene{
    constructor() {
      super("start-game");
    }


    preloadScene() {
      // load in physics files 
    this.load.json('physics', 'assets/physics.json');
    this.load.json('fish-physics', 'assets/players/fish-physics.json');

    // load background
    this.load.svg('background', 'assets/background/whole-background.svg', { width: 1920, height: 1080 });

    // load player    
    this.load.atlas('player', 'assets/players/player-fish-spritesheet.png', 'assets/players/player-fish.json');

    // load start button
  this.load.image("start-game-button", "assets/startup/start-game-button.png")
    }

    create() {
      // start game button at beginning
      let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start-game-button").setDepth(1)
      startButton.setInteractive();
      startButton.on("pointerup", () => {
        console.log("lets play!")
        this.scene.start("game")
      })
    }
}