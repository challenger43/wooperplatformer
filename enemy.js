import { trials } from './testCoords.js'
const rangeOfViewX = 1100;
const rangeOfViewY = 1100;
const starCollectJump = 82;
const platformJump = 50
const floorY = 784
const worldBorderLeft = 16
const worldBorderRight = 1023
const yLevelOne = 784
const yLevelTwo = 732
export default class EnemyAI {
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;
        this.targetStar = null;
        this.yLevel = yLevelOne //sweep whole ylevel; if no more stars found and total stars isn't 0. 
    }
    update() {
        if (!this.targetStar) {
            this.targetStar = this.searchForStar()
        }
        if (this.targetStar) {
            this.enemyCollectStar(this.targetStar)
        }
    }
    create() { }
    searched = {
        yLevelOne: false,
        yLevelTwo: false,
        // yLevelThree: false,
        //etc
    }
    yLevelOneExplored = []
    searchForStar() {
        if ((this.scene.stars.children.entries.filter((star) => star.collected == false)).length == 0) {
            console.log("no more stars rip")
        }
        this.enemy.setVelocityX(0)
        this.enemy.anims.play('turn')
        let viewArray = this.scene.stars.children.entries.filter((star) =>
            (star.collected == false) &&
            Math.abs(star.x - this.enemy.x) <= rangeOfViewX &&
            Math.abs(star.y - this.enemy.y) <= rangeOfViewY
        ) //checks if star is in grumpig's supposed range of view
        if (viewArray.length == 0) {
            this.sweep()
        }
        console.log("stars left:", viewArray.length)
        viewArray.sort((a, b) => this.distance(a) - this.distance(b))
        console.log(viewArray)
        let closestStar = viewArray.shift()
        return closestStar
    }
    sweep() {
        //need to add check to reverse directions and somehow remember which direction it was previously going
        let distanceFromWorldBorderLeft = Math.abs(this.enemy.x - worldBorderLeft) 
        let distanceFromWorldBorderRight = Math.abs(this.enemy.x - worldBorderRight)
        let direction;
        if (distanceFromWorldBorderLeft > distanceFromWorldBorderRight){
            direction = "right"
        }
        else{
            direction = "left"
        }
        if (direction == "right"){
            while (this.enemy.x != worldBorderRight){
                this.enemy.setVelocityX(100)
            }
        }
        else if (direction == "left"){
            while (this.enemy.x != worldBorderLeft){
                this.enemy.setVelocityX(-100)
            }
        }

        // if (this.enemy.x <= ((worldBorderLeft + worldBorderRight) / 2)) {
        //     this.enemy.setVelocityX(-100)
        //     console.log("Left 2: " + this.enemy.x)
        // }
        // else if ((this.enemy.x) >= ((worldBorderLeft + worldBorderRight) / 2)) {
        //     console.log("Right 1: " + this.enemy.x)
        //     this.enemy.setVelocityX(100)
        //     console.log("Right 2: " + this.enemy.x)
        // }
        // if (this.enemy.x == worldBorderLeft) {
        //     this.enemy.setVelocity(100)
        // }
        // else if (this.enemy.x == worldBorderRight) {
        //     this.enemy.setVelocity(-100)
        // }
    }
    ascendYLevel(yLevel) { }
    distance(star) {
        return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    }

    enemyCollectStar(closestStar) {
        if (!closestStar || closestStar.collected) {
            this.targetStar = null
            return
        }
        let distanceX = Math.abs(this.enemy.x - closestStar.x)
        let distanceY = Math.abs(this.enemy.y - closestStar.y)
        // let heightDiff = this.enemy.y - closestStar.y
        if (distanceX <= 20 && distanceY <= 20) {
            closestStar.collected = true
            this.targetStar = null;
            this.enemy.anims.play('turn')
            this.enemy.setVelocityY(0)
            this.enemy.setVelocityX(0)
            this.bringStarHome()
            return
        }
        if (distanceY >= 0 && distanceY <= starCollectJump) { // in jump range(above) + no obstructions
            if (distanceX > 10) {
                if (this.enemy.x >= closestStar.x) {
                    this.enemy.anims.play('left', true);
                    this.enemy.setVelocityX(-100);
                }
                else if (this.enemy.x <= closestStar.x) {
                    this.enemy.anims.play('right', true);
                    this.enemy.setVelocityX(100);
                }
            }
            if (distanceX <= 5 && distanceY > 10 && distanceY <= starCollectJump && this.enemy.body.touching.down) {
                this.enemy.setVelocityX(0)
                this.enemy.setVelocityY(-280)
            }
        }
        else {
            console.log("Welp")
        }
        console.log("target:", closestStar.x, closestStar.y)
        // console.log("enemy:", this.enemy.x, this.enemy.y)
    }
    bringStarHome() {
        console.log("we brought the star home yippee")
    }

}
