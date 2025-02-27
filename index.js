let player; //cannot use const for these
let stars;
let bombs;
let platforms;
let cursors;
let score = 0;
let gameOver = false;
let scoreText;
let keys;

// class TestScene extends Phaser.Scene a tester scene, may use later
// {
//     constructor ()
//     {
//         super({ key: 'testScene' });
//     }
// }

class LevelOne extends Phaser.Scene {
 
    constructor ()
    {
        super({ key: 'LevelOne' });
    }
    preload() {

        this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'WooperBall.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //sets the height of sprite
        //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between
    }
    create() {
        keys = this.input.keyboard.addKeys("W,A,S,D,SPACE,")

        //an object is a collection of properties and values--properties are like labels

        let sky = this.add.image(400, 300, 'sky'); //adds images to things-the preload function loads them, this thing makes it actually happen
        //when drawing images, make sure to put it in order--if I loaded the ground before the sky, the sky would cover the ground 
        //  The platforms group contains the ground and the 2 ledges
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();//static, can't move but can interact
        platforms.create(1000, 568, 'ground').setScale(2).refreshBody();
        platforms.create(200, 250, 'ground').setScale(0.5, 1).refreshBody();
        platforms.create(750, 220, 'ground');
        platforms.create(1400, 340, 'ground');
        platforms.create(450, 400, 'ground');
        platforms.create(1100, 450, 'ground');
        platforms.create(-20, 300, 'ground').setScale(0.1, 21).setTint(0x3C6529).refreshBody();
        platforms.create(450, 100, 'ground').setScale(0.1, 1).refreshBody();
        platforms.create(1500, 568, 'ground').setScale(2).refreshBody();

        // The player and its settings
        player = this.physics.add.sprite(100, 450, 'dude');    //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between


        //  Player physics properties
        // animates player walking left/right
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });


        cursors = this.input.keyboard.createCursorKeys();
        stars = this.physics.add.group();
        stars.create(30,0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(206, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(449, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(372, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(688, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(738, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(1516, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        stars.create(1116, 512, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);

        let floatingStars = this.physics.add.group({ //need to ask Mr. SF about this. 
            allowGravity: false
    });
        floatingStars.create(100, 290, 'star').setScale(0.05,0.05);
        floatingStars.create(460, 200, 'star').setScale(0.05,0.05);
        floatingStars.create(326, 50, 'star').setScale(0.05,0.05);
        floatingStars.create(787, 290, 'star').setScale(0.05,0.05);
        floatingStars.create(1728, 180, 'star').setScale(0.05,0.05);
        
        bombs = this.physics.add.group(); //adds another item to the group of physics

        //  The score
        scoreText = this.add.text(600, 300, 'score: 0', { fontSize: '32px', fill: '#FFF' });
        this.cameras.cameras[0].startFollow(player)
        this.cameras.cameras[0].ignore(scoreText); //manually ignores the scoreText Variable, so it doesn't move, only for camera 0
        this.cameras.add(1); //makes another camera, camera 1
        this.cameras.cameras[1].ignore(player); //camera 1 ignores player, platforms.getChildre(the get children part gets all the platform variants as well)
        this.cameras.cameras[1].ignore(platforms.getChildren());
        this.cameras.cameras[1].ignore(stars.getChildren());
        this.cameras.cameras[1].ignore(sky); //we had to make a sky a variable. 

        //  Collide the player and the stars with the platforms--since collision code is so hard to write we can just use phaser's built in systems
        this.physics.add.collider(player, platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(stars, platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
        this.physics.add.collider(bombs, platforms);

        function collectStar(player, star) {
            star.disableBody(true, true); //the star no longer has a 'physical body'
            //  Add and update the score
            score += 10;
            scoreText.setText('Score: ' + score);
        }


        function collectFloatingStar(player, floatingStar){
            floatingStar.disableBody(true,true);
            score += 10;
        }
    
        function hitBomb(player, bomb) {
            this.physics.pause(); //stops the physics mechanism
    
            player.setTint(0xff0000);
    
            player.anims.play('turn');
    
            gameOver = true; //boolean value 
        }
        //  Checks to see if the player overlaps with any of the stars, if it does it will call the collectStar function
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.overlap(player, floatingStars, collectFloatingStar, null, this)

        this.physics.add.collider(player, bombs, hitBomb, null, this);
    }


    update() {
        if (gameOver) {
            return;
        }
        if (keys.A.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (keys.D.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else { //if no key is pressed, will face forwards
            player.setVelocityX(0)
            player.anims.play('turn');
        }

        if ((keys.W.isDown || keys.SPACE.isDown) && player.body.touching.down) { //checks if you can jump--the space/w key has to be pushed and the player body has to be touching
            player.setVelocityY(-330);
            // this.scene.start('testScene'); -- a tester code, in this if the player jumps it moves you to another scene called Test Scene
        }

        scoreText.setText("x: " + Math.floor(player.x)  + " y: " + Math.floor(player.y))

    }


}

const config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 1100,
    parent: 'game',
    physics: { //sets up the physics system
        default: 'arcade',
        arcade: { //arcade is object
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: LevelOne
};


const game = new Phaser.Game(config);

