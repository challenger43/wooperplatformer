import { trials } from './testCoords.js'
import Navigation from './navigation.js'
export default class EnemyAI {
    keys;
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;
        this.targetStar = null;
    }
    init(data){
        this.navigation = data.navigation
        this.nodes = data.navigation.nodes
    }
    create() {
        this.keys = this.scene.input.keyboard.addKeys('I,J,K,L,');
    }
    update() {
        if (this.keys.I.isDown && this.enemy.body.touching.down) {
            this.enemy.setVelocityY(-280)
        }
        if (this.keys.L.isDown && this.enemy.body.touching.down) {
            this.enemy.setVelocityY(-280)
        }
        else if (this.keys.L.isDown) {
            this.enemy.setVelocityX(160)
        }
        //see how long traveling for then find distance, fixing y/vertical (jump amount) and the horizontal determines how far they go so need to know how fast they must move to go that far
        //essentially finding time
        //to find how long to apply x velocity for, calculate distance time
        else if (this.keys.J.isDown && this.enemy.body.touching.down) {
            this.enemy.setVelocityY(-280)
        }
        else if (this.keys.J.isDown) {
            this.enemy.setVelocityX(-160)
        }
        else {
            this.enemy.setVelocityX(0)
        }
    }
    // distance(star) {
    //     return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    // }
}
