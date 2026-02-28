import { trials } from './testCoords.js'
const GRAVITY_DEFAULT = 500;
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
    constructor() {
        super({ key: 'testScene' });
    }

    preload() {
        this.load.image('ground', 'assets/platform.png');
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('star', 'assets/WooperBall.png'); //they don't actually look like stars in 'real life' 
        this.load.image('bomb', 'assets/bomb.png');
    }
    collectStar(star) {
        star.disableBody(true, true); //the star no longer has a 'physical body'
    }
    collectFloatingStar(floatingStar) {
        floatingStar.disableBody(true, true);
        this.score += 10;
    }
    create() {
        this.keys = this.input.keyboard.addKeys('W,A,S,D,Q,P,O,V,SPACE');
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
        this.player = this.physics.add.sprite(100, 450, 'dude')
        this.enemy = this.physics.add.sprite(200,450, 'dude').setTint(0x0000FF)
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
        // Update logic here
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