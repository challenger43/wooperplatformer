import { trials } from './testCoords.js'
export default class Navigation {
    constructor(scene) {
        this.scene = scene;
        this.nodes = []
    }
    nodeRepresentations;
    preload() {
        this.load.image('bomb', 'assets/bomb.png');
    }
    addNode(x, y, nodeType, connections) {
        const newNode = ({
            x: x,
            y: y,
            nodeType: nodeType,
            connections: []
        })
        this.nodes.push(newNode)
        console.log("Nodes:", this.nodes, this.nodes.connections);
        this.scene.add.text(newNode.x, newNode.y, "YO")
        return newNode
    }
    generateNodesFromPlatform(platforms) { //basically for platform nodes put it in immediately instead of after
        platforms.children.iterate(platform => {
            if (!platform) return
            let left = platform.x - platform.displayWidth / 2 - 20;
            let right = platform.x + platform.displayWidth / 2;
            let y = platform.y - platform.displayHeight / 2;
            let leftNode = this.addNode(left, y, "platform")
            let rightNode = this.addNode(right, y, "platform")
            leftNode.connections.push({
                node: rightNode,
                type: "walkTo"
            })
            rightNode.connections.push({
                node: leftNode,
                type: "walkTo"
            })
        })
    }
    //need to add nodes for the ground, stars

    test(nodes) {
    }
    create() {
        this.connectNodes(this.nodes)
    }
    connectNodes(nodes) {
        for (let i = 0; i < this.nodes.length - 1; i++){
            for (let j = 1; j < this.nodes.length; j++){
                let distance = Math.sqrt((this.nodes[i].x- this.nodes[j].x)**2 + (this.nodes[i].x - this.nodes[j].y)**2)
                console.log(distance)
                console.log(this.nodes[i] , " " , this.nodes[j])
            }
        }
        //1): walk from node to node on the same platform
        //to find nodes on the same platform, filter all nodes by similar y values 
        // for each platform:
        // nodesOnPlatform = all nodes whose y is approx platform top
        // sort nodesOnPlatform by x
        // for i = 0 to nodesOnPlatform.length-2:
        //     connect nodesOnPlatform[i] <-> nodesOnPlatform[i+1]
        //when you .push(), nodeA.connections.push({node: nodeB, type: "same platform"})
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
}
