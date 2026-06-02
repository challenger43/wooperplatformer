import { trials } from './testCoords.js'
import Navigation from './navigation.js'
export default class EnemyAI {
    keys;
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;
        this.targetStar = null;
    }
    init(data) {
        this.navigation = data.navigation
        this.nodes = data.navigation.nodes
    }
    create() {
        this.keys = this.scene.input.keyboard.addKeys('I,J,K,L,');
    }
    update() {
        this.distanceToNearestNode(this.nodes)
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

        // for (let i = 0; i < this.nodes.length - 1; i++){
        //     for (let j = 1; j < this.nodes.length; j++){
        //         let distance = Math.sqrt((this.nodes[i].x- this.nodes[j].x)**2 + (this.nodes[i].x - this.nodes[j].y)**2)
        //         // console.log("The Distance is " + distance + " between " + this.nodes[i] + " and " , this.nodes[j])
        //     }
        // }
    }
    distanceToNearestNode(nodes) {
        for (let i = 0; i < this.nodes.length; i++) {
            let distanceToEnemy = Math.sqrt((this.nodes[i].x - this.enemy.x) ** 2 + (this.nodes[i].y - this.enemy.y) ** 2)
        }

    }
    // distance(star) {
    //     return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    // }
}
