const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
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

const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create () {
    this.add.image(400,300, 'sky');
    this.add.image(400,300, 'star');

    platforms = this.physics.add.staticGroup() //these groups are not affected by gravity 

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');

    platforms.create(50, 250, 'ground');

    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100,450,'dude') //creates a sprite called player positioned at 100 * 450 pixels 
    //it is part of the physics group meaning that it will follow all the follow the rules set in the physics
    //a sprite sheet vs an image: sprite sheets have animation frames, they are not just one image. 

    player.setBounce(0.2);
    //makes it bounce every time it lands from a jump
    player.setCollideWorldBounds(true);
    //will collide with the world boundaries, i.e if I set the perimeter to be 800*600 the sprite would not be able to exit this region

    this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        repeat: -1,
    })
    //this tells it to use the animations--it uses the variants of the sprite that are facing left. 
    //it will use values from 0 -3 (4 images) and runs at 10 frames per second, repeat -1 makes it loop.

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1,
    })
    //up to this point in the code, since the platforms are static if you were to run the code, you would only
    //fall through the platform. This is because the collision values only work for dynamic things-and since
    //the platforms are set to a static property, you have to test for collisions with that as well. 

    this.physics.add.collider(player,platforms);
    //a collider object is created-and it monitors two objects within the physics group
    //takes parameters of the player and all items within platforms(static). It runs collision against all Group Members
    //so now if I jump onto a platform it will actually be stable!

    stars = this.physics.add.group({
        key: 'star', //give the same star texture
        repeat: 11, //creates 12 children- it automatically already creates 1, so repeating it 11 times would make 11 more
        setXY: {x:12, y:0, stepX: 70},  //first child is placed at (12,0), the next one is 70 pixels at (82,0), ect to space them out
    })

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); //gives them bounce- but if you run it like this the stars would fall straight through the bottom of the screen 
    
    });
    this.physics.add.collider(stars, platforms); //checks to make sure that stars will collide with platforms
    this.physics.add.overlap(player, stars, collectStar, null, this);//makes sure player doesn't overlap with star

    function collectStar (player, star){ //if a player is touching a star, it calls the function collectStar which makes it disappear, losing its 'body'
          star.disableBody(true, true);
    }
    cursors = cursors.this.input.keyboard.createCursorKeys(); //due to phasers built in stuff, you dont have to figure out how to add an event listener
}

function update () {
    if (cursors.left.isDown){ //if the left key is being held down, it applies a negative horizontal velocity and starts the left running animation
        player.setVelocityX(-160);
        player.anims.play('left',true);
    }
    else if (cursors.right.isDown){ //does the same thing as above but with the right direction.
        player.setVelocityX(160);
        player.anims.play('right', true);
    }

    else {
        player.setVelocity(0);
        player.anims.play('turn')
    }
    if (cursors.up.isDown && player.body.touching.down){ //tests the ability to jump. if player is touching ground and cursor up is activated, then it will jump.
        player.setVelocityY(-330)
    }

}

