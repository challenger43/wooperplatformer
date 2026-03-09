import { trials } from './testCoords.js'
import EnemyAI from './enemy.js'
const GRAVITY_DEFAULT = 700;
const GRAVITY_QUAGSIRE = 500
class testScene extends Phaser.Scene {
    player;
    enemy;
    stars;
    bombs;
    platforms;
    movingPlatforms;
    cursors;
    score = 0;
    keys;
    cursors;
    playerCoordText;
    constructor() {
        super({ key: 'testScene' });
    }

    preload() {
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('quagsire', 'assets/quagsirespritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('star', 'assets/WooperBall.png'); //they don't actually look like stars in 'real life' 
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('grumpig', 'assets/grumpigsprite.png', { frameWidth: 32, frameHeight: 32 })
    }
    collectStar(player, star) {
        star.disableBody(true, true); //the star no longer has a 'physical body'
        star.collected = true
    } 
    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys('W,A,S,D,Q,P,O,V,SPACE');
        this.playerCoordText = this.add.text(600, 300, 'score: 0', { fontSize: '16px', fill: '#FFF' });
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
        this.anims.create({
            key: 'grumpigFaceForward',
            frames: [{ key: 'grumpig', frame: 0 }],
            frameRate: 20
        })
        this.anims.create({
            key: 'grumpigPowerUp',
            frames: this.anims.generateFrameNumbers('grumpig', { start: 1, end: 2 }),
            repeat: 5, //total plays 1(auto) + 5 = 6 times
            frameRate: 25
        })
        this.anims.create({
            key: 'grumpigFade',
            frames: this.anims.generateFrameNumbers('grumpig', { start: 3, end: 33 }),
            repeat: 0, //plays once, is default
            frameRate: 70
        })
        this.anims.create({
            key: 'grumpigForward',
            frames: this.anims.generateFrameNumbers('grumpig', { start: 34, end: 35 }),
            repeat: -1,
            frameRate: 12
        })
        //need to add grumpig backwards now.....
        for (let enemyData of trials.enemy) {
            this.enemy = this.physics.add.sprite(enemyData.x, enemyData.y, 'dude')
                .setTint(enemyData.tint)
        }
        for (let playerData of trials.player) {
            this.player = this.physics.add.sprite(playerData.x, playerData.y, 'dude')
        }
        this.enemyAI = new EnemyAI(this, this.enemy);
        this.enemyAI.create()
        this.stars = this.physics.add.group();
        for (let starData of trials.stars) {
            let star = this.stars.create(starData.x, starData.y, 'star')
                // .setBounceY(Phaser.Math.FloatBetween(0.1, 0.4))
                // .setImmovable(!starData.gravity ?? false)
                .setScale(0.05, 0.05);
            star.floating = starData.floating
            star.collected = starData.collected
            if (star.floating == true) {
                star.body.setGravity(0, 0)
                star.body.allowGravity = false
            }
        }
        this.platforms = this.physics.add.staticGroup();
        for (let platformData of trials.platforms) {
            this.platforms.create(platformData.x, platformData.y, 'ground')
                .setScale(platformData.scaleX ?? 1, platformData.scaleY ?? 1)
                .setTint(platformData.tint ?? 0xffffff)
                .refreshBody();
        }
        this.movingPlatforms = this.physics.add.group();
        this.physics.add.collider(this.player, this.platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(this.stars, this.platforms);//parameters are stars and platforms, so adds a collide rule to the relationship between stars and platforms 
        // this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatforms);
        this.physics.add.collider(this.enemy, this.platforms);
        this.physics.add.collider(this.enemy, this.movingPlatforms)
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.enemy, this.stars, this.collectStar, null, this);
    }
    update() {
        this.enemyAI.update()
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
            // this.floatingStars.children.iterate((star) => this.collectFloatingStar(this.player, star));
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
        this.playerCoordText.setText("x: " + Math.floor(this.player.x) + " y: " + Math.floor(this.player.y))
        this.playerCoordText.x = this.player.x - 60;
        this.playerCoordText.y = this.player.y - 50;
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
            debug: true
        }
    },
    scene: testScene,
};

const game = new Phaser.Game(config);