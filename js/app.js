// Enemies our player must avoid
//我们的玩家必须避免敌人
var width = 101;
var insect_height = 64;
var height = 83;
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //应用于我们每个实例的变量到这里，我们为您提供了一个为我们的敌人开始的图像/精灵，
    //这个使用我们提供的帮助轻松载入图像的助手
    this.sprite = 'images/enemy-bug.png';
    this.speed = parseInt(400 * Math.random() + 100);
    this.y = Math.round(Math.random() * 2 + 0); //[1,3]
    this.x = -1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
//更新敌人的位置，需要游戏参数的方法:dt，节拍之间的时间
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //你应该将任何运动乘以dt参数，这将确保游戏以相同的速度运行所有的计算机。
    this.x = this.speed * dt / width + this.x;
    if (this.x >= 5) {
        this.x = -1;
        this.y = Math.round(Math.random() * 2 + 0);
    }
};

// Draw the enemy on the screen, required method for game
//在屏幕上画敌人，需要游戏的方法
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * width, this.y * height + insect_height);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//现在编写您自己的player类，这个类需要一个update()、render()和handleInput()方法。
var player = function() {
    this.sprite = 'images/char-horn-girl.png';
    this.y = 4; //4,5
    this.x = 3; //[0,4]
};

player.prototype.update = function() {

};
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * height - 30);
}
player.prototype.handleInput = function(key) {
        switch (key) {
            case 'left':
                if (this.x > 0) this.x--;
                break;
            case "right":
                if (this.x < 4) this.x++;
                break;
            case "down":
                if (this.y < 5) this.y++;
                break;
            case "up":
                if (this.y > 1) this.y--;
                else this.y = 4;
                break;
        }
    }
    // Now instantiate your objects.
    // Place all enemy objects in an array called allEnemies
    // Place the player object in a variable called player
    //实例化对象。将所有的敌人对象放置在一个名为“all敌人”的数组中，
    //将玩家对象放在一个名为player的变量中
var allEnemies = [];
for (var i = 0; i <= 2; i++) {
    allEnemies.push(new Enemy());
}

var player = new player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
//这将侦听按键并将键发送到您的player . handleinput()方法。您不需要修改它。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});