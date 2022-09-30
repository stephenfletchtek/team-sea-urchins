import GamePlay from './scenes/GamePlay.js';
import GameOver from './scenes/GameOver.js';

const config = {
  type: Phaser.AUTO,
  parent: "game",
  width: 1920,
  height: 1080,
  physics: {
    default: "matter",
    matter: {
      debug: true
    }
  },

  // scene: [GamePlay, GameOver]
  scene: {
    init: GamePlay.prototype.initScene,
    preload: GamePlay.prototype.preloadScene,
    create: GamePlay.prototype.createScene,
    update: GamePlay.prototype.updateScene
  }
};

export default new Phaser.Game(config);