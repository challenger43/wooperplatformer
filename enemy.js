import { trials } from './testCoords.js'
const rangeOfViewX = 1100;
const rangeOfViewY = 1100;
const starCollectJump = 82;
const floorY = 784
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
            this.enemyCollectStar(this.targetStar)
        }
    }
    create(){}
    searchForStar() {
        console.log("searching for a star....")
        this.enemy.setVelocityX(0)
        this.enemy.setVelocityY(0)
        let viewArray = this.scene.stars.children.entries.filter((star) =>
            (star.collected == false) &&
            Math.abs(star.x - this.enemy.x) <= rangeOfViewX &&
            Math.abs(star.y - this.enemy.y) <= rangeOfViewY
        ) //checks if star is in grumpig's supposed range of view
        if (viewArray.length == 0) {
            console.log('no stars in sight')
        }
        console.log("stars left:", viewArray.length)
        viewArray.sort((a, b) => this.distance(a) - this.distance(b))
        console.log(viewArray)
        let closestStar = viewArray.shift()
        return closestStar
    }
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
