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
    connectNodes() {
        //1): walk from node to node on the same platform
        //to find nodes on the same platform, filter all nodes by similar y values 
        // for each platform:
        // nodesOnPlatform = all nodes whose y is approx platform top
        // sort nodesOnPlatform by x
        // for i = 0 to nodesOnPlatform.length-2:
        //     connect nodesOnPlatform[i] <-> nodesOnPlatform[i+1]
        //when you .push, nodeA.connections.push({node: nodeB, type: "same platform"})
        //2): do parkour
            //for each node, look at every other node in the scene
            //if the distance is within jump range and there are no obstructions, add a connection (for no obstructions, make separate function that when returns true will call)
            // for each nodeA:
            //      for each nodeB (nodeB != nodeA):
            //         dx = nodeB.x - nodeA.x
            //         dy = nodeB.y - nodeA.y
            //         if dx is within max horizontal jump AND dy is within max vertical jump:
            //             nodeA.connections.push(nodeB)
    }
    debugDraw() {
        this.nodes.forEach(node => {
            this.scene.add.circle(node.x, node.y, 50, 0xff0000)
        })
    }
}
