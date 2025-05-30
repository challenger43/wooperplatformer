const GRAVITY_DEFAULT = 500; //default gravity settings
const GRAVITY_QUAGSIRE = 900;
const GRAVITY_WATER = 0;
class MenuScene extends Phaser.Scene { //the menu
    cursor;
    constructor() { //super() inherits all the characteristics of the Phaser 'scene' class
        super({ key: 'MainMenu' });
    }
    preload(){
        this.load.image("quagball", "assets/quagball.png");
        this.load.image('quagsireLoadScreen', 'assets/quagsireStartGame.png')
        this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/WooperBall.png'); //they don't actually look like stars in 'real life' 
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('portal', 'assets/Nether-Portal.png');
        this.load.image('bubble', 'assets/bubble.png');
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 }); //sets the height of sprite
        this.load.spritesheet('quagsire', 'assets/quagsirespritesheet.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('sleepingWooper', 'assets/toBeContinuedWooperImage.png')
        //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between
    }
    create() {
        this.add.image(550, 500, 'quagsireLoadScreen')
        this.add.text(250, 500, "WOOPER GAME", { fontSize: '92px', fill: '#FFF' })
        this.add.text(200, 620, "Click anywhere on the quagsire to start", { fontSize: '32px', fill: '#FFF' })  
        this.input.once('pointerup', function () { this.scene.start("LevelOne") }, this);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'quagLeft',
            frames: this.anims.generateFrameNumbers('quagsire', {start: 3, end: 4 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'quagRight',
            frames: this.anims.generateFrameNumbers('quagsire', {start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'quagStill',
            frames: [{key: 'quagsire', frame: 0,}],
            frameRate: 20, 
        })
    }
}

class ToBeContinued extends Phaser.Scene {
    constructor() { //super() inherits all the characteristics of the Phaser 'scene' class
        super({ key: 'ToBeContinued' });
    }
    preload(){
    }
    create(){
        this.add.image(450,400, 'sleepingWooper').setScale(1.5)
        this.add.text(250, 300, "Z", {fontSize: '32px', fill: '#FFF'} )
        this.add.text(300, 250, "Z", {fontSize: '26px', fill: '#FFF'} )
        this.add.text(350, 200, "Z", {fontSize: '22px', fill: '#FFF'} )
        this.add.text(250, 600, "Wooper is sleeping...", { fontSize: '42px', fill: '#FFF' })
        this.add.text(250, 720, "Come back later for future updates,", { fontSize: '22px', fill: '#FFF' })
        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }

}
class QuagBallIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'QuagBallIntro'});
    }
    preload(){
    }
    create(){
        this.add.image(150,600, 'quagball')
        this.add.text(100,300, "You have unlocked the quagsire ball!", {fontSize: '32px', fill: '#FFF'})
        this.add.text(200,400, "Press P/O to toggle into Quagsire mode,", {fontSize: '32px', fill: '#FFF'})
        this.add.text(300,500, "You need quagsire to swim!", {fontSize: '32px', fill: '#FFF'})
        this.add.text(430,600, "Click to close", {fontSize: '26px', fill: '#FFF'})

        this.input.once('pointerup', function () { this.scene.start("LevelThree") }, this);
        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }
}
class Level extends Phaser.Scene {
    player; //cannot use const for these because will need to change them later
    stars;
    floatingStars;
    bombs;
    platforms;
    portal;
    waterEmitter;
    cursors;
    score = 0;
    gameOver = false;
    scoreText;
    keys;
    portalSpawned = false;
    level;
    isInWater = false;
    quagsire = false;
    waters;
    constructor(key, level) {
        super({ key: key });
        this.level = level;
    }
    init(data){
        this.quagsire = data.quagsire ?? false;
    }
    preload() {

    }
    collectStar(player, star) {
        star.disableBody(true, true); //the star no longer has a 'physical body'
        //  Add and update the score
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        console.log(this.score)
    }


    collectFloatingStar(player, floatingStar) {
        floatingStar.disableBody(true, true);
        this.score += 10;
    }

    spawnPortal() {
        console.log('portal spawned')
        this.portals.children.iterate((portal) => portal.enableBody(false, 0, 0, true, true));
        //false tells them we don't want to change position, 0,0 are coords, true true is invisible and active. 
    }

