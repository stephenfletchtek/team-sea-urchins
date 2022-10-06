export default class PlayerController {
  constructor(scene) {
    this.scene = scene;
    this.deadBand = 100; // central band on screen won't move the player
    this.movePlayer = { x: '', y: '' };
    this.wasUD = false;
    this.wasXY = false;
    this.wasClicked = false;
    this.velocity;
    this.noCollision = true;
  }
  
  playerVelX() {
    if (this.movePlayer.x == "left" && this.player.x > this.leftLim) {
      return -(this.velocity);
    } else if (this.movePlayer.x == "right" && this.player.x < this.rightLim && this.noCollision) {
      return this.velocity;
    } else {
      return 0;
    }
  }

  playerVelY() {
    if (this.movePlayer.y == "down") {
      return this.velocity;
    } else if (this.movePlayer.y == "up") {
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
