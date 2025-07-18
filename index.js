const GRAVITY_DEFAULT = 500; //default gravity settings
const GRAVITY_QUAGSIRE = 900;
const GRAVITY_WATER = 0;
class MenuScene extends Phaser.Scene { //the menu
    cursor;
    keys;
    constructor() { //super() inherits all the characteristics of the Phaser 'scene' class
        super({ key: 'MainMenu' });
    }
    preload() {
        this.load.image("quagball", "assets/quagball.png");
        this.load.image('quagsireLoadScreen', 'assets/quagsireStartGame.png')
        this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/WooperBall.png'); //they don't actually look like stars in 'real life' 
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('portal', 'assets/Nether-Portal.png');
        this.load.image('bubble', 'assets/bubble.png');
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 }); //sets the height of sprite
        this.load.spritesheet('quagsire', 'assets/quagsirespritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('sleepingWooper', 'assets/toBeContinuedWooperImage.png')
        //use a sprite sheet for easier animations--with a sprite you download not just one image but a bunch of images all in one file that it can switch in between
    }
    create() {
        this.keys = this.input.keyboard.addKeys("SPACE,")
        this.add.image(550, 500, 'quagsireLoadScreen')
        this.add.text(250, 500, "WOOPER GAME", { fontSize: '92px', fill: '#FFF' })
        this.add.text(380, 620, "Press Space To Start", { fontSize: '32px', fill: '#FFF' })
        this.add.text(150, 940, "Instructions are at the bottom of the page if you need help :)", { fontSize: '20px', fill: '#FFF' })
        // this.input.once('pointerup', function () { this.scene.start("LevelOne") }, this);

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
            frames: this.anims.generateFrameNumbers('quagsire', { start: 3, end: 4 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'quagRight',
            frames: this.anims.generateFrameNumbers('quagsire', { start: 1, end: 2 }),
            frameRate: 4,
            repeat: -1
        })
        this.anims.create({
            key: 'quagStill',
            frames: [{ key: 'quagsire', frame: 0, }],
            frameRate: 20,
        })
    }
    update() {
        if (this.keys.SPACE.isDown) {
            this.scene.start("LevelOne");
        }
    }
}