    enterPortal(_player, portal) {
        console.log("portal entered ")
        this.scene.start(portal.destination, { quagsire: this.quagsire});
    }
    waterFrame = 0;
    enterWater(_player, water) {
        this.isInWater = true;
        if (this.waterFrame == 0){
        this.waterEmitter.emitParticleAt(this.player.x, this.player.y);
        }
        this.waterFrame++;
        this.waterFrame = this.waterFrame % 10;
}

    create() {
        this.keys = this.input.keyboard.addKeys("W,A,S,D,Q,P,O,SPACE,")
        //an object is a collection of properties and values--properties are like labels
        let sky = this.add.image(900, -100, 'sky').setScale(4);
        //adds images to things-the preload function loads them, this thing makes it actually happen

        //creates stars
        this.stars = this.physics.add.group();
        for (let starData of this.level.stars) {
            this.stars.create(starData.x, starData.y, 'star')
                .setBounceY(Phaser.Math.FloatBetween(0.2, 0.6))
                // .setImmovable(!starData.gravity ?? false)
                .setScale(0.05, 0.05);
        }

        //creates floating stars
        this.floatingStars = this.physics.add.group();

        for (let floatingStarData of this.level.floatingStars) {
            let floatingStar = this.floatingStars.create(floatingStarData.x, floatingStarData.y, 'star')
                .setScale(0.05, 0.05); // Set the scale of the star

            // Set gravity to zero for each floating star individually
            floatingStar.body.setGravity(0, 0);
            floatingStar.body.allowGravity = false;
        }

        //when drawing images, make sure to put it in order--if I loaded the ground before the sky, the sky would cover the ground 
        this.platforms = this.physics.add.staticGroup();
        // add platforms
        for (let platformData of this.level.platforms) {
            this.platforms.create(platformData.x, platformData.y, 'ground')
                .setScale(platformData.scaleX ?? 1, platformData.scaleY ?? 1)
                .setTint(platformData.tint ?? 0xffffff)
                .refreshBody();
        }

         //  Our emitter
         this.waterEmitter = this.add.particles('bubble', {
            x: 5,
            y: 40,
            lifespan: 1000,
            scaleX: 0.1,
            scaleY: 0.1,
            speed: { min: 10, max: 100 },
            angle: { min: 260, max: 280},
            gravityY: 300,
            scrollFactorX: 0,
            scrollFactorY: 0,
            emitting: false,
            on: false,
            alpha: {
                start: 0.4,
                end: 0,
                duration: 1000,
            },
            scale: 
                { start: 0.1, 
                  end: 0, 
                  ease: '{Power2}' },
        });

        // The player and its settings
        this.player = this.physics.add.sprite(100, 450, 'dude');    //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between
        // animates player walking left/right

          // Make water
          this.waters = this.physics.add.staticGroup();
          for (let waterData of this.level.waters) {
              this.waters.create(waterData.x, waterData.y, 'ground')
                  .setScale(waterData.scaleX ?? 1, waterData.scaleY ?? 1)
                  .setTint(waterData.tint ?? 0x0000FF)
                  .refreshBody()
                  .setAlpha(0.5);
          }

        //make portals
        this.portals = this.physics.add.staticGroup()
        for (let portalData of this.level.portals) {
            let portal = this.portals.create(portalData.x, portalData.y, 'portal')
                .setScale(0.3, 0.3)
                .setTint(portalData.tint ?? 0xffffff)
                .refreshBody();
            portal.destination = portalData.destination
            portal.disableBody(true, true);
        }


        //creates arrow keys
        this.cursors = this.input.keyboard.createCursorKeys();

        this.bombs = this.physics.add.group(); //adds another item to the group of physics

        //  The score
        this.scoreText = this.add.text(600, 300, 'score: 0', { fontSize: '32px', fill: '#FFF' });

        //all the cameras
        this.cameras.cameras[0].startFollow(this.player)

        //  Collide the player and the stars with the platforms--since collision code is so hard to write we can just use phaser's built in systems
        this.physics.add.collider(this.player, this.platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(this.stars, this.platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.portals, this.platforms);
        this.physics.add.collider(this.floatingStars, this.platforms)
        // function hitBomb(player, bomb) {
        //     this.physics.pause(); //stops the physics mechanism

        //     player.setTint(0xff0000); 

        //     player.anims.play('turn');

        //     gameOver = true; //boolean value 
        // }
        //  Checks to see if the player overlaps with any of the stars, if it does it will call the collectStar(or whatever) function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.floatingStars, this.collectFloatingStar, null, this)
        this.physics.add.overlap(this.player, this.portals, this.enterPortal, null, this)
        this.physics.add.overlap(this.player, this.waters, this.enterWater, null, this)
        // this.physics.add.collider(player, bombs, hitBomb, null, this); //don't need this code cause no bomb
        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }

    update() {
        if (this.gameOver) {
            return;
        }
        if (this.quagsire){
            this.physics.world.gravity.y = GRAVITY_QUAGSIRE;
        }
        else if (this.isInWater) {
            this.physics.world.gravity.y = GRAVITY_WATER; //when inside water, gravity is set to 250
            // this.player.setGravityY(GRAVITY_WATER);
        }
        else {
            this.physics.world.gravity.y = GRAVITY_DEFAULT;
            // this.player.setGravityY(GRAVITY_DEFAULT);
        }
        if (this.keys.Q.isDown) {
            this.stars.children.iterate((star) => this.collectStar(this.player, star));
            this.floatingStars.children.iterate((star) => this.collectFloatingStar(this.player, star));
        } // put this back in after presentation
        if (this.keys.A.isDown || this.cursors.left.isDown) {
            if (this.quagsire== true) {
                this.player.setVelocityX(this.isInWater ? -130 : -80);
                console.log("Trying to play quagsire_left");
                this.player.anims.play('quagLeft', true);
            }
            else {
                this.player.anims.play('left', true);
                this.player.setVelocityX(this.isInWater ? -100 : -160);
            }
        }
        else if (this.keys.D.isDown || this.cursors.right.isDown) {
            if (this.quagsire == true){
                this.player.setVelocityX(this.isInWater ? 130 : 80);
                console.log("Trying to play quagsire_right");
                this.player.anims.play('quagRight', true)
            }
            else {
                this.player.anims.play('right', true);
                this.player.setVelocityX(this.isInWater ? 100: 160);
            }
        }
        else { //if no key is pressed, will face forwards
            this.player.setVelocityX(0)
            if (this.quagsire == true) {
                this.player.anims.play('quagStill', true)
            }
            else {
                this.player.anims.play('turn');
            }

        }
      // && this.level.LevelOne === false && this.level.LevelTwo === false
        if (this.keys.P.isDown && this.quagsire == false) {
            this.quagsire = true;
            this.player.setTexture('quagsire');
        }
        if (this.keys.O.isDown && this.quagsire == true) {
            this.quagsire = false;
            this.player.setTexture('dude')
        }

        if (
            (this.keys.W.isDown || this.keys.SPACE.isDown || this.cursors.up.isDown) && (
                (this.isInWater || this.player.body.touching.down)
            )
        ) { //checks if you can jump--the space/w key has to be pushed and the player body has to be touching
            this.player.setVelocityY(this.isInWater ? -100 : -430);
            // this.scene.start('testScene'); -- a tester code, in this if the player jumps it moves you to another scene called Test Scene
        }

        if (this.stars.countActive(true) == 0 && this.floatingStars.countActive(true) == 0 && !this.portalSpawned) {
            this.spawnPortal();
            this.portalSpawned = true;
        }

        this.scoreText.setText("x: " + Math.floor(this.player.x) + " y: " + Math.floor(this.player.y))
        // this.scoreText.setText("Stars Remaining:" + toString(this.stars.countActive)) ----working on this later
        this.scoreText.x = this.player.x + 100;
        this.scoreText.y = this.player.y - 200;

        if (this.isInWater) {
            if (this.keys.S.isDown || this.cursors.down.isDown && this.quagsire == true) {
                this.player.setVelocityY(100);
            }
            if (this.quagsire == false) {
                this.player.setVelocityY(0)
            }
            if (!([this.keys.W, this.keys.S, this.cursors.up, this.cursors.down, this.keys.SPACE].some(key => key.isDown)) && this.quagsire ==true) {

                this.player.setVelocityY(Math.min(this.player.body.velocity.y + 10, 50))
            }
            if (!([this.keys.A, this.keys.D, this.cursors.left, this.cursors.right].some(key => key.isDown))){
                let priorX = this.player.body.velocity.x;
                // on a graph x position is the y axis and t for time as x axis. x is a value for t. math.sin takes that value of time going up first value (relative frequency) is the thing making the graph go horizontal, vertical is magnitude(scales how big the peaks are) by default the tops and bottoms of peaks are -1 
                let freq = 1 // number of cycles per second
                let magnitude = 15 // +- maximum x velocity
                this.player.setVelocityX(priorX + Math.sin(this.time.now * Math.PI * 2 / 1000 * freq) * magnitude)
            }
        }

        this.isInWater = false;

    }
}

const levels = {
    LevelOne: {
        platforms: [
            {
                x: 1000,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 400,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 750,
                y: 220,
                tint: 0x3c6529
            },
            {
                x: 200,
                y: 250,
                scaleX: 0.5,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 1400,
                y: 340,
                tint: 0x3c6529
            },
            {
                x: 450,
                y: 400,
                tint: 0x3c6529
            },

            {
                x: 1100,
                y: 450,
                tint: 0x3c6529
            },

            {
                x: 450,
                y: 100,
                scaleX: 0.1,
                tint: 0x3c6529
            },

            {
                x: 1500,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
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
        waters: [],
        stars: [

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
                x: 688,
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


            },
            {
                x: 460,
                y: 200,
                scaleX: 0.05,
                scaleY: 0.05,


            },
            {
                x: 326,
                y: 50,
                scaleX: 0.05,
                scaleY: 0.05,


            },
            {
                x: 787,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,


            },
            {
                x: 1728,
                y: 180,
                scaleX: 0.05,
                scaleY: 0.05,


            }

        ],

        portals: [
            {
                x: 50,
                y: 462,
                scaleX: 0.3,
                scaleY: 0.3,
                destination: "LevelTwo",
            },
            // { omnious testing portal 
            //     x: 550,
            //     y: 450,
            //     scaleX: 0.3,
            //     scaleY: 0.3,
            //     tint: 0xff0000,
            //     destination: "LevelThree",
            // },
        ]
    },
    LevelTwo: {
        platforms: [
            {
                x: 1000,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 400,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 1500,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 454,
                y: 280,
                scaleX: 0.5,
                tint: 0x3c6529
            },
            {
                x: 254,
                y: 380,
                scaleX: 0.5,
                tint: 0x3c6529
            },
            {
                x: 268,
                y: 100,
                scaleX: 0.5,
                tint: 0x3c6529
            },
            {
                x: 813,
                y: 280,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: 1053,
                y: 280,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: 1259,
                y: 200,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: 1047,
                y: 60,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: -20,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: -20,
                y: -350,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: 1910,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: 1910,
                y: -350,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: 1580,
                y: 200,
                scaleX: 0.05,
                tint: 0x3c6529
            },
            {
                x: 1847,
                y: 200,
                scaleX: 0.1,
                tint: 0x3c6529
            },

        ],
        waters: [],
        stars: [
            {
                x: 813,
                y: 250,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1050,
                y: 20,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1050,
                y: 240,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1285,
                y: 200,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 285,
                y: 60,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1584,
                y: 160,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1696,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 603,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 702,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            }

        ],
        floatingStars: [
            {
                x: 740,
                y: 80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 660,
                y: 80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 530,
                y: 80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 160,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 90,
                y: 250,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1432,
                y: 50,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1847,
                y: 50,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1847,
                y: 350,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1284,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,
            }
        ],
        portals: [
            {
                x: 50,
                y: 462,
                scaleX: 0.3,
                scaleY: 0.3,
                destination: "QuagBallIntro",
            },
        ]
    },
    LevelThree: {
        platforms: [{ //leftmost ground
            x: 400,
            y: 632,
            scaleX: 2,
            scaleY: 2,
            tint: 0x3c6529
        },
        { //middle ground
            x: 900,
            y: 632,
            scaleX: 2,
            scaleY: 2,
            tint: 0x3c6529
        },
        {//world bounds left 
            x: -20,
            y: 300,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds left 
            x: -20,
            y: 100,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds right 
            x: 1290,
            y: 100,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds right 
            x: 1290,
            y: 300,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds right 
            x: 1290,
            y: -100,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//the borders to the pool
            x: 180,
            y: 489,
            scaleX: 0.05,
            scaleY: 7,
            tint: 0x3c6529,
        },
        { //the borders to the pool
            x: 180,
            y: 269,
            scaleX: 0.05,
            scaleY: 7,
            tint: 0x3c6529,
        },
        {//more borders to the pool
            x:180,
            y: 100,
            scaleX: 0.05,
            scaleY: 7,
            tint: 0x3c6529,
        },
        {//ladder platform left
            x: 16,
            y: 310,
            scaleX: 0.07,
            scaleY: 0.1,
            tint: 0x3c6529,
        },
        {//ladder platform left
            x: 16,
            y: 450,
            scaleX: 0.2,
            scaleY: 0.1,
            tint: 0x3c6529,
        },
        {//ladder platform left
            x: 600,
            y: 376,
            scaleX: 0.05,
            scaleY: 7,
            tint: 0x3c6529,
        },
        {//ladder platform left
            x: 600,
            y: 576,
            scaleX: 0.05,
            scaleY: 2,
            tint: 0x3c6529,
        },
        {//ladder platform left
            x: 16,
            y: 220,
            scaleX: 0.2,
            scaleY: 0.1,
            tint: 0x3c6529,
        },
        {//ladder platform left
            x: 153,
            y: 330,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529,
        },
        {
            x: 330,
            y: 330, 
            scaleX: 0.1,
            tint: 0x3c6529,
        },
        {  //ladder platform cont.
            x: 20,
            y: 100,
            scaleX: 0.25,//change back to 0.2 when done coding
            scaleY: 0.1,
            tint: 0x3c6529
        },
        { //pool border ladder on right
            x: 636,
            y: 450,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { 
            x: 796,
            y: 300,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { 
            x: 933,
            y: 420,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529
        },
        { //right swimming pool ladder to get stars
            x: 604,
            y: 200,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right swimming pool ladder to get stars
            x: 604,
            y: 50,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //swimming pool mid platform above
            x: 410,
            y: 270,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529
        },
        { //swimming pool mid platform above
            x: 280,
            y: 120,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right border ladder bottom 
            x: 1235,
            y: 480,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529
        },
        { //right border ladder 2
            x: 1235,
            y: 400,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right border ladder 3
            x: 1235,
            y: 320,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right border ladder 4
            x: 1235,
            y: 240,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right border ladder 4
            x: 1235,
            y: 160,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right border ladder 5
            x: 1235,
            y: 80,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        { //right border ladder 6
            x: 1235,
            y: 0,
            scaleX: 0.1,
            scaleY: 0.1,
            tint: 0x3c6529

        },
        {
            x: 364,
            y: 496,
            scaleX: 0.3,
            scaleY: 0.3,
            tint: 0x3c6529
        },
        {
            x: 318,
            y: 526,
            scaleX: 0.05,
            scaleY: 1.8,
            tint: 0x3c6529
        },
        {
            x: 412,
            y: 526,
            scaleX: 0.05,
            scaleY: 1.8,
            tint: 0x3c6529
        },
        
        ],
        waters: [
            {
                x: 390,
                y: 440,
                scaleX: 1,
                scaleY: 10,
                opacity: 0.1,
            },
          ],
        stars: [
            {
                x: 16,
                y: 430,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 153,
                y: 200,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 15,
                y: 280,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 100,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 60,
                scaleX: 0.05,
                scaleY: 0.05,
            }
        ],
        floatingStars: [
            {//star in a cave
                x: 370,
                y: 530,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 292,
                y: -10,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 358,
                y: 30,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 418,
                y: 70,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 741,
                y: 400,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 821,
                y: 400,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 460,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 380,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 300,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 220,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 140,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 60,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: -20,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: -80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 254,
                y: 390,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 454,
                y: 390,
                scaleX: 0.05,
                scaleY: 0.05,
            },


        ],
        portals: [
            {
                x: 100, //1235 for original, set bac after testing
                y: 400, //-120 
                scaleX: 0.3,
                scaleY: 0.3,
                destination: "ToBeContinued",//swap out when i actually finish the next scene
            },
        ]
    },
    ToBeContinued: {
        platforms: [],
        floatingStars: [],
        stars: [],
        portals: [],
        waters: [],
        
    },
    QuagBallIntro: {
        platforms: [],
        floatingStars: [],
        stars: [],
        portals: [],
        waters: [],
    }

}


const config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 1100,
    parent: 'game',
    physics: { //sets up the physics system
        default: 'arcade',
        arcade: { //arcade is object
            gravity: { y: GRAVITY_DEFAULT },
            debug: false
        }
    },
    scene: [MenuScene, ToBeContinued, QuagBallIntro, new Level('LevelOne', levels.LevelOne), new Level('LevelTwo', levels.LevelTwo), new Level('LevelThree', levels.LevelThree), ]
};


const game = new Phaser.Game(config);

