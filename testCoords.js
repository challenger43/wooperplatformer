export const trials = {
    platforms: [
        { //leftmost ground
                x: 400,
                y: 832,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            { //middle ground
                x: 900,
                y: 832,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
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
                x: 1290,
                y: 200,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {//world bounds right 
                x: 1290,
                y: 500,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {//world bounds right 
                x: 1290,
                y: -200,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            { //test platform
                x: 400,
                y: 750,  
                scaleX: 0.3,
                scaleY: 0.1,

            },
    ], 
    movingPlatforms: [],
    stars:[ 
        {
                x: 300,
                y: 720,
                scaleX: 0.05,
                scaleY: 0.05,
                collected: false,
                floating: false,
            },
            {
                x: 590,
                y: 720,
                scaleX: 0.05,
                scaleY: 0.05,
                collected: false,
                floating: false,

            },
            // {
            //     x: 600,
            //     y: 700,
            //     scaleX: 0.05,
            //     scaleY: 0.05,
            //     collected: false,
            //     floating: false,
            // },
            {
                x:48,
                y:703,
                scaleX: 0.05,
                scaleY: 0.05,
                collected: false,
                floating: true, 
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
            x:700,
            y:700,
            tint: 0x0000FF,
        }
    ]

}