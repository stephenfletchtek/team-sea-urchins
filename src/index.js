import StartGame from './scenes/StartGame.js'
import GamePlay from './scenes/GamePlay.js';
import GameOver from './scenes/GameOver.js';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    width: 1920,
    height: 1080,
  },
  physics: {
    default: "matter",
    matter: {
      debug: true
    }
  },

  scene: [StartGame, GamePlay, GameOver]
};

export default new Phaser.Game(config);
