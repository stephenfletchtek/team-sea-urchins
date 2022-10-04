import PreStart from './scenes/preStart.js';
import GameStart from './scenes/GameStart.js';
import GamePlay from './scenes/GamePlay.js';
import GameOver from './scenes/GameOver.js';

const config = {
  type: Phaser.CANVAS,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game',
    width: 1920,
    height: 1080,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
    },
  },
  audio: {
    disabledWebAudio: false,
  },
  scene: [PreStart, GameStart, GamePlay, GameOver],
};

export default new Phaser.Game(config);
PreStart;
