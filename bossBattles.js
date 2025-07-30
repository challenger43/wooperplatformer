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
        // if (portal.boss && this.bossBattles[portal.boss]) {
        //     levelDataToPass = this.bossBattles[portal.boss];
        //     sceneToStart = portal.boss
        //     console.log('boss: ', portal.boss)
        // } else if (portal.destination && this.bossBattles[portal.destination]) {
        //     levelDataToPass = this.bossBattles[portal.destination];
        //     sceneToStart = portal.destination
        //     console.log('destination: ', portal.destination)
        // }
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
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.cameras.cameras[0].startFollow(this.player)
        this.keys = this.input.keyboard.addKeys("W,A,S,D,P,O,SPACE,")
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
    constructor() {
        super('GrumpigBoss');
        this.playerSpeedMultiplier = 0.8;
        this.playerJumpMultiplier = 0.8;
        this.jumpSensorsActive = false
    }
    preload() {
        super.preload()
        this.load.spritesheet('grumpig', 'assets/grumpigsprite.png', { frameWidth: 32, frameHeight: 32 })
        console.log("[PRELOAD] Attempting to load grumpig from 'assets/grumpigsprite.png'")
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
        this.grumpig = this.physics.add.sprite(150, 400, 'grumpig').setScale(2)
        console.log('[DEBUG] grumpig texture exists:', this.textures.exists('grumpig'));
        this.sensor = this.physics.add.sprite(190, 400, 'grumpig').setScale(2).setAlpha(0.6)
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
            frameRate: 20
        })
        this.anims.create({
            key: 'grumpigFade',
            frames: this.anims.generateFrameNumbers('grumpig', { start: 3, end: 33 }),
            repeat: 0, //plays once, is default
            frameRate: 50
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
        let deltaX = Math.abs(this.grumpig.x - this.grumpigPrevX)
        this.grumpig.isStandingStill = false
        if (this.sensor.body.touching.down) {
            this.sensor.setVelocityX(80)
            this.grumpig.setVelocityX(80)

            this.grumpig.anims.play('grumpigForward', true);

            this.grumpig.isStandingStill = false
            console.log(this.grumpig.isStandingStill)
            this.grumpig.isJumping = false
        }
        if (!this.sensor.body.touching.down && !this.grumpig.isJumping) {
            this.grumpig.setVelocityX(0);
            this.sensor.setVelocityX(0)
            this.sensor.y = this.grumpig.y
            console.log('[ANIM] Attempting to play grumpigFaceForward');
            this.grumpig.anims.play('grumpigFaceForward', true);
            console.log("played")

        }
        if (deltaX < 1) {//means is stuck 
            this.grumpig.isStandingStill = true
            this.grumpigStillTime += delta;
            if (this.grumpigStillTime >= 3000 && !this.hasSpawnedJumpSensors && !this.jumpSensorsActive) {
                console.log("Grumpig has been stuck for 3 seconds!");
                this.createJumpSensors();
                this.jumpSensorsActive = true
                console.log("jumpsensors spawning")
                if (this.grumpig.body.touching.down) {
                    this.grumpig.isJumping = true
                }
            }
        } else {
            this.grumpigStillTime = 0
            this.jumpSensorsActive = false
        }
        this.grumpigPrevX = this.grumpig.x
    }
    createJumpSensors() {
        console.log("createjumpsensors called")
        this.jumpSensorResults = [];
        for (let i = 0; i < 10; i++) {
            let offsetX = Phaser.Math.Between(0, 300);
            let spawnX = this.grumpig.x + offsetX;
            let spawnY = this.grumpig.y - 800;
            let clone = this.physics.add.sprite(spawnX, spawnY, 'grumpig')
                .setAlpha(0.3)
                .setScale(1.5)
            clone.isJumping = false
            clone.hasLanded = false
            this.physics.add.overlap(clone, this.platforms, () => {
                if (!clone.hasLanded) {  // only trigger once
                    clone.hasLanded = true;
                    clone.isJumping = false;
                    console.log(clone.hasLanded + " tester2 (overlap triggered)");
                }
            });
            this.jumpSensors.add(clone)
        }
    }
    updateJumpSensors() {
        let landedClone = null
        if (!this.jumpSensorsActive || this.jumpSensors.getLength() === 0) return;
        this.jumpSensors.children.iterate(clone => {
            // console.log(`Clone at x=${clone.x}, y=${clone.y}, targetOffsetX=${clone.targetOffsetX}`); 
            if (clone.hasLanded && !landedClone) {
                landedClone = clone; // Take the first clone that landed as safe spot
                console.log(`Clone landed at x=${clone.x}, y=${clone.y}`);
                console.log(`Grumpig will teleport to x=${landedClone.x}`);
                this.grumpig.anims.play('grumpigPowerUp', true);
                this.time.delayedCall(500, () => {
                    this.grumpig.anims.play('grumpigFade', true);
                  });
                this.time.delayedCall(2000, ()=> {
                    this.grumpig.setPosition(landedClone.x, landedClone.y - this.grumpig.height / 2);
                })
                this.time.delayedCall(2500, () => {
                    this.playAnimationBackwards(this.grumpig, 'grumpigFade');
                })

                this.grumpig.isJumping = true;
                this.grumpigStillTime = 0;

            }
        })
        if (landedClone) {
            // Clear clones since jump is now decided
            this.jumpSensors.clear(true, true);
            this.jumpSensorResults = [];
            return
        }
        if (!landedClone) { //no clone landed
            let allDone = true
            this.jumpSensors.children.iterate(clone => {
                if (!clone.hasLanded && !clone.isJumping) {
                    allDone = false
                }
            })
            if (allDone) {
                console.log("All clones finished jumping but no safe landing found. Increasing jumpInterval and retrying.");
                // have failed
                this.jumpSensors.clear(true, true)
                this.jumpSensorResults = [];
                this.createJumpSensors();
            }
        }
    }
    update(time, delta) {
        super.update(time, delta)
        this.speedMultiplier = this.playerSpeedMultiplier || 1;
        this.jumpMultiplier = this.playerJumpMultiplier || 1
        this.moveGrumpig(delta)
        this.updateJumpSensors();
    }

}
// console.log('bossBattles loaded', bossBattles);

window.GrumpigBoss = GrumpigBoss;