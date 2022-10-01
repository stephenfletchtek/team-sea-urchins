export default class StartGame extends Phaser.Scene{
    constructor() {
      super("start-game");
    }


    init() {};

    preload() {
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
        // turn gravity off and set bounds of screen
      this.matter.world.disableGravity();
      this.matter.world.setBounds(0, 0, 1920, 1080, 1, false, false, false, true);
    
      // load in physics files for player
      let fishPhysics = this.cache.json.get("fish-physics");
      
      // background
      // window.addEventListener('resize', resize);
      // resize();
      let canvas = this.sys.game.canvas, width = window.innerWidth, height = window.innerHeight;
      let wratio = width / height, ratio = canvas.width / canvas.height;
    
      if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
      } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
      }

      const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    
      let scaleX = this.cameras.main.width / background.width;
      let scaleY = this.cameras.main.height / background.height;
      let scale = Math.min(scaleX, scaleY);
      background.setScale(scale).setScrollFactor(0);
    
       // player 
      // let fishSwim = {
      //   key: 'fish-swim',    
      //   frames: [
      //       {key: "player", frame: "fish1.png"},
      //       {key: "player", frame: "fish2.png"}
      //   ],
      //   frameRate: 3,
      //   repeat: -1
      //   }

      // this.anims.create(fishSwim);
      // this.scale = 0.5
      // const screenCenterY = this.cameras.main.height / 2;
      // this.player = this.matter.add.sprite(300, screenCenterY, 'player', null, { shape: fishPhysics.fish1 });
      // this.player.setScale(this.scale).setScrollFactor(0);
      // this.player.anims.load('fish-swim');
      // this.player.anims.play('fish-swim');

      // start game button at beginning
      let startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "start-game-button").setDepth(1)
      startButton.setInteractive();
      startButton.on("pointerup", () => {
        console.log("lets play!")
        this.scene.start("game")
      })
    }
}