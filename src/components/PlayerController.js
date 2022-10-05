export default class PlayerController {
  constructor(scene) {
    this.scene = scene
    this.velocity = 25; // player velocity
    this.deadBand = 20; // swipe 'dead band' ie a small movement is not a swipe
    this.movePlayer = { x: '', y: '' };
    this.wasUD = false;
    this.wasXY = false;
    this.wasClicked = false
  }
  
  playerVelX() {
  // limits to stop player going off screen left and right
  const leftLim = this.player.width * this.scene.scale / 2 + 20;
  const rightLim = this.scene.cameras.main.width - leftLim;

    if (this.movePlayer.x == "left" && this.player.x > leftLim) {
      return -(this.velocity);
    } else if (this.movePlayer.x == "right" && this.player.x < rightLim) {
      return this.velocity;
    } else {
      return 0;
    }
  }

  playerVelY() {
    // limits to stop player going off screen up and down
    const upperLim = this.player.height * this.scene.scale / 2;
    const lowerLim = this.scene.cameras.main.height - upperLim;

    if (this.movePlayer.y == "down" && this.player.y < lowerLim) {
      return this.velocity;
    } else if (this.movePlayer.y == "up" && this.player.y > upperLim) {
      return -(this.velocity);
    } else {
      return 0;
    }
  }

  swipeControl(pointer) {
    if (pointer.isDown) {
      this.wasClicked = true
      this.#verticalSwipe(pointer)
      this.#horizontalSwipe(pointer)
    } else if (this.wasClicked == true) {
      this.wasClicked = false
      this.movePlayer = { x: '', y: '' }
    } 
  }

  cursorControl(cursors) {
    this.#verticalCursor(cursors)
    this.#horizontalCursor(cursors)
  }

  #verticalSwipe(pointer) {
    if ((pointer.y - this.centreY) > this.deadBand) {
      this.movePlayer.y = 'down'
    } else if ((this.centreY - pointer.y) > this.deadBand) {
        this.movePlayer.y = 'up'
    } else {
      this.movePlayer.y = ''
    }
  }

  #horizontalSwipe(pointer) {
    if ((this.centreX - pointer.x) > this.deadBand) {
      this.movePlayer.x = 'left'
    } else if ((pointer.x - this.centreX) > this.deadBand) {
      this.movePlayer.x = 'right'
    } else {
      this.movePlayer.x = ''
    }
  }

  #verticalCursor(cursors) {
    if (cursors.down.isDown) {
      this.wasUD = true;
      this.movePlayer.y = 'down'
    } else if (cursors.up.isDown) {
      this.wasUD = true;
      this.movePlayer.y = 'up'
    } else if (this.wasUD == true) {
      this.wasUD = false
      this.movePlayer.y = ''
    }
  }

  #horizontalCursor(cursors) {
    if (cursors.left.isDown) {
      this.wasXY = true;
      this.movePlayer.x = 'left'
    } else if (cursors.right.isDown) {
      this.wasXY = true;
      this.movePlayer.x = 'right'
    } else if (this.wasXY == true) {
      this.wasXY = false;
      this.movePlayer.x = ''
    }
  }
}
