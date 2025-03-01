


// class TestScene extends Phaser.Scene a tester scene, may use later
// {
//     constructor ()
//     {
//         super({ key: 'testScene' });
//     }
// }
class MenuScene extends Phaser.Scene{
    constructor()
    {
        super({ key: 'MainMenu' });
    }
    create(){
        this.scene.start("LevelOne");
    }
    update(){
        // this.input.on('keydown', ()=>{
        // })
    }
}

class Level extends Phaser.Scene {
    player; //cannot use const for these because will need to change them later
    stars;
    floatingStars;
    bombs;
    platforms;
    portal;
    cursors;
    score = 0;
    gameOver = false;
    scoreText;
    keys;
    portalSpawned = false;
    level;
    constructor(key, level)
    {
        super({ key: key });
        this.level = level;
    }
    preload() {

        this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'WooperBall.png'); //they don't actually look like stars in 'real life' 
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('portal', 'Nether-Portal.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 }); //sets the height of sprite
        //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between
    }
    collectStar(player, star) {
        star.disableBody(true, true); //the star no longer has a 'physical body'
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        console.log(this.score)
    }
    
    
    collectFloatingStar(player, floatingStar){
        floatingStar.disableBody(true,true);
        this.score += 10;
    }

    spawnPortal(){
            
        console.log('portal spawned')
        this.portal.enableBody(false,0,0,true,true);
        //false tells them we don't want to change position, 0,0 are coords, true true is invisible and active. 
    }

    enterPortal(){
        console.log("portal entered ")
        this.scene.start("LevelTwo");
    }

