import { trials } from './testCoords.js'
import Navigation from './navigation.js'
//enemy states so far: searchingForPlatform, movingToPlatform
export default class EnemyAI {
    keys;
    enemyVelocityX = 180
    //note to self, enemy final distance is 122 x
    // wasKDownLastFrame = false;
    // enemyStartX;
    // enemyEndX;
    // enemyFinalDistance; 
    constructor(scene, enemySprite, sensor) {
        this.scene = scene;
        this.enemy = enemySprite;
        this.sensor = sensor
        this.enemyFunction = "searchingForPlatform"; //various states: e.g. searching for platform, searching for star, collecting star, bringing star back, etc needa work this out later
        this.enemyHasDoneThis = false;
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
        if (this.enemyFunction === "searchingForPlatform") {
            this.currentTargetNode = this.distanceToNearestNode(this.nodes);

            if (this.currentTargetNode) {
                this.enemyFunction = "calculatingJump";
            }
        }
        else if (this.enemyFunction === "calculatingJump" && !this.enemyHasDoneThis) {
            this.calculateJump(this.currentTargetNode)
            this.enemyHasDoneThis = true;
        }
        // if (this.keys.I.isDown && this.enemy.body.touching.down) {
        //     this.enemy.setVelocityY(-280)
        // }
        // if (this.keys.L.isDown && this.enemy.body.touching.down) {
        //     this.enemy.setVelocityY(-280)
        // }
        // else if (this.keys.L.isDown) {
        //     this.enemy.setVelocityX(160)
        // }
        //see how long traveling for then find distance, fixing y/vertical (jump amount) and the horizontal determines how far they go so need to know how fast they must move to go that far
        //essentially finding time
        //to find how long to apply x velocity for, calculate distance time
        // else if (this.keys.J.isDown && this.enemy.body.touching.down) {
        //     this.enemy.setVelocityY(-280)
        // }
        // else if (this.keys.J.isDown) {
        //     this.enemy.setVelocityX(-160)
        // }
        // else {
        //     this.enemy.setVelocityX(0)
        // }
        //tester
        // if (this.keys.K.isDown && !this.wasKDownLastFrame && this.enemy.body.touching.down) {
        //     this.enemyStartX = this.enemy.x
        //     this.enemy.setVelocityY(-280)
        //     this.wasKDownLastFrame = true;
        // }

        // if (this.wasKDownLastFrame == true && !this.enemy.body.touching.down) {
        //     this.enemy.setVelocityX(160)
        //     this.enemyEndX = this.enemy.x
        // }
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
            if ((!closestNode || distanceToEnemy < closestNode.distance) && yDistance < 48) {
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
    calculateJump(closestNode) {
        let currentNode = closestNode
        let xDistance = currentNode.xDistance
        let yDistance = currentNode.yDistance
        let direction;
        if (xDistance > 226 && currentNode.node.x - this.enemy.x < 0) {
            let duration = (xDistance - 226) / 180 * 1000
            this.enemy.setVelocityX(-180)
            this.sensor.setVelocityX(-180)
            let timer = this.scene.time.delayedCall(duration, () => {
                this.sensor.setVelocityX(0)
                this.enemy.setVelocityX(0)
                this.testJump(currentNode, direction, 1)
            })
        }
        else if (xDistance > 226 && closestNode.node.x - this.enemy.x >= 0) {
            let duration = (226 - xDistance) / 180 * 1000
            this.enemy.setVelocityX(180)
            this.sensor.setVelocityX(180)
            let timer = this.scene.time.delayedCall(duration, () => {
                this.enemy.setVelocityX(0)
                this.sensor.setVelocityX(0)
                this.testJump(currentNode, direction, 1)
            })
            // //    doneJumping = true
            // }
            // if (doneJumping){
            //     this.testJump(currentNode, direction)
            // }

            // distance(star) {
            //     return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
            // }
        }
    }
    verifyTestJump(nearestNode, prevSensorX, prevSensorY, iteration){
        console.log(this.sensor.x)
        if (nearestNode.x == this.sensor.x && nearestNode.y == this.sensor.y){
            console.log("yes jump worked")
        }
        else if (Math.abs(nearestNode.x - this.sensor.x >=220)){

        }
        //cases: if y is the same, likely collided with something and fell, walk forward continuing to test jumps until below roof, then proceed to czs
        // if x is the same, wall.
        //if x is beyond what it was supposed to be and y is still below the platform, = applied x velocity too early, experiment with different x velocity applications
    }
    testJump(closestNode, direction, iteration) {
        //most basic test
        let prevSensorX = this.sensor.x
        let prevSensorY = this.sensor.y
        let isJumping = false;
        switch (iteration) {
            case 1:
                if (this.sensor.body.touching.down) {
                    this.sensor.setVelocityY(-280)
                    isJumping == false
                }
                if (isJumping) {
                    this.sensor.setVelocityX(direction == "left" ? 280: -280)
                }
                if (this.jumping == false){
                     this.verifyTestJump(closestNode, prevSensorX, prevSensorY, 1)
                }
                // console.log(closestNode, this.sensor.x, this.sensor.y, prevSensorX, prevSensorY,)
                
            break;
        }


    }
}