import { trials } from './testCoords.js'
import EnemyAI from './enemy.js'
const GRAVITY_DEFAULT = 380;
const GRAVITY_QUAGSIRE = 500
class testScene extends Phaser.Scene {
    player; //cannot use const for these because will need to change them later
    stars;
    floatingStars;
    bombs;
    platforms;
    movingPlatforms;
    cursors;
    score = 0;
    keys;
    cursors; 
    constructor() {
        super({ key: 'testScene' });
    }

    preload() {
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('quagsire', 'assets/quagsirespritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('star', 'assets/WooperBall.png'); //they don't actually look like stars in 'real life' 
        this.load.image('bomb', 'assets/bomb.png');
    }
    collectStar(player, star) {
        star.disableBody(true, true); //the star no longer has a 'physical body'
    }
    collectFloatingStar(player, floatingStar) {
        floatingStar.disableBody(true, true);
        this.score += 10;
    }
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,Q,P,O,V,SPACE');
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.enemy = this.physics.add.sprite(200,450, 'dude').setTint(0x0000FF)
        this.enemyAI = new EnemyAI(this, this.enemy);
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
        this.stars = this.physics.add.group();
        for (let starData of trials.stars) {
            this.stars.create(starData.x, starData.y, 'star')
                .setBounceY(Phaser.Math.FloatBetween(0.2, 0.6))
                // .setImmovable(!starData.gravity ?? false)
                .setScale(0.05, 0.05);
        }
        this.floatingStars = this.physics.add.group();
        for (let fStarData of trials.floatingStars){
            this.floatingStars.create(fStarData.x, fStarData.y, 'star')
            .setScale(0.05,0.05)
        }
        this.platforms = this.physics.add.staticGroup();
        for (let platformData of trials.platforms){
            this.platforms.create(platformData.x, platformData.y, 'ground')
            .setScale(platformData.scaleX ?? 1, platformData.scaleY ?? 1)
                .setTint(platformData.tint ?? 0xffffff)
                .refreshBody();
        }
        this.movingPlatforms = this.physics.add.group();
        this.physics.add.collider(this.player, this.platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(this.stars, this.platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
        // this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.floatingStars, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatforms);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.movingPlatforms)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.floatingStars, this.collectFloatingStar, null, this)
        this.physics.add.overlap(this.enemy, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.enemy, this.floatingStars, this.collectFloatingStar, null, this)
    }

    update() {
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
        if ((this.keys.W.isDown || this.keys.SPACE.isDown || this.cursors.up.isDown) && ((this.isInWater || this.player.body.touching.down))) { 
            this.player.setVelocityY(this.isInWater ? -100 : -280);
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
        this.movingPlatforms.children.iterate(movingPlatform => {
            if (movingPlatform.movementType === 'pingpong') {
                // console.log('PINGPONG UPDATE RUNNING for', movingPlatform.x, movingPlatform.y);

                // store spawn position instead of using originX
                if (movingPlatform.spawnX === undefined) {
                    movingPlatform.spawnX = movingPlatform.x;
                    movingPlatform.spawnY = movingPlatform.y;
                }
                console.log(movingPlatform.spawnX);

                if (movingPlatform.directionX === undefined) {
                    movingPlatform.directionX = 1;
                }

                let platformOriginX = movingPlatform.spawnX;
                let platformMovementX = movingPlatform.moveX;
                let platformMovementSpeed = movingPlatform.speed;

                if (movingPlatform.x >= (platformOriginX + platformMovementX)) {
                    movingPlatform.directionX = -1; // move left
                }
                else if (movingPlatform.x <= platformOriginX) {
                    movingPlatform.directionX = 1; // move right
                }

                movingPlatform.setVelocityX(platformMovementSpeed * movingPlatform.directionX);
            }
            else if (movingPlatform.movementType === 'circular') {
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
                this.tweens.add({
                    targets: movingPlatform,
                    orbitAngle: movingPlatform.orbitAngle + 2 * Math.PI,
                    duration: 1 / movingPlatform.speed * 1000, // calculate duration from speed
                    repeat: -1, //makes it loop
                    onUpdate: () => { //this is what actually moves it 
                        movingPlatform.x = centerX + movingPlatform.radius * Math.cos(movingPlatform.orbitAngle);
                        movingPlatform.y = centerY + movingPlatform.radius * Math.sin(movingPlatform.orbitAngle);
                    }
                });
            }
            else if (movingPlatform.movementType === 'updown') {
                if (movingPlatform.originY === undefined) {
                    movingPlatform.originX = movingPlatform.x
                    movingPlatform.originY = movingPlatform.y
                }
                if (movingPlatform.directionY === undefined) {
                    movingPlatform.directionY = 1
                }
                let platformOriginY = movingPlatform.originY;
                let platformMovementY = movingPlatform.moveY;
                let platformMovementSpeed = movingPlatform.speed;
                if (movingPlatform.y >= (platformOriginY + platformMovementY)) {
                    movingPlatform.directionY = -1; // move up
                }
                else if (movingPlatform.y <= platformOriginY) {
                    movingPlatform.directionY = 1; // move down
                }
                movingPlatform.setVelocityY(platformMovementSpeed * movingPlatform.directionY);
            }
        })
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1100,
    height: 1100,
    parent: 'game',
    physics: {
        default: 'arcade', 
        arcade: {
            gravity: { y: GRAVITY_DEFAULT }, 
            debug: false
        }
    },
    scene: testScene,
};

const game = new Phaser.Game(config);