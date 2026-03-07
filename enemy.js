import { trials } from './testCoords.js'
const rangeOfViewX = 1100;
const rangeOfViewY = 1100;
const maxJump = 50;
export default class EnemyAI {
    //stuff
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;
        this.targetStar = null;
    }
    update() {
        if (!this.targetStar) {
            this.targetStar = this.searchForStar()
            console.log("no targetStar")
        }
        if (this.targetStar) {
            this.collectStar(this.targetStar)
        }
    }
    searchForStar() {
        console.log("searching for a star....")
        let viewArray = trials.stars.filter((star) =>
            (star.collected == false) &&
            Math.abs(star.x - this.enemy.x) <= rangeOfViewX &&
            Math.abs(star.y - this.enemy.y) <= rangeOfViewY
        ) //checks if star is in grumpig's supposed range of view
        if (viewArray.length == 0){
            console.log('no stars in sight')
        }
        viewArray.sort((a, b) => this.distance(a) - this.distance(b))
        console.log(viewArray)
        let closestStar = viewArray.shift()
        return closestStar
    }
    distance(star) {
        return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    }

    collectStar(closestStar) {
        if (!closestStar || closestStar.collected == true) return
        let distanceX = Math.abs(this.enemy.x - closestStar.x)
        if (closestStar.y <= this.enemy.y + maxJump) { // in jump range
            if (distanceX <= 10){
                this.targetStar = null;
                closestStar.collected = true
                this.enemy.setVelocityX(0)
                this.bringStarHome()
                return
            }
            if (distanceX > 10) {
                if (this.enemy.x >= closestStar.x) {
                    this.enemy.setVelocityX(-100)
                }
                else if (this.enemy.x <= closestStar.x) {
                    this.enemy.setVelocityX(100)
                }
            }
        }
    }   
    bringStarHome() {
        console.log("we brought the star home yippee")

    }

}
