import BaseGame from './BaseGame.js';

export default class PreStart extends BaseGame {
  constructor() {
    super('pre-start');
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
      .setInteractive({ useHandCursor: true });

    // animate title button
    let throb = this.tweens.add({
      targets: preGameButton,
      scale: 2,
      yoyo: true,
      repeat: -1,
      duration: 800,
      ease: 'sine',
    });

    // make fullscreen on user interaction
    // preGameButton.on(
    //   'pointerup',
    //   function () {
    //     if (this.scale.isFullscreen) {
    //       this.scale.stopFullscreen();
    //     } else {
    //       this.scale.startFullscreen();
    //     }
    //   },
    //   this,
    // );

    const loadGameStart = () => {
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
        this.scene.start('game-start', { music: this.music });
      });
    };

    // button fadeout then scene change
    preGameButton.on('pointerup', () => {
      loadGameStart();
    });

    this.scene.scene.input.keyboard.on('keyup', () => {
      loadGameStart();
    });
  }
}
