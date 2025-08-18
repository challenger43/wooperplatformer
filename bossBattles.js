import { levels, bossBattles, grumpigLevelData } from './levels.js';
export default class BossBattle extends Phaser.Scene {
    player;
    platforms;
    movingPlatforms;
    portal;
    cursors;
    keys;
    isInWater = false;
    quagsire = false;
    waters;
    levelDataToPass;
    constructor(sceneKey) {
        super({ key: sceneKey })
        console.log('BossBattle initialized with key:', sceneKey);
        this.boss = null
        this.bossBattles = bossBattles
        this.levels = levels
    }
    init(data) {
        // console.log('init data:', data);
        this.quagsire = data.quagsire ?? false;
        this.bossBattle = data.bossBattleData;
        console.log('this.bossBattle set to:', this.bossBattle);
    }
    preload() { //need to create grumpig sprite sheet later
        this.load.image('sky', 'assets/sky.png'); //the assets/ takes an object from a folder--in this case the folder is assets, the id is sky.png
        this.load.image('ground', 'assets/platform.png');
        this.load.image('portal', 'assets/Nether-Portal.png');
        this.load.image('finishLine', 'assets/finishLine.png')
        this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('quagsire', 'assets/quagsirespritesheet.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('bubble', 'assets/bubble.png');
        this.load.spritesheet('grumpig', 'grumpigsprite.png', { frameWidth: 32, frameHeight: 32 })
    }
    enterPortal(_player, portal) {
        console.log("portal entered ")
        let levelDataToPass = null
        let sceneToStart = null

        if (portal.boss) {
            console.log('portal.boss:', portal.boss);
        }
        if (portal.destination) {
            console.log('portal.destination:', portal.destination);
        }
        if (portal.boss && this.scene.get(portal.boss)) {
            sceneToStart = portal.boss;
            levelDataToPass = this.bossBattles[portal.boss];
            console.log('boss: ', portal.boss);
        } else if (portal.destination && this.scene.get(portal.destination)) {
            sceneToStart = portal.destination;
            levelDataToPass = this.bossBattles[portal.destination];
            console.log('destination: ', portal.destination);
        }
        if (!levelDataToPass) {
            console.log('No bossBattle data found for portal:', portal);
        }
        this.scene.start(sceneToStart, { quagsire: this.quagsire, bossBattleData: levelDataToPass });
    }
    spawnPortal() {
        console.log('portal spawned')
        this.portals.children.iterate((portal) => portal.enableBody(false, 0, 0, true, true));
        //false tells them we don't want to change position, 0,0 are coords, true true is invisible and active. 
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
        this.player = this.physics.add.sprite(100, 450, 'dude').setDepth(10);
        this.cameras.cameras[0].startFollow(this.player)
        this.keys = this.input.keyboard.addKeys("W,A,S,D,P,O,Q,G,SPACE,")
        this.cursors = this.input.keyboard.createCursorKeys();
        this.platforms = this.physics.add.staticGroup();
        // add platforms
        for (let platformData of this.bossBattle.platforms) {
            this.platforms.create(platformData.x, platformData.y, 'ground')
                .setScale(platformData.scaleX ?? 1, platformData.scaleY ?? 1)
                .setTint(platformData.tint ?? 0xffffff)
                .refreshBody();
        }
        this.movingPlatforms = this.physics.add.group();
        for (let movingPlatformData of this.bossBattle.movingPlatforms) {
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
        for (let waterData of this.bossBattle.waters) {
            this.waters.create(waterData.x, waterData.y, 'ground')
                .setScale(waterData.scaleX ?? 1, waterData.scaleY ?? 1)
                .setTint(waterData.tint ?? 0x0000FF)
                .refreshBody()
                .setAlpha(0.5);
        }
        //make portals
        this.portals = this.physics.add.staticGroup();
        console.log('portals array:', this.bossBattle.portals);
        for (let portalData of this.bossBattle.portals) {
            let portal = this.portals.create(portalData.x, portalData.y, 'portal')
                .setScale(0.3, 0.3)
                .setTint(portalData.tint ?? 0xffffff)
                .refreshBody();
            portal.destination = portalData.destination
            portal.boss = portalData.boss
            console.log(portal.destination ?? portal.boss ?? null)
            portal.disableBody(true, true);
        }
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
        let speed;
        let jumpVelocity;
        if (this.keys.A.isDown || this.cursors.left.isDown) {
            if (this.quagsire == true) {
                speed = this.isInWater ? -130 : -80
                speed *= this.speedMultiplier ?? 1  //applies a multiplier(if it doesn't have one defaults to 1)
                this.player.setVelocityX(speed);
                this.player.anims.play('quagLeft', true);
            }
            else {
                speed = this.isInWater ? -100 : -160
                speed *= this.speedMultiplier ?? 1
                this.player.setVelocityX(speed)
                this.player.anims.play('left', true);
            }
        }
        else if (this.keys.D.isDown || this.cursors.right.isDown) {
            if (this.quagsire == true) {
                speed = this.isInWater ? -130 : -80
                speed *= this.speedMultiplier ?? 1
                this.player.setVelocityX(speed);
                this.player.anims.play('quagRight', true)
            }
            else {
                speed = this.isInWater ? 100 : 160
                speed *= this.speedMultiplier ?? 1
                this.player.setVelocityX(speed)
                this.player.anims.play('right', true);
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
            jumpVelocity = this.isInWater ? -100 : -430
            jumpVelocity *= this.jumpMultiplier ?? 1
            this.player.setVelocityY(jumpVelocity);
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
                // console.log('PINGPONG UPDATE RUNNING for', movingPlatform.x, movingPlatform.y);

                // store spawn position instead of using originX
                if (movingPlatform.spawnX === undefined) {
                    movingPlatform.spawnX = movingPlatform.x;
                    movingPlatform.spawnY = movingPlatform.y;
                }

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
export class GrumpigBoss extends BossBattle {
    grumpig;
    portalSpawned = false;
    constructor() {
        super('GrumpigBoss');
        this.playerSpeedMultiplier = 1.6;
        this.playerJumpMultiplier = 0.8;
        this.jumpSensorsActive = false
        this.grumpigTeleporting = false
        this.finishLineX = 4005;
        this.raceOver = false;
        this.lastCheckpointPosition = { x: 774, y: 450 }
    }
    preload() {
        super.preload()
        this.load.audio('wompSound', 'Sounds/wompSound.mp3')
        this.load.audio('yaySound', 'Sounds/yaySound.mp3')
        this.load.image('gorge', 'assets/gorge.png')
        this.load.spritesheet('grumpig', 'assets/grumpigsprite.png', { frameWidth: 32, frameHeight: 32 })
        this.load.on('complete', () => {
            console.log("[PRELOAD] All assets finished loading.");
        });
    }
    playAnimationBackwards(sprite, animKey) { //pretty much the name, plays animation backwards
        //pass in the sprite and the animation key you want to be played backwards
        let anim = sprite.anims.animationManager.get(animKey); //get the animation by the key
        if (!anim) {
            console.error('Animation not found:', animKey);
            return;
        } //if there isn't an animation by that key then the console will show error message
        let frames = anim.frames; //get the frames array from animation
        let index = frames.length - 1; //set starting frame index to last frame (to play backwards)

        sprite.anims.stop(); //stops current animations on sprite
        sprite.setFrame(frames[index].frame.name); //set sprite's displayed frame to the last frame 

        let frameDuration = 1000 / anim.frameRate; //calculate time per frame based off framerate in milliseconds

        let timer = sprite.scene.time.addEvent({ //Create a Phaser timer event to run repeatedly at the interval of frameDuration
            delay: frameDuration,
            repeat: frames.length - 1,
            callback: () => {
                index--; //On each timer tick, move to the previous frame (index--)
                if (index >= 0) {
                    sprite.setFrame(frames[index].frame.name);
                } else { //If  reached before the first frame, remove the timer to stop the animation
                    timer.remove();
                }
            }
        });
    }
    create() {
        super.create() //super refers to parent class-- basically calling the create() method from boss battle
        if (!window.grumpigIntroShown) {
            window.grumpigIntroShown = true;
            let introText = this.add.text(
                this.cameras.main.centerX,
                this.cameras.main.centerY - 100,
                "Beat Grumpig in a race!",
                { fontSize: "48px", fill: "#ffcc00", fontStyle: "bold" }
            ).setOrigin(0.5).setScrollFactor(0).setDepth(20);
            this.tweens.add({
                targets: introText,
                alpha: 0,
                duration: 2000,
                delay: 2000,
                onComplete: () => introText.destroy()
            });
        }
        this.raceOver = false;
        this.wompSound = this.sound.add('wompSound')
        this.yaySound = this.sound.add('yaySound')
        // this.add.image(2005, 300, 'gorge').setDepth(-4)
        this.scoreText = this.add.text(600, 300, 'score: 0', { fontSize: '28px', fill: '#FFF' });
        this.add.image(4005, 236, 'finishLine').setScale(3)
        this.grumpig = this.physics.add.sprite(150, 550, 'grumpig').setScale(2).setDepth(5)
        // console.log('[DEBUG] grumpig texture exists:', this.textures.exists('grumpig'));
        this.sensor = this.physics.add.sprite(190, 400, 'grumpig').setScale(2).setAlpha(0)
        this.jumpSensors = this.physics.add.group()
        this.jumpInterval = 20
        this.hasSpawnedJumpSensors = false
        this.physics.add.collider(this.sensor, this.platforms);
        this.physics.add.collider(this.grumpig, this.platforms);
        // this.physics.add.collider(this.jumpSensors, this.platforms)
        this.grumpigReady = false;
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
        this.grumpig.setFrame(0);
    }
    moveGrumpig(delta) {
        if (this.raceOver) {
            this.grumpig.setVelocityX(0); // stop horizontal movement
            this.sensor.setVelocityX(0);  // stop sensor
            return; // skip all AI logic
        }
        let deltaX = Math.abs(this.grumpig.x - this.grumpigPrevX) //change in x value/coords for grumpig
        this.grumpig.isStandingStill = false
        if (this.grumpigTeleporting) { //if grumpig is about to teleport stop everything's x motion
            this.grumpig.setVelocityX(0);
            this.sensor.setVelocityX(0);
            return; //go back to start
        }
        if (this.sensor.body.touching.down) { //as long as sensor is touching down(meaning there is ground for grumpig to walk on, grumpig will walk)
            this.sensor.setVelocityX(205)
            this.grumpig.setVelocityX(205)
            this.grumpig.anims.play('grumpigForward', true);
            this.grumpig.isStandingStill = false
            this.grumpig.isJumping = false
        }
        if (!this.sensor.body.touching.down && !this.grumpig.isJumping) {
            this.grumpig.setVelocityX(0);
            this.sensor.setVelocityX(0)
            this.sensor.y = this.grumpig.y
            this.grumpig.anims.play('grumpigFaceForward', true); //grumpig stops moving horizontally and plays the face forward anim
        }
        if (deltaX < 1) {//means is stuck (grumpig's change in X is less than 1, and thus has barely moved)
            this.grumpig.isStandingStill = true
            this.grumpigStillTime += delta; //for every millisecond grumpig is stuck it will add 1 millisecond until it arrives at 200(which then triggers the if loop)
            if (this.grumpigStillTime >= 200 && !this.hasSpawnedJumpSensors && !this.jumpSensorsActive) { //if has been standing still for longer than 200 milliseconds
                console.log("Grumpig has been stuck for 0.2 seconds!");
                this.createJumpSensors();
                this.jumpSensorsActive = true
                console.log("jumpsensors spawning")
                if (this.grumpig.body.touching.down) {
                    this.grumpig.isJumping = true
                }
            }
        } else {
            this.grumpigStillTime = 0 //if deltaX is no longer less than 1 reset the timer
        }
        if (Math.abs(this.sensor.y - this.grumpig.y) > 100) {//if sensor gets too far below grumpig
            // console.warn('sensor was too far below Grumpig. Resetting position.');
            this.sensor.setPosition(this.grumpig.x + 40, this.grumpig.y); // offset for LH sensor
            this.sensor.setVelocity(0); // stop weird physics
        }
        this.grumpigPrevX = this.grumpig.x
    }
    createJumpSensors() {
        console.log("createjumpsensors called")
        this.jumpSensorResults = [];
        for (let i = 0; i < 10; i++) { //will create 10 jump sensors
            let offsetX = Phaser.Math.Between(60, 400); //picks a random offset to jump at 
            let spawnX = this.grumpig.x + offsetX; //where jumpsensor will appear(it will go anywhere between 60 to 300 pixels to the right of grumpig)
            let spawnY = this.grumpig.y - 300; //spawns it 300 pixels above grumpig
            let clone = this.physics.add.sprite(spawnX, spawnY, 'grumpig')
                .setAlpha(0) //0.3 when developing
                .setScale(1.5)
            clone.setVelocityY(2400)
            clone.isJumping = false
            clone.hasLanded = false
            this.physics.add.overlap(clone, this.platforms, () => {
                if (!clone.hasLanded) {  // only trigger once
                    clone.hasLanded = true; //makes sure this clone only counts as 1 
                    //(the first time a clone touches platform hasLanded is false, but once it hasLanded it will change the flag to true so the landing logic will only run once)
                    clone.isJumping = false;
                    this.jumpSensorResults.push(clone) //push the clone data into jumpSensorResults
                }
            });
            this.jumpSensors.add(clone) //adds the clone to the group of jumpSensors so can destroy them/use them all at once
        }
    }
    updateJumpSensors() {
        if (!this.jumpSensorsActive || this.jumpSensors.getLength() === 0) return; //if there aren't jump sensors active no point in calling this
        if (this.jumpSensorResults.length > 0) { //if the results array has at least 1 result
            let grumpigX = this.grumpig.x;
            let landedClone = this.jumpSensorResults.reduce((furthest, clone) => {       //reduce takes parameters accumulator and current, meaning it goes through every element in an array and compares it to the accumulator(or farthest one in our case)
                return Math.abs(clone.x - grumpigX) > Math.abs(furthest.x - grumpigX) ? clone : furthest;
                //distance from grumpig's current x to this current clone's x, then compares to distance from grumpig's current x to furthest clone's x
                //if current clone is farther from grumpig, replace it with the furthest clone, else keep the OG furthest
            }); //after this whole loop landedClone will be the furthest one from grumpig.
            console.log(`Clone landed at x=${landedClone.x}, y=${landedClone.y}`);
            console.log(`Grumpig will teleport to x=${landedClone.x}`);
            this.grumpigTeleporting = true;
            this.sensor.body.reset(this.grumpig.x + 50, this.grumpig.y); //resets the sensor(instantly move physics body+ reset velocity)
            this.grumpig.anims.play('grumpigPowerUp', true);
            this.time.delayedCall(300, () => { //wait 300 milliseconds
                this.grumpig.anims.play('grumpigFade', true);
            });
            this.time.delayedCall(600, () => {
                this.grumpig.setPosition(landedClone.x, landedClone.y - this.grumpig.height / 2);
                this.sensor.body.reset(this.grumpig.x + 50, this.grumpig.y);
            });
            this.time.delayedCall(1000, () => {
                this.playAnimationBackwards(this.grumpig, 'grumpigFade');
            });
            this.time.delayedCall(1600, () => {
                this.grumpigTeleporting = false;
                this.grumpig.isJumping = true
                this.grumpigStillTime = 0; //resets timer counting how long grumpig has been still for
            });
            this.sensor.body.reset(this.grumpig.x + 50, this.grumpig.y); //reset again for good measure
            // Clear sensors and results after teleport chosen
            this.jumpSensors.clear(true, true);  //group.clear(removeFromScene, destroyChildren);
            this.jumpSensorResults = [];
            this.jumpSensorsActive = false
            return;
        }
        // No clones landed, check if all finished jumping
        let allDone = true;
        let hadSensors = false
        this.jumpSensors.children.iterate(clone => {
            hadSensors = true;
            let outOfBounds = clone.y > 700;
            if (!clone.hasLanded && !outOfBounds && !clone.isJumping) {
                allDone = false;
            }
        });
        if (hadSensors && allDone) {
            console.log("All clones finished jumping but no safe landing found. Increasing jumpInterval and retrying.");
            this.jumpSensors.clear(true, true);
            this.jumpSensorResults = [];
            this.jumpSensorsActive = false
            this.createJumpSensors();
        }
    }

    checkRaceOutcome() {
        if (this.player.x >= this.finishLineX && this.grumpig.x < this.finishLineX) { //in case of tie wooper should win
            this.wooperWins();
        }
        else if (this.grumpig.x >= this.finishLineX && this.player.x < this.finishLineX) {
            this.grumpigWins();
        }
    }
    wooperWins() {
        console.log("wooper has won this test")
        this.raceOver = true;
        this.yaySound.play()
        let winText = this.add.text(this.player.x - 60, this.player.y - 200, 'You Win!', { fontSize: '72px', color: '#fff' })
        this.tweens.add({
            targets: winText,
            y: winText.y - 80,
            alpha: 0,
            duration: 2000,
            ease: 'Power1',
            onComplete: () => winText.destroy()
        });
        if (this.portalSpawned === false) {
            this.spawnPortal();
        }
        this.portalSpawned = true;
    }
    grumpigWins() {
        console.log("grumpig wins")
        this.wompSound.play()
        this.raceOver = true;
        let loseText = this.add.text(this.player.x - 60, this.player.y - 200, 'You Lose :(', { fontSize: '72px', color: '#ff5555', fontStyle: 'bold', })
        this.tweens.add({
            targets: loseText,
            y: loseText.y + 300,   // falls down
            alpha: 0,           // fades out
            angle: 15,          // rotates a bit while falling
            duration: 2400,
            ease: 'Power2',
            onComplete: () => loseText.destroy()
        });
        this.time.delayedCall(2900, () => { //wait 300 milliseconds
            this.cameras.main.fade(900, 0, 0, 0); // duration, red, green, blue (black fade)
        });
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.restart();
        });
        
    }
    update(time, delta) {
        super.update(time, delta)
        this.scoreText.setText("x: " + Math.floor(this.player.x) + " y: " + Math.floor(this.player.y))
        this.scoreText.x = this.player.x + 80;
        this.scoreText.y = this.player.y - 250;
        this.moveGrumpig(delta)
        this.updateJumpSensors();
        if (this.keys.Q.isDown) {
            this.player.setPosition(this.finishLineX - 100, 150);
        }
        if (this.keys.G.isDown) {
            this.grumpig.setPosition(this.finishLineX - 100, 150);
        }
        if (this.player.y > 700) {
            if (this.player.x > 2063) {
                this.lastCheckpointPosition = { x: 2064, y: 402 };
                this.player.setPosition(this.lastCheckpointPosition.x, this.lastCheckpointPosition.y)
                //fill stuff in as it goes on 
            }
            else if (this.player.x > 1680) {
                this.lastCheckpointPosition = { x: 1690, y: 430 };
                this.player.setPosition(this.lastCheckpointPosition.x, this.lastCheckpointPosition.y)
            }
            else if (this.player.x > 780) {
                this.player.setPosition(this.lastCheckpointPosition.x, this.lastCheckpointPosition.y)
            }
        }
        if (this.grumpig.y > 700) {
            if (this.grumpig.x > 2063) {
                this.lastCheckpointPosition = { x: 2064, y: 402 };
                this.grumpig.setPosition(this.lastCheckpointPosition.x, this.lastCheckpointPosition.y)
                //fill stuff in as it goes on 
            }
            else if (this.grumpig.x > 1680) {
                this.lastCheckpointPosition = { x: 1690, y: 430 };
                this.grumpig.setPosition(this.lastCheckpointPosition.x, this.lastCheckpointPosition.y)
            }
            else if (this.grumpig.x > 780) {
                this.grumpig.setPosition(this.lastCheckpointPosition.x, this.lastCheckpointPosition.y)
            }
        }
        if (!this.raceOver) {
            this.checkRaceOutcome()
        }
        this.speedMultiplier = this.playerSpeedMultiplier || 1;
        this.jumpMultiplier = this.playerJumpMultiplier || 1
    }

}

// console.log('bossBattles loaded', bossBattles);

window.GrumpigBoss = GrumpigBoss;