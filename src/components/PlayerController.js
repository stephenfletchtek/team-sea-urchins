export default class PlayerController {
  constructor(scene) {
    this.scene = scene
    this.velocity = 25; // player velocity
    this.deadBand = 10; // swipe 'dead band' ie a small movement is not a swipe
  }

  playerVelY() {
    // limits to stop player going off screen
    const upperLim = this.player.height * this.scene.scale / 2;
    const lowerLim = this.scene.cameras.main.height - upperLim;

    if (this.movePlayer == "down" && this.player.y < lowerLim) {
      return this.velocity;
    } else if (this.movePlayer == "up" && this.player.y > upperLim) {
      return -(this.velocity);
    } else {
      this.movePlayer = null;
      return 0;
    }
  }

  swipeControl(pointer) {
    if (pointer.isDown) {
      this.wasClicked = true
      if ((pointer.downY - pointer.y) > this.deadBand) {
        return "up";
      } else if ((pointer.y - pointer.downY) > this.deadBand) {
        return "down";
      } else {
        return null;
      }
    } else if (this.wasClicked == true) {
      this.wasClicked = false;
      return null;
    } else {
      return this.movePlayer;
    } 
  }

  cursorControl(cursors){
    if (cursors.down.isDown) {
      this.wasPushed = true;
      return "down";
    } else if (cursors.up.isDown) {
      this.wasPushed = true;
      return "up";
    } else if (this.wasPushed == true) {
      this.wasPushed = false;
      return null;
    } else {
      return this.movePlayer;
    }
  }
}
