// GLOBALS

var BLOCK_WIDTH = 101,
    BLOCK_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  // Set player to initial position
  this.reset();
};

Player.prototype.update = function(dt) {    
  this.x = this.col * BLOCK_WIDTH;
  this.y = this.row * BLOCK_HEIGHT;
};

Player.prototype.reset = function() {
  this.col = 2;
  this.row = 5;
  this.update();
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.col--
      // console.log("key left");
      break;
    case 'right':
      this.col++
      // console.log("key right");
      break;
    case 'down':
      this.row++
      // console.log("key down");
      break;
    case 'up':
      this.row--
      // console.log("key up");
      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
