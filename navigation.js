import { trials } from './testCoords.js'
export default class Navigation {
    constructor(scene) {
        this.scene = scene;
        this.nodes = []
    }
    addNode(x, y) {
        this.nodes.push({
            x: x,
            y: y,
            connections: []
        })
        console.log("Nodes:", this.nodes);
    }
    generateNodesFromPlatform(platforms) {
        platforms.children.iterate(platform => {
            if (!platform) return
            let left = platform.x - platform.displayWidth / 2
            let right = platform.x + platform.displayWidth / 2
            let y = platform.y - platform.displayHeight / 2
            this.addNode(left, y)
            this.addNode(right, y)
        })
    }
    connectNodes() { }
    debugDraw() {
        this.nodes.forEach(node => {
            this.scene.add.circle(node.x, node.y, 50, 0xff0000)
        })
    }
}
