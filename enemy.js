import { trials } from './testCoords.js'
const rangeOfViewX = 1100;
const rangeOfViewY = 1100;
export default class EnemyAI {
    //stuff
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;

        this.state = 'SEARCH';
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
        let viewArray = trials.stars.filter((star) =>
            Math.abs(star.x - this.enemy.x) <= rangeOfViewX &&
            Math.abs(star.y - this.enemy.y) <= rangeOfViewY
        ) //checks if star is in grumpig's supposed range of view
        viewArray.sort((a, b) => this.distance(a) - this.distance(b))
        return viewArray[0]
    }
    distance(star) {
        return Math.sqrt(Math.pow((star.x - this.enemy.x), 2) + Math.pow((star.y - this.enemy.y), 2))
    }
    collectStar(closestStar) {
    }
    bringStarHome() {

    }
} 