import BaseGame from './BaseGame.js';

export default class PreStart extends BaseGame {
  constructor() {
    super('pre-start');
    this.music;
  }

  create() {
    // music
    this.music = this.sound.add('startGameMusic', { loop: true });

    if (!this.sound.locked) {
      // already unlocked so play
      this.music.play();
    } else {
      // wait for 'unlocked' to fire and then play
      this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        this.music.play();
      });
    }

    // display Title button
    const preGameButton = this.add
      .image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'pre-game-button')
      .setScale(0.5)
      .setInteractive();

    // animate title button
    let throb = this.tweens.add({
      targets: preGameButton,
      scale: 2,
      yoyo: true,
      repeat: -1,
      duration: 800,
      ease: 'sine',
    });

    preGameButton.on('pointerup', () => {
      // button fadeout triggers scene change
      let tween = this.tweens.add(
        {
          targets: preGameButton,
          alpha: 0,
          duration: 500,
          ease: 'Power2',
        },
        this,
      );
      tween.on('complete', () => {
        console.log('load StartGame scene');
        this.scene.start('game-start', { music: this.music });
      });
    });
  }
}
