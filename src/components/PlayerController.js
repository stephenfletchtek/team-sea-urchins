export default class PlayerController {
  constructor(scene) {
    this.scene = scene
    this.velocity = 25; // player velocity
    this.deadBand = 10; // swipe 'dead band' ie a small movement is not a swipe
  }
  
  playerVelX() {
  // limits to stop player going off screen left and right
  const leftLim = this.player.width * this.scene.scale / 2 + 20;
  const rightLim = this.scene.cameras.main.width - leftLim;

    if (this.movePlayer == "left" && this.player.x > leftLim) {
      return -(this.velocity);
    } else if (this.movePlayer == "right" && this.player.x < rightLim) {
      return this.velocity;
    } else {
      return 0;
    }
  }

  playerVelY() {
    // limits to stop player going off screen up and down
    const upperLim = this.player.height * this.scene.scale / 2;
    const lowerLim = this.scene.cameras.main.height - upperLim;

    if (this.movePlayer == "down" && this.player.y < lowerLim) {
      return this.velocity;
    } else if (this.movePlayer == "up" && this.player.y > upperLim) {
      return -(this.velocity);
    } else {
      return 0;
    }
  }

  swipeControl(pointer) {
    if (pointer.isDown) {
      this.wasClicked = true
      console.log(pointer.x - pointer.downX)
      if ((pointer.downY - pointer.y) > this.deadBand) {
        return "up";
      } else if ((pointer.y - pointer.downY) > this.deadBand) {
        return "down";
      } else if ((pointer.downX < pointer.x)) {
        console.log('left')
        return "left";
      } else if ((pointer.x > pointer.downX)) {
        return "right";
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
    } else if (cursors.left.isDown) {
      this.wasPushed = true;
      return "left"
    } else if (cursors.right.isDown) {
      this.wasPushed = true;
      return "right"
    } else if (this.wasPushed == true) {
      this.wasPushed = false;
      return null;
    } else {
      return this.movePlayer;
    }
  }
}
