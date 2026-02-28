const GRAVITY_DEFAULT = 500
    let player, stars, floatingStars, platforms, keys, enemies, bullets;
function preload() {
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('dude', 'assets/wooperspritesheet1a.png', { frameWidth: 32, frameHeight: 32 }); //sets the height of sprite

}
function create() {
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

}
function update() {

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
            debug: false,
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);