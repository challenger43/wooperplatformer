import {trials} from './testCoords.js' 
const rangeOfViewX = 1100
const rangeOfViewY =  1100
export default class EnemyAI {
    //stuff
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;

        this.state = 'SEARCH';
        this.targetStar = null;
    }
    update(){
        if (this.scene.keys.A.isDown || this.scene.cursors.left.isDown) {
            this.searchForStar()    
        }
    }
    searchForStar(){
        let viewArray = trials.stars.filter((star) =>
        Math.abs(star.x - this.enemy.x) <= rangeOfViewX &&
        Math.abs(star.y - this.enemy.y) <= rangeOfViewY
    ) //checks if star is in grumpig's supposed range of view
        console.log(viewArray)
    }
    findDistance() {

    }
    collectStar(){
    }
    bringStarHome(){

    }
}