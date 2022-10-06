export default class Collision {
  constructor(scene) {
    this.scene = scene;
  }

  createCollision() {
    this.hasHit = false;
    this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      if (this.#fishNShark(bodyA, bodyB)) {
        // this.scene.cameras.main.shake(1000).on('complete', () => {
        this.scene.music.stop();
        this.scene.gameSpeed = 10;
        this.scene.scene.start('game-over', { score: this.scene.score.score });
        // });
      }

      if (this.#fishNWorms(bodyA, bodyB) && this.hasHit == false) {
        this.scene.score.score += 1000;
        if (this.scene.plugins.plugins[0].plugin.fishGravity < 20) {
          this.scene.plugins.plugins[0].plugin.fishGravity += 5;
        }
        this.hasHit = true;
        this.#kill(this.scene.powerups.worms);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            this.hasHit = false;
          },
        });
      }

      if (this.#fishNBubbles(bodyA, bodyB) && this.hasHit == false) {
        this.scene.score.score += 1000;
        if (this.scene.plugins.plugins[0].plugin.fishGravity > -20) {
          this.scene.plugins.plugins[0].plugin.fishGravity -= 5;
        }
        this.hasHit = true;
        this.#kill(this.scene.powerups.bubbles);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            this.hasHit = false;
          },
        });
      }

      if (this.#fishNStephen(bodyA, bodyB) && this.hasHit == false) {
        if (this.scene.plugins.plugins[0].plugin.fishSpeed < 20) {
          this.scene.plugins.plugins[0].plugin.fishSpeed += 0.5;
        }
        this.hasHit = true;
        this.#kill(this.scene.powerups.octopusStephen);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            this.hasHit = false;
          },
        });
        this.scene.time.addEvent({
          delay: 5000,
          callback: () => {
            this.scene.plugins.plugins[0].plugin.fishSpeed = 1;
          },
        });
      }
    });
  }

  #kill(group) {
    group.getChildren().forEach((powerUp) => {
      group.killAndHide(powerUp);
    });
  }

  #fishNStephen(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'octopusStephen') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'octopusStephen')
    );
  }

  #fishNBubbles(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'bubbles') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'bubbles')
    );
  }

  #fishNShark(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'shark') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'shark')
    );
  }

  #fishNWorms(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'worm') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'worm')
    );
  }
}
