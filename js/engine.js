/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 * 此文件提供游戏循环功能(更新实体和呈现)，在屏幕上绘制初始游戏板，
 * 然后调用您的播放器和敌人对象(在您的app . js中定义)的更新和呈现方法。
 * 游戏引擎通过不断地绘制整个游戏屏幕来工作，有点像你小时候创建的flipbook。
 * 当你的玩家在屏幕上移动时，可能看起来只是图像/人物在移动或被吸引，但事实并非如此。
 * 真正发生的是整个“场景”被一遍一遍的绘制，呈现出动画的错觉。
 * 这个引擎可以通过引擎变量在全球范围内使用，它还可以使canvas的上下文(ctx)对象在全球范围内使用，
 * 从而使编写应用程序更加简单。
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     * 预先定义我们将在这个范围内使用的变量，创建画布元素，
     * 获取画布元素高度/宽度的2D上下文，并将其添加到DOM中。
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     * 该函数作为游戏循环的启动点，并正确地调用更新和呈现方法。
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         * 如果你的游戏需要流畅的动画，就需要得到我们的时间增量信息。
         * 因为每个人的计算机处理指令的速度不同，我们需要一个恒定的值，
         * 对每个人来说都是一样的(不管他们的电脑有多快)——hurray time !
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         * 调用我们的更新/呈现函数，将时间增量传递到我们的更新函数，因为它可能被用于平滑动画。
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         * 设置我们的lastTime变量，用于确定下次调用该函数时的时间增量。
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         * 使用浏览器的requestAnimationFrame函数，
         * 一旦浏览器能够绘制另一个帧，就可以再次调用该函数。
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     * 这个函数执行一些初始设置，应该只发生一次，特别是设置游戏循环所需的lastTime变量。
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     * 这个函数由main(我们的游戏循环)调用，它自己调用所有可能需要更新实体数据的函数。
     * 基于如何实现您的冲突检测(当两个实体占用相同的空间，
     * 例如当您的角色应该死亡时)，您可能会发现需要在这里添加一个额外的函数调用。
     * 现在，我们已经把它注释掉了——您可能或者不希望以这种方式实现这个功能
     * (您可以在您的app . js文件中实现对实体本身的冲突检测)。
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    function checkCollisions() {
        var px = player.x * 101;
        var py = player.y * height - 30;
        allEnemies.forEach(function(enemy) {
            var ex = enemy.x * width;
            var ey = enemy.y * height + insect_height;

            if (px - ex > -33 && px - ex < 33 && Math.abs(py - ey) < 15) {
                player.y = 4; //4,5
                player.x = 3;
            } //[0,4)
        });
    }
    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     * 这是由update函数调用的，它会遍历所有在app. js中定义的所有对象中的所有对象，
     * 并调用它们的update()方法。
     * 然后，它将为您的播放器对象调用update函数。
     * 这些更新方法应该只关注于更新与对象相关的数据/属性。用你的渲染方法绘制草图。
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update(allEnemies);
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     * 该函数最初绘制“游戏级别”，然后调用renderEntities函数。
     * 记住，这个函数被称为每个游戏的滴答(或游戏引擎的循环)，
     * 因为这是游戏的工作原理——它们是创建动画幻象的flipbooks，
     * 但实际上它们只是一遍又一遍地绘制整个屏幕。
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         * 该数组将相对URL保存在游戏级别的特定行中使用的图像。
         */
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         * 循环通过我们上面定义的行和列的数量，使用rowImages数组，为“网格”的那部分绘制正确的图像
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 * 画布的上下文元素的drawImage函数需要3个参数:图像绘制、x坐标开始绘制和y坐标开始绘制。
                 * 我们使用我们的资源助手来引用我们的图像，这样我们就能得到缓存这些图像的好处，
                 * 因为我们已经反复使用它们了。
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     *这个函数由渲染函数调用，并在每个游戏的滴答声中调用。
     它的目的是调用您定义在您的敌人和应用程序内的玩家实体的呈现函数
    */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         * 循环通过我们上面定义的行和列的数量，使用rowImages数组，
         * 为“网格”的那部分绘制正确的图像
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     * 这个功能什么也做不了，但它可能是一个处理游戏重置状态的好地方——可能是一个新的游戏菜单，
     * 或者是一个屏幕上的游戏。它只被init()方法调用一次。
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     * 继续加载所有的图像我们知道我们将需要绘制我们的游戏级别。
     * 然后将init作为回调方法，这样当所有这些映像加载适当时，我们的游戏就会启动。
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        "images/char-horn-girl.png"
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     * 将画布的上下文对象分配给全局变量(在浏览器中运行的窗口对象)，
     * 这样开发人员就可以更容易地在其应用程序. js文件中使用它。
     */
    global.ctx = ctx;
})(this);