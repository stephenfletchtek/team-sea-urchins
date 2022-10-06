import Handling from './components/Handling.js';
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
  plugins: {
    global: [
      // make the Player global to all scenes (and other plugins)
      // key is plugin key, plugin is class, start true/false if there
      // is a start method to run, mapping is the name tagged of this
      // to access the plugin class
      { key: 'handling', plugin: Handling, mapping: 'handling', start: true },
    ],
  },
  physics: {
    default: 'matter',
    fps: 5,
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
