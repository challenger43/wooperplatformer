const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { //sets up the physics system
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player; //cannot use const for these
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText;

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //sets the height of sprite
    //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between
}

function create ()
{
    this.add.image(400, 300, 'sky'); //adds images to things-the preload function loads them, this thing makes it actually happen
    //when drawing images, make sure to put it in order--if I loaded the ground before the sky, the sky would cover the ground 
    //  The platforms group contains the ground and the 2 ledges
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();//static, can't move but can interact
    //makes ledges
    platforms.create(600, 400, 'ground');  //the numerical values scale the stuff
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');    //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between


    //  Player physics properties.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // animates player walking left/right
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


    cursors = this.input.keyboard.createCursorKeys();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group(); //adds another item to the group of physics

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms--since collision code is so hard to write we can just use phaser's built in systems
    this.physics.add.collider(player, platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
    this.physics.add.collider(stars, platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if it does it will call the collectStar function
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }
//controls the movement, since phaser has built in stuff no need to bother with all the event listeners 
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160); 

        player.anims.play('right', true);
    }
    else
    {//if no key is being pressed the sprite will face forward
        player.setVelocityX(0);

        player.anims.play('turn');
    }
//checks if you can jump--the up arrow has to be pushed and the player body has to be touching
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330); //change this to whatever speed you want
    }
}

function collectStar (player, star)
{
    star.disableBody(true, true); //the star no longer has a 'physical body'

    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (stars.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;

    }
}

function hitBomb (player, bomb)
{
    this.physics.pause(); //stops the physics mechanism

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true; //boolean value 
}

