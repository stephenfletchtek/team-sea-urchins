export default class Collision {
  constructor(scene) {
    this.scene = scene;
  }

  createCollision() {
    this.scene.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
      if (this.#fishNShark(bodyA, bodyB)){
        // this.scene.cameras.main.shake(1000).on('complete', () => {
          this.scene.music.stop();        
          this.scene.scene.start('game-over', { score: this.scene.score.score });
        // });
      }

      if (this.#fishNworms(bodyA, bodyB)) {
        const wormGroup = this.scene.powerups.worms
        wormGroup.getChildren().forEach(worm => {
          
        })

        console.log('worms!')
      }
    });
  }

  #fishNShark(bodyA, bodyB){
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'shark') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'shark')
    )
  }

  #fishNworms(bodyA, bodyB){
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'worm') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'worm')
    )
  }

}