class ToBeContinued extends Phaser.Scene {
    constructor() { //super() inherits all the characteristics of the Phaser 'scene' class
        super({ key: 'ToBeContinued' });
    }
    preload() {
    }
    create() {
        this.add.image(450, 400, 'sleepingWooper').setScale(1.5)
        this.add.text(250, 300, "Z", { fontSize: '32px', fill: '#FFF' })
        this.add.text(300, 250, "Z", { fontSize: '26px', fill: '#FFF' })
        this.add.text(350, 200, "Z", { fontSize: '22px', fill: '#FFF' })
        this.add.text(250, 630, "Wooper is sleeping...", { fontSize: '42px', fill: '#FFF' })
        this.add.text(250, 720, "Come back later for future updates.", { fontSize: '22px', fill: '#FFF' })
        // this.input.once('pointerup', function() {this.scene.start("LevelOne")}, this); need to figure out how to get all the stars to reset again
        this.cameras.main.fadeIn(2000, 0, 0, 0)
    }

}
class QuagBallIntro extends Phaser.Scene {
    constructor() {
        super({ key: 'QuagBallIntro' });
    }
    preload() {
    }
    create() {
        this.keys = this.input.keyboard.addKeys("SPACE,")
        this.add.image(150, 600, 'quagball')
        this.add.text(100, 300, "You have unlocked the quagsire ball!", { fontSize: '32px', fill: '#FFF' })
        this.add.text(200, 400, "Press P to toggle into Quagsire/Wooper mode,", { fontSize: '32px', fill: '#FFF' })
        this.add.text(350, 500, "You need quagsire to swim!", { fontSize: '32px', fill: '#FFF' })
        this.add.text(430, 600, "Press Space to Close", { fontSize: '26px', fill: '#FFF' })

        // this.input.once('pointerup', function () { this.scene.start("LevelThree") }, this);
        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }
    update() {
        if (this.keys.SPACE.isDown) {
            this.scene.start("LevelThree");
        }
    }
}
class Level extends Phaser.Scene {
    player; //cannot use const for these because will need to change them later
    stars;
    floatingStars;
    bombs;
    platforms;
    movingPlatforms;
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
    wasODownLastFrame = false;
    waters;
    constructor(key, level) {
        super({ key: key });
        this.level = level;
    }
    init(data) {
        this.quagsire = data.quagsire ?? false;
    }
    preload() { }
    collectStar(player, star) {
        star.disableBody(true, true); //the star no longer has a 'physical body'
        //  Add and update the score
        // this.score += 10;
        // this.scoreText.setText('Score: ' + this.score);
        // console.log(this.score)
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
        this.scene.start(portal.destination, { quagsire: this.quagsire });
    }
    waterFrame = 0;
    enterWater(_player, water) {
        this.isInWater = true;
        if (this.waterFrame == 0) {
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
        this.movingPlatforms = this.physics.add.group();
        for (let movingPlatformData of this.level.movingPlatforms){
            let movingPlatform = this.movingPlatforms.create(movingPlatformData.x, movingPlatformData.y, 'ground')
                .setTint(movingPlatformData.tint ?? 0xffffff)
                .setScale(movingPlatformData.scaleX ?? 1, movingPlatformData.scaleY ?? 1)
                movingPlatform.movementType = movingPlatformData.movementType;
                movingPlatform.moveX = movingPlatformData.moveX;
                movingPlatform.moveY = movingPlatformData.moveY;
                movingPlatform.speed = movingPlatformData.speed;
                if (movingPlatform.movementType === 'circular'){
                    movingPlatform.radius = movingPlatformData.radius
                    movingPlatform.angle = movingPlatformData.angle
                    movingPlatform.startingAngle = movingPlatform.startingAngle
                }
                movingPlatform.setImmovable(true)
                movingPlatform.body.allowGravity = false;
                console.log('Created  movingPlatform at:', movingPlatform.x, movingPlatform.y);
        }
        //  Our emitter 
        this.waterEmitter = this.add.particles('bubble', {
            x: 5,
            y: 40,
            lifespan: 1000,
            scaleX: 0.1,
            scaleY: 0.1,
            speed: { min: 10, max: 100 },
            angle: { min: 260, max: 280 },
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
            {
                start: 0.1,
                end: 0,
                ease: '{Power2}'
            },
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
        this.portals = this.physics.add.staticGroup();
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
        this.scoreText = this.add.text(600, 300, 'score: 0', { fontSize: '28px', fill: '#FFF' });
        //all the cameras
        this.cameras.cameras[0].startFollow(this.player)

        //  Collide the player and the stars with the platforms--since collision code is so hard to write we can just use phaser's built in systems
        this.physics.add.collider(this.player, this.platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(this.stars, this.platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.portals, this.platforms);
        this.physics.add.collider(this.floatingStars, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatforms);
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
        if (this.quagsire) {
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
            if (this.quagsire == true) {
                this.player.setVelocityX(this.isInWater ? -130 : -80);
                // console.log("Trying to play quagsire_left");
                this.player.anims.play('quagLeft', true);
            }
            else {
                this.player.anims.play('left', true);
                this.player.setVelocityX(this.isInWater ? -100 : -160);
            }
        }
        else if (this.keys.D.isDown || this.cursors.right.isDown) {
            if (this.quagsire == true) {
                this.player.setVelocityX(this.isInWater ? 130 : 80);
                // console.log("Trying to play quagsire_right");
                this.player.anims.play('quagRight', true)
            }
            else {
                this.player.anims.play('right', true);
                this.player.setVelocityX(this.isInWater ? 100 : 160);
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
        if (!["LevelOne", "LevelTwo"].includes(this.scene.key)) {
            if (this.keys.P.isDown && !this.wasPDownLastFrame) {
                this.quagsire = !this.quagsire;
                if (this.quagsire) {
                    this.player.setTexture('quagsire');
                } else {
                    this.player.setTexture('dude')
                }
            }
            this.wasPDownLastFrame = this.keys.P.isDown;
        }
        if (
            (this.keys.W.isDown || this.keys.SPACE.isDown || this.cursors.up.isDown) && (
                (this.isInWater || this.player.body.touching.down)
            )
        ) { //checks if you can jump--the space/w key has to be pushed and the player body has to be touching
            this.player.setVelocityY(this.isInWater ? -100 : -430);
            // this.scene.start('testScene'); -- a tester code, in this if the player jumps it moves you to another scene called Test Scene
        }
        let activeFloatingStars = this.floatingStars.countActive(true);
        let activeStars = this.stars.countActive(true);
        // console.log(activeFloatingStars + activeStars)
        if (this.stars.countActive(true) == 0 && this.floatingStars.countActive(true) == 0 && !this.portalSpawned) {
            this.spawnPortal();
            this.portalSpawned = true;
        }
        this.scoreText.setText("x: " + Math.floor(this.player.x) + " y: " + Math.floor(this.player.y))
        // if ((activeStars + activeFloatingStars) > 0) {
        //     this.scoreText.setText("WoopBalls Remaining: " + (activeStars + activeFloatingStars))
        // }
        // else {
        //     this.scoreText.setText("Find the portal!")
        // }
        this.scoreText.x = this.player.x + 100;
        this.scoreText.y = this.player.y - 200;

        if (this.isInWater) {
            if (this.keys.S.isDown || this.cursors.down.isDown && this.quagsire == true) {
                this.player.setVelocityY(100);
            }
            if (this.quagsire == false) {
                this.player.setVelocityY(0)
            }
            if (!([this.keys.W, this.keys.S, this.cursors.up, this.cursors.down, this.keys.SPACE].some(key => key.isDown)) && this.quagsire == true) {

                this.player.setVelocityY(Math.min(this.player.body.velocity.y + 10, 50))
            }
            if (!([this.keys.A, this.keys.D, this.cursors.left, this.cursors.right].some(key => key.isDown))) {
                let priorX = this.player.body.velocity.x;
                // on a graph x position is the y axis and t for time as x axis. x is a value for t. math.sin takes that value of time going up first value (relative frequency) is the thing making the graph go horizontal, vertical is magnitude(scales how big the peaks are) by default the tops and bottoms of peaks are -1 
                let freq = 1 // number of cycles per second
                let magnitude = 15 // +- maximum x velocity
                this.player.setVelocityX(priorX + Math.sin(this.time.now * Math.PI * 2 / 1000 * freq) * magnitude)
            }
        }
        this.movingPlatforms.children.iterate(movingPlatform => {
            if (movingPlatform.movementType === 'pingpong'){
                if (movingPlatform.originX === undefined){
                    movingPlatform.originX = movingPlatform.x
                    movingPlatform.originY = movingPlatform.y
                }
                if (movingPlatform.directionX === undefined){
                    movingPlatform.directionX = 1
                }
                let platformOriginX = movingPlatform.originX;
                let platformMovementX = movingPlatform.moveX;
                let platformMovementSpeed = movingPlatform.speed;
                if (movingPlatform.x >= (platformOriginX + platformMovementX)){
                    movingPlatform.directionX = -1; // move left
                }
                else if (movingPlatform.x <= platformOriginX){
                    movingPlatform.directionX = 1; // move right
                }
                movingPlatform.setVelocityX(platformMovementSpeed * movingPlatform.directionX);
            }
            else if (movingPlatform.movementType === 'circular'){
                let spawnX = movingPlatform.x;
                let spawnY = movingPlatform.y;
                let radius = movingPlatform.radius;
                let startingAngle = movingPlatform.angle ?? 0;
                if (typeof movingPlatform.orbitAngle !== 'number') {
                    movingPlatform.orbitAngle = movingPlatform.startingAngle ?? 0;
                }
                let originX = movingPlatform.originX ?? movingPlatform.x;
                let originY = movingPlatform.originY ?? movingPlatform.y;
                let centerX = spawnX - movingPlatform.radius * Math.cos(movingPlatform.orbitAngle);
                let centerY = spawnY - movingPlatform.radius * Math.sin(movingPlatform.orbitAngle);
               
                movingPlatform.centerX = centerX;
                movingPlatform.centerY = centerY;
                console.log('Creating circular tween for platform:', {
                    x: movingPlatform.x,
                    y: movingPlatform.y,
                    radius: movingPlatform.radius,
                    centerX: movingPlatform.centerX,
                    centerY: movingPlatform.centerY,
                    orbitAngle: movingPlatform.orbitAngle
                  });
                this.tweens.add({
                    targets: movingPlatform,
                    orbitAngle: movingPlatform.orbitAngle + 2 * Math.PI,
                    duration: 1 / movingPlatform.speed * 1000, // calculate duration from speed
                    repeat: -1,
                    onUpdate: () => {
                        movingPlatform.x = centerX + movingPlatform.radius * Math.cos(movingPlatform.orbitAngle);
                        movingPlatform.y = centerY + movingPlatform.radius * Math.sin(movingPlatform.orbitAngle);
                    }
                });
            }
            else if (movingPlatform.movementType==='updown'){
                if (movingPlatform.originY === undefined){
                    movingPlatform.originX = movingPlatform.x
                    movingPlatform.originY = movingPlatform.y
                }
                if (movingPlatform.directionY === undefined){
                    movingPlatform.directionY = 1
                }
                let platformOriginY = movingPlatform.originY;
                let platformMovementY = movingPlatform.moveY;
                let platformMovementSpeed = movingPlatform.speed;
                if (movingPlatform.y >= (platformOriginY + platformMovementY)){
                    movingPlatform.directionY = -1; // move left
                }
                else if (movingPlatform.y <= platformOriginY){
                    movingPlatform.directionY = 1; // move right
                }
                movingPlatform.setVelocityY(platformMovementSpeed * movingPlatform.directionY);
            }

        })

        this.isInWater = false;
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
    scene: [MenuScene, ToBeContinued, QuagBallIntro, new Level('LevelOne', levels.LevelOne), new Level('LevelTwo', levels.LevelTwo), new Level('LevelThree', levels.LevelThree), new Level('LevelFour', levels.LevelFour), new Level('LevelFive', levels.LevelFive)]
};


const game = new Phaser.Game(config);

