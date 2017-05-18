// GLOBALS

var BLOCK_WIDTH = 101,
    BLOCK_HEIGHT = 83,
    MAX_ENEMIES = 3;
    // LIST_OF_ENEMY = [1,2,3];

// Enemies our player must avoid
var Enemy = function(row, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.col = -1; // will be -1 => Off canvas
    this.row = row;
    this.x = this.col * BLOCK_WIDTH;
    this.y = this.row * BLOCK_HEIGHT;
    this.speed = speed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, player) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!player.hidding) {
      this.x += this.speed * dt;
      if (this.x > ctx.canvas.width) {
        this.x = -1;
      }
    }

    // Handle collisions with the player
    if( Math.abs(this.x - player.x) < BLOCK_WIDTH &&
        Math.abs(this.y - player.y) < BLOCK_HEIGHT) {
          player.reset();
    }

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

  // if sequences makes sure player
  // don't go off canvas
  if (this.col < 0 ) {
    this.col = 0;
  }

  if (this.col > 4 ) {
    this.col = 4;
  }

  if (this.row > 5 ) {
    this.row = 5;
  }

  // When player hits water reset() is called
  if (this.row === 0) {
    this.hide();
    setTimeout(this.reset.bind(this), 3000);
    createEnemies();
  }

  this.x = this.col * BLOCK_WIDTH;
  this.y = this.row * BLOCK_HEIGHT;
};

Player.prototype.hide = function() {
  this.hidding = true;
  this.row = -10;
  this.col = -10;
}

Player.prototype.reset = function() {
  this.hidding = false;
  this.col = 2;
  this.row = 5;
  this.update();
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y - 20);
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

var createEnemies = function() {

  allEnemies = [];

  for (i = 0; i < MAX_ENEMIES; i++) {
    var row = Math.floor(Math.random() * 3) + 1;
    var speed = 20 + Math.floor(Math.random() * 50);
    allEnemies.push(new Enemy(row, speed));
  }
};

createEnemies();

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
