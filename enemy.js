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
        let testArray = []
        for (let star of trials.stars){
            testArray.push(star.x, star.y)
        }
        let viewArray = testArray.filter((x)=>(x.x <= (enemy.x +rangeOfViewX) && x.x >= -rangeOfViewX) && (x.y <= rangeOfViewY && x.y >= -rangeOfViewY))
        console.log(viewArray)
    }
    findDistance() {

    }
    collectStar(){
    }
    bringStarHome(){

    }
}