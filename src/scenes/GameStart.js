import BaseGame from './BaseGame.js';

export default class GameStart extends BaseGame {
  constructor() {
    super('game-start');
    this.music;
  }

  create(data) {
    this.music = data.music;

    // background
    this.setStaticBackground();

    this.cameras.main.fadeIn(4000);

    // start game button
    const startButton = this.add.image(
      this.game.renderer.width / 2,
      this.game.renderer.height / 2,
      'start-game-button',
    );

    this.tweens.add(
      {
        targets: startButton,
        alpha: 1,
        duration: 20000,
        ease: 'Power2',
      },
      this,
    );

    startButton.setDepth(1).setInteractive();
    startButton.on('pointerup', () => {
      this.music.destroy();
      this.scene.start('game-play');
    });
  }
}