    create() {

        this.keys = this.input.keyboard.addKeys("W,A,S,D,Q,SPACE,")

        //an object is a collection of properties and values--properties are like labels
        let sky = this.add.image(400, 300, 'sky'); //adds images to things-the preload function loads them, this thing makes it actually happen
        //when drawing images, make sure to put it in order--if I loaded the ground before the sky, the sky would cover the ground 
        //  The platforms group contains the ground and the 2 ledges
        this.platforms = this.physics.add.staticGroup();
        // add platforms
        for (let platformData of this.level.platforms){
            this.platforms.create(platformData.x, platformData.y, 'ground')
                .setScale(platformData.scaleX ?? 1, platformData.scaleY ?? 1)
                .setTint(platformData.tint ?? 0xffffff)
                .refreshBody();
        }
        this.portal = this.physics.add.sprite(50,450, 'portal').setScale(0.3, 0.3);
        this.portal.disableBody(true,true);

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');    //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between


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


        this.cursors = this.input.keyboard.createCursorKeys();
        this.stars = this.physics.add.group();
        for (let starData of this.level.stars){
            this.stars.create(starData.x, starData.y, 'star')
                .setBounceY(Phaser.Math.FloatBetween(0.2,0.6))
                // .setImmovable(!starData.gravity ?? false)
                .setScale(0.05,0.05);
        }
       
        this.floatingStars = this.physics.add.group();
        for (let floatingStarData of this.level.floatingStars){
            this.floatingStars.create(floatingStarData.x, floatingStarData.y, 'star')
    
        }
    
        this.bombs = this.physics.add.group(); //adds another item to the group of physics

        //  The score
        this.scoreText = this.add.text(600, 300, 'score: 0', { fontSize: '32px', fill: '#FFF' });

        //all the cameras!
        this.cameras.cameras[0].startFollow(this.player)
        this.cameras.cameras[0].ignore(this.scoreText); //manually ignores the scoreText Variable, so it doesn't move, only for camera 0
        this.cameras.add(1); //makes another camera, camera 1
        this.cameras.cameras[1].ignore(this.player); //camera 1 ignores player, platforms.getChildre(the get children part gets all the platform variants as well)
        this.cameras.cameras[1].ignore(this.platforms.getChildren());
        this.cameras.cameras[1].ignore(this.stars.getChildren());
        this.cameras.cameras[1].ignore(this.floatingStars.getChildren());
        this.cameras.cameras[1].ignore(sky); //we had to make a sky a variable. 
        this.cameras.cameras[1].ignore(this.portal);
        
        // this.cameras.main.roundPixels = true; //should in theory make the graphics a lil better 

        //  Collide the player and the stars with the platforms--since collision code is so hard to write we can just use phaser's built in systems
        this.physics.add.collider(this.player, this.platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(this.stars, this.platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.portal, this.platforms);


        
    
        // function hitBomb(player, bomb) {
        //     this.physics.pause(); //stops the physics mechanism
    
        //     player.setTint(0xff0000);
    
        //     player.anims.play('turn');
    
        //     gameOver = true; //boolean value 
        // }
        //  Checks to see if the player overlaps with any of the stars, if it does it will call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.floatingStars, this.collectFloatingStar, null, this)
        this.physics.add.overlap(this.player, this.portal, this.enterPortal, null, this)
        // this.physics.add.collider(player, bombs, hitBomb, null, this); //don't need this code cause no bomb
        
    }

    update() {
        if (this.gameOver) {
            return;
        }
        if (this.keys.Q.isDown){
            this.stars.children.iterate( (star) => this.collectStar(this.player,star));
            this.floatingStars.children.iterate( (star) => this.collectFloatingStar(this.player,star));
        }
        if (this.keys.A.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.keys.D.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else { //if no key is pressed, will face forwards
            this.player.setVelocityX(0)
            this.player.anims.play('turn');
        }

        if ((this.keys.W.isDown || this.keys.SPACE.isDown) && this.player.body.touching.down) { //checks if you can jump--the space/w key has to be pushed and the player body has to be touching
            this.player.setVelocityY(-330);
            // this.scene.start('testScene'); -- a tester code, in this if the player jumps it moves you to another scene called Test Scene
        }

        if (this.stars.countActive(true) == 0 && this.floatingStars.countActive(true) == 0 && !this.portalSpawned){
            this.spawnPortal();
            this.portalSpawned = true;
        }

        this.scoreText.setText("x: " + Math.floor(this.player.x)  + " y: " + Math.floor(this.player.y))

    }

    

}

const levels = {
    LevelOne: {
        platforms: [
            {
                x: 1000,
                y: 568,
                scaleX: 2,
                scaleY: 2
            },
            {
                x: 400,
                y: 568,
                scaleX: 2,
                scaleY: 2
            },
            {
                x: 750,
                y: 220,
            },
            {
                x: 200,
                y: 250,
                scaleX: 0.5,
                scaleY: 1
            },
            {
                x: 1400,
                y: 340,
            },
            {
                x: 450,
                y: 400,
            },
            
            {
                x: 1100,
                y: 450,
            },
            
            {
                x: 450,
                y: 100,
                scaleX: 0.1,
            },
            
            {
                x: 1500,
                y: 568,
                scaleX: 2,
                scaleY: 2,
            },
            
            {
                x: -20,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529
            },
            {
                x: 1910,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529
            },
        ],
        stars: [
             // stars.create(30,0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(206, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(449, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(372, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(688, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(738, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(1516, 0, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);
        // stars.create(1116, 512, 'star').setBounceY(Phaser.Math.FloatBetween(0.2,0.6)).setScale(0.05,0.05);

            {
                x: 30,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            
            },
            {
                x: 449,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 372,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 206,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 738,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 1516,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 1116,
                y: 512,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x:688,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            }

        ],
        floatingStars: [
            {
                x: 100,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,
                allowGravity: false,
            }
            //  this.floatingStars.create(100, 290, 'star').setScale(0.05,0.05);
            // this.floatingStars.create(460, 200, 'star').setScale(0.05,0.05);
            // this.floatingStars.create(326, 50, 'star').setScale(0.05,0.05);
            // this.floatingStars.create(787, 290, 'star').setScale(0.05,0.05);
            // this.floatingStars.create(1728, 180, 'star').setScale(0.05,0.05);
            

        ],

        portals: [
            {

            }
        ]
    },
    LevelTwo: {
        platforms: [
            {
                x: 1000,
                y: 568,
                scaleX: 2,
                scaleY: 2
            },
            {
                x: 400,
                y: 568,
                scaleX: 2,
                scaleY: 2
            },
            {
                x: 1500,
                y: 568,
                scaleX: 2,
                scaleY: 2,
            },
            {
                x: 454,
                y: 280,
                scaleX: 0.5,
            },
            {
                x: 254,
                y: 380,
                scaleX: 0.5,
            },
            {
                x: 268,
                y: 100,
                scaleX: 0.5,
            }, 
            {
                x: 813,
                y: 280,
                scaleX: 0.1,
            },//need to spawn star at this coord
        ],
        stars: [
            {
                x: 813,
                y: 250,
                scaleX: 0.05,
                scaleY: 0.05,
            }
        ]

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
    scene:[MenuScene, new Level('LevelOne', levels.LevelOne), new Level('LevelTwo', levels.LevelTwo)]
};


const game = new Phaser.Game(config);

