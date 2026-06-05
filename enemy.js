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
        this.targetStar = null;
    }
    // constructor(scene, enemySprite) {
    //     this.scene = scene;
    //     this.enemy = enemySprite;
    //     this.targetStar = null;
    // }
    // update() {
    //     //if no star, find one
    //     //no path go make one
    //     //have path then follow it
    //     if (!this.targetStar) {
    //         this.targetStar = this.searchForStar()
    //     }
    //     if (this.targetStar) {
    //         this.enemyCollectStar(this.targetStar)
    //     }
    // }
    // create() { }
    // searchForStar() {
    //     if ((this.scene.stars.children.entries.filter((star) => star.collected == false)).length == 0) {
    //         // console.log("no more stars rip")
    //     }
    //     this.enemy.setVelocityX(0)
    //     this.enemy.anims.play('turn')
    //     let viewArray = this.scene.stars.children.entries.filter((star) =>
    //         (star.collected == false) &&
    //         Math.abs(star.x - this.enemy.x) <= rangeOfViewX &&
    //         Math.abs(star.y - this.enemy.y) <= rangeOfViewY
    //     ) //checks if star is in grumpig's supposed range of view
    //     if (viewArray.length == 0) {
    //         // this.sweep()
    //     }
    //     console.log("stars left:", viewArray.length)
    //     viewArray.sort((a, b) => this.distance(a) - this.distance(b))
    //     console.log(viewArray)
    //     let closestStar = viewArray.shift()
    //     return closestStar
    // }


    init(data) {
        this.navigation = data.navigation
        this.nodes = data.navigation.nodes
    }
    create() {
        this.keys = this.scene.input.keyboard.addKeys('I,J,K,L,');
    }
    update() {
        if (this.enemyState == "searchingForPlatform") {
            let closestNode = this.distanceToNearestNode(this.nodes)
            // this.enemyState == "movingToPlatform"
            this.moveToNearestPlatform(closestNode)
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
        // if (this.keys.K.isDown && !this.wasKDownLastFrame && this.enemy.body.touching.down) {
        //     this.enemyStartX = this.enemy.x
        //     this.enemy.setVelocityY(-280)
        //     this.wasKDownLastFrame = true;
        // }

        // if (this.wasKDownLastFrame == true && !this.enemy.body.touching.down){
        //     this.enemy.setVelocityX(160)
        //     this.enemyEndX = this.enemy.x
        // }
        // this.enemyFinalDistance = Math.abs(this.enemyEndX - this.enemyStartX)
        // console.log(this.enemyFinalDistance)
    }
    distanceToNearestNode(nodes) {
        let tempClosestDistance = Math.sqrt((this.nodes[0].x - this.enemy.x) ** 2 + (this.nodes[0].y - this.enemy.y) ** 2)
        let closestNode = [this.nodes[0], tempClosestDistance]
        for (let i = 0; i < this.nodes.length; i++) {
            let xDistance = this.nodes[i].x - this.enemy.x
            let yDistance = this.nodes[i].y - this.enemy.y
            let distanceToEnemy = Math.sqrt((xDistance) ** 2 + (yDistance) ** 2)
            if (distanceToEnemy < closestNode[1] && yDistance <= 84) {
                closestNode = [this.nodes[i], distanceToEnemy, xDistance, yDistance]
            }
        }
        return closestNode;
    }
    moveToNearestPlatform(closestNode){
        let yDistance = closestNode[3]
        let xDistance = closestNode[2]
        if (xDistance < 15){
            let idkyet = 0
        }
        // console.log("x distance is: " + xDistance + " " + yDistance)

        // this.enemy.setVelocityX(-180)
    }
    // distance(star) {
    //     return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    // }
}
