class BossBattle extends Phaser.Scene {
    player;
    platforms;
    movingPlatforms;
    portal;
    cursors;
    keys;
    isInWater = false;
    quagsire = false;
    waters;
    constructor(key) {
        super({ key: key })
        this.boss = null
    }
    init(data) {
        this.quagsire = data.quagsire ?? false;
        this.level = data.levelData;
    }
    preload() { //need to create grumpig sprite sheet later
        this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
        this.load.image('ground', 'assets/platform.png');
        this.load.image('portal', 'assets/Nether-Portal.png');
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('quagsire', 'assets/quagsirespritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('bubble', 'assets/bubble.png');
    }
    enterPortal(_player, portal) {
        console.log("portal entered ")

        if (portal.boss && levels[portal.boss]) {
            levelDataToPass = levels[portal.boss];
        } else if (portal.destination && levels[portal.destination]) {
            levelDataToPass = levels[portal.destination];
        }
        this.scene.start(portal.destination, { quagsire: this.quagsire }), { levelData: levels[portal.boss] };
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
        this.frameCount = 0
        this.timeAccumulator = 0
        this.player = this.physics.add.sprite(300, 400, 'dude');
        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 4 }),
        //     frameRate: 20,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [{ key: 'dude', frame: 0 }],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //     frameRate: 20,
        //     repeat: -1
        // });
        // this.anims.create({
        //     key: 'quagLeft',
        //     frames: this.anims.generateFrameNumbers('quagsire', { start: 3, end: 4 }),
        //     frameRate: 4,
        //     repeat: -1
        // })
        // this.anims.create({
        //     key: 'quagRight',
        //     frames: this.anims.generateFrameNumbers('quagsire', { start: 1, end: 2 }),
        //     frameRate: 4,
        //     repeat: -1
        // })
        // this.anims.create({
        //     key: 'quagStill',
        //     frames: [{ key: 'quagsire', frame: 0, }],
        //     frameRate: 20,
        // })
        this.keys = this.input.keyboard.addKeys("W,A,S,D,P,O,SPACE,")
        this.platforms = this.physics.add.staticGroup();
        // add platforms
        for (let platformData of this.level.platforms) {
            this.platforms.create(platformData.x, platformData.y, 'ground')
                .setScale(platformData.scaleX ?? 1, platformData.scaleY ?? 1)
                .setTint(platformData.tint ?? 0xffffff)
                .refreshBody();
        }
        this.movingPlatforms = this.physics.add.group();
        for (let movingPlatformData of this.level.movingPlatforms) {
            let movingPlatform = this.movingPlatforms.create(movingPlatformData.x, movingPlatformData.y, 'ground')
                .setTint(movingPlatformData.tint ?? 0xffffff)
                .setScale(movingPlatformData.scaleX ?? 1, movingPlatformData.scaleY ?? 1)
            movingPlatform.movementType = movingPlatformData.movementType;
            movingPlatform.moveX = movingPlatformData.moveX;
            movingPlatform.moveY = movingPlatformData.moveY;
            movingPlatform.speed = movingPlatformData.speed;
            if (movingPlatform.movementType === 'circular') {
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
            alpha: { //transparency/opacity 
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
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms); //these are the things you want to collide with--the first code takes parameters player and platforms, so then player and platforms will collide
        this.physics.add.collider(this.portals, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatforms);

        this.physics.add.overlap(this.player, this.portals, this.enterPortal, null, this)
        this.physics.add.overlap(this.player, this.waters, this.enterWater, null, this)
    }
    update(time, delta) {
        let deltaSeconds = delta / 1000
        this.frameCount++;
        this.timeAccumulator += delta;

        if (this.timeAccumulator >= 1000) {
            console.log(`FPS: ${this.frameCount}`);
            this.frameCount = 0;
            this.timeAccumulator = 0;
        }
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
            if (movingPlatform.movementType === 'pingpong') {
                if (movingPlatform.originX === undefined) {
                    movingPlatform.originX = movingPlatform.x
                    movingPlatform.originY = movingPlatform.y
                }
                if (movingPlatform.directionX === undefined) {
                    movingPlatform.directionX = 1
                }
                let platformOriginX = movingPlatform.originX;
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
                // console.log('Creating circular tween for platform:', {
                //     x: movingPlatform.x,
                //     y: movingPlatform.y,
                //     radius: movingPlatform.radius,
                //     centerX: movingPlatform.centerX,
                //     centerY: movingPlatform.centerY,
                //     orbitAngle: movingPlatform.orbitAngle
                //   }); //use for testing purposes
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
                    movingPlatform.directionY = -1; // move left
                }
                else if (movingPlatform.y <= platformOriginY) {
                    movingPlatform.directionY = 1; // move right
                }
                movingPlatform.setVelocityY(platformMovementSpeed * movingPlatform.directionY);
            }

        })

        this.isInWater = false;

    }
}
class GrumpigBoss extends BossBattle {
    constructor() {
        super('GrumpigBoss'); // pass the scene key string directly
    }
}
