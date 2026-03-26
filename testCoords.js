export const trials = {
    platforms: [
        { //test platform
            x: 400,
            y: 750,
            scaleX: 0.3,
            scaleY: 0.1,

        },
        { // a thick test platform
            x: 150,
            y: 760,
            scaleX: 0.5,
            scaleY: 0.5,
        },

        {
            x: 600,
            y: 680,
            scaleX: 0.1,
            scaleY: 0.5
        }
    ],
    grounds: [
        { //leftmost ground
            x: 480,
            y: 832,
            scaleX: 2.9,
            scaleY: 2,
            tint: 0x3c6529
        },
        // { //middle ground
        //     x: 900,
        //     y: 832,
        //     scaleX: 2,
        //     scaleY: 2,
        //     tint: 0x3c6529
        // },
        {//world bounds left 
            x: -20,
            y: 500,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds left 
            x: -20,
            y: 100,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds right 
            x: 1059,
            y: 200,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds right 
            x: 1059,
            y: 500,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
        {//world bounds right 
            x: 1059,
            y: -200,
            scaleX: 0.1,
            scaleY: 21,
            tint: 0x3c6529,
        },
    ],
    movingPlatforms: [],
    stars: [
        // {
        //         x: 300,
        //         y: 720,
        //         scaleX: 0.05,
        //         scaleY: 0.05,
        //         collected: false,
        //         floating: false,
        //     },
        {
            x: 590,
            y: 784,
            scaleX: 0.05,
            scaleY: 0.05,
            collected: false,
            floating: false,

        },
        {
            x: 600,
            y: 784,
            scaleX: 0.05,
            scaleY: 0.05,
            collected: false,
            floating: false,
        },
        {
            x: 48,
            y: 703,
            scaleX: 0.05,
            scaleY: 0.05,
            collected: false,
            floating: true,
        },
        {
            x: 310,
            y: 776,
            scaleX: 0.05,
            scaleY: 0.05,
            collected: false,
            floating: true
        }
    ],
    player: [
        {
            x: 100,
            y: 700,
        }
    ],
    enemy: [
        {
            x: 700,
            y: 700,
            tint: 0x0000FF,
        }
    ]

}