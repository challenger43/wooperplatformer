export default class EnemyAI {
    //stuff
    constructor(scene, enemySprite) {
        this.scene = scene;
        this.enemy = enemySprite;

        this.state = 'SEARCH';
        this.targetStar = null;
    }
    update(){}
    searchForStar(){}
    collectStar(){
    }
    bringStarHome(){

    }
}