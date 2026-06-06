import { trials } from './testCoords.js'
import Navigation from './navigation.js'
//enemy states so far: searchingForPlatform, movingToPlatform
export default class EnemyAI {
    keys;

    //note to self, enemy final distance is 122 x
    // wasKDownLastFrame = false;
    // enemyStartX;
    // enemyEndX;
    // enemyFinalDistance; 
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;
        this.enemyState = "searchingForPlatform"; //various states: e.g. searching for platform, searching for star, collecting star, bringing star back, etc needa work this out later
        this.currentTargetNode = null;
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
        if (this.enemyState === "searchingForPlatform") {
            this.currentTargetNode = this.distanceToNearestNode(this.nodes);

            if (this.currentTargetNode) {
                this.enemyState = "movingToPlatform";
            }
        }
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
        //tester
        if (this.keys.K.isDown && !this.wasKDownLastFrame && this.enemy.body.touching.down) {
            this.enemyStartX = this.enemy.x
            this.enemy.setVelocityY(-280)
            this.wasKDownLastFrame = true;
        }

        if (this.wasKDownLastFrame == true && !this.enemy.body.touching.down) {
            this.enemy.setVelocityX(160)
            this.enemyEndX = this.enemy.x
        }
        // this.enemyFinalDistance = Math.abs(this.enemyEndX - this.enemyStartX)
        // console.log(this.enemyFinalDistance)
    }
    distanceToNearestNode(nodes) {
        let closestNode = null;
        for (let i = 0; i < nodes.length; i++) {
            let xDistance = Math.abs(nodes[i].x - this.enemy.x)
            // console.log("xDistance: " + xDistance)
            let yDistance = Math.abs(nodes[i].y - this.enemy.y)
            // console.log('yDistance: ' + yDistance)
            let distanceToEnemy = Math.sqrt(xDistance ** 2 + yDistance ** 2)
            // console.log("distance to enemy: " + distanceToEnemy)
            if ((!closestNode || distanceToEnemy < closestNode.distance) && yDistance<48) {
                closestNode = {
                    node: nodes[i],
                    distance: distanceToEnemy,
                    xDistance,
                    yDistance
                };
            }
        }
        console.log(closestNode)
        return closestNode;
    }
    moveToNearestPlatform(closestNode) {
        let yDistance = closestNode.yDistance
        let xDistance = closestNode.xDistance
        if (xDistance < 15) {
            let idkyet = 0
        }
        // console.log("x distance is: " + xDistance + " " + yDistance)

        // this.enemy.setVelocityX(-180)
    }
    // distance(star) {
    //     return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    // }
}
