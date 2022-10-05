import BaseGame from './BaseGame.js';

export default class GameStart extends BaseGame {
  constructor() {
    super('game-start');
  }

  create(data) {
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

    const loadGamePlay = () => {
      data.music.destroy();
      this.scene.start('game-play');
    };

    startButton.setDepth(1).setInteractive({ useHandCursor: true });
    startButton.on('pointerup', () => {
      loadGamePlay();
    });

    this.scene.scene.input.keyboard.on('keyup', () => {
      loadGamePlay();
    });
  }
}
