export const grumpigLevelData = {
    platforms: [
        { x: 200, y: 600, scaleX: 3, scaleY: 1, tint: 0xFFFFFF }, //0x8B4513
        // big ground platform
        // { x: 600, y: 400, scaleX: 1.5, scaleY: 1 },
        //Finish line is at 2757 293
        {
            x: 1030,
            y: 500,
            scaleX: 0.6
        },
        {
            x: 1540,
            y: 450,
            scaleX: 0.02,
        },
        // {   
        //     x: 1360,
        //     y: 550,
        //     scaleX: 0.089,
        // },
        {
            x: 1700,
            y: 570,
            scaleX: 0.2,
        },
        {
            x: 1900,
            y: 698,
            scaleX: 0.1,
        },
        {
            x: 1900,
            y: 610,
            scaleX: 0.1,
        },

        // {
        //     x: 2050,
        //     y: 575,
        //     scaleX: 0.5,
        // },
        {
            x: 1570,
            y: 400,
            scaleX: 0.02,
        },
        {
            x: 1605,
            y: -1310,
            scaleX: 0.1,
            scaleY: 100,
        },
        {
            x: 1850,
            y: 200,
            scaleX: 0.075,
            scaleY: 16,
        },
        {
            x: 1882,
            y: 570,
            scaleX: 0.01,
            scaleY: 1.1,
        },
        {
            x: 2075,
            y: 430,
            scaleX: 0.1,
            scaleY: 0.7
        },
        {
            x: 2150,
            y: 325,
            scaleX: 1.5,
            scaleY: 0.5
        },
        {
            x: 2055,
            y: 750,
            scaleX: 0.025,
            scaleY: 20
        },
        {
            x: 2350,
            y: 473,
            scaleX: 0.1,
            scaleY: 1
        },
        {
            x: 2450,
            y: 473,
            scaleX: 0.1,
            scaleY: 1
        },
        {
            x: 2558,
            y: 325,
            scaleX: 0.1,
            scaleY: 1
        },
        {
            x: 2658,
            y: 325,
            scaleX: 0.025,
            scaleY: 1
        },
        {
            x: 2758,
            y: 325,
            scaleX: 0.025,
            scaleY: 1
        },
        {
            x: 2858,
            y: 325,
            scaleX: 0.025,
            scaleY: 1
        },
        {
            x: 3245,
            y: 400,
            scaleX: 1,
            scaleY: 1
        },
        {
            x: 3545,
            y: 350,
            scaleX: 1,
            scaleY: 1
        },
        {
            x: 3845,
            y: 301,
            scaleX: 1,
            scaleY: 1
        },





    ],
    movingPlatforms: [
        {
            x: 1555,
            y: 2100,
            scaleX: 0.1,
            scaleY: 5,
            movementType: 'updown',
            moveY: 600,
            speed: 650,
            tint: 0xFFFFFF,



        },
        {
            x: 1555,
            y: 1500,
            scaleX: 0.1,
            scaleY: 10,
            movementType: 'updown',
            moveY: 600,
            speed: 650,
            tint: 0xFFFFFF,
        },

        {
            x: 1243,
            y: 460,
            scaleX: 0.1,
            scaleY: 16,
            movementType: 'updown',
            moveY: 600,
            speed: 650,
            tint: 0xFFFFFF,

        },
        {
            x: 1809,
            y: 550,
            scaleX: 0.1,
            scaleY: 16,
            movementType: 'updown',
            moveY: 600,
            speed: 650,
            tint: 0xFFFFFF,

        },

        {
            x: 1384,
            y: 518,
            scaleX: 0.089,
            movementType: 'pingpong',
            moveX: 100,
            speed: 80

        },
        {
            x: 1970,
            y: 460,
            scaleX: 0.02,
            movementType: 'pingpong',
            moveX: 25,
            speed: 80,

        },
        {
            x: 2282,
            y: 625,
            scaleX: 0.1,
            scaleY: 0.1,
            movementType: 'circular',
            radius: 75,
            centerX: 2282,
            centerY: 625,
            speed: 0.29,
            angle: 0,
            startingAngle: 0,

        },
        {
            x: 2512,
            y: 321,
            scaleX: 0.1,
            scaleY: 3,
            movementType: 'updown',
            moveY: 700,
            speed: 300,
            tint: 0xFFFFFF,

        },
        {
            x: 2512,
            y: 371,
            scaleX: 0.1,
            scaleY: 3,
            movementType: 'updown',
            moveY: 700,
            speed: 300,
            tint: 0xFFFFFF,

        },
        {
            x: 2942,
            y: 300,
            scaleX: 0.1,
            scaleY: 7,
            movementType: 'updown',
            moveY: 500,
            speed: 650,
            tint: 0xFFFFFF,

        },
        




        //note to myself(and other people) models for parameters: need to pass in this stuff to be safe
        // {
        //         x: 500,
        //         y: 490,
        //         scaleX: 0.1,
        //         movementType: 'pingpong',
        //         moveX: 200,
        //         speed: 80
        // },
        //{
        //     x: 400,
        //     y: 350,
        //     scaleX: 1,
        //     scaleY: 1,
        //     movementType: 'pingpong',
        //     moveX: 200,
        //     moveY: 0,
        //     speed: 100,
        //     tint: 0x228B22,
        // }
        // {
        //     x: 300,
        //     y: 500,
        //     scaleX: 0.1,
        //     movementType: 'circular',
        //     radius: 80,
        //     centerX: 300,
        //     centerY: 300,
        //     speed: 0.1,
        //     angle: 0,
        //     startingAngle: 0,
        // },
    ],
    waters: [
        // { x: 300, y: 520, scaleX: 2, scaleY: 0.5, tint: 0x0000FF }
    ],
    portals: [
        { x: 750, y: 450, destination: 'LevelTwo', tint: 0xffffff }
    ],
    floatingStars: [],
    stars: [],
}
export const bossBattles = {
    GrumpigBoss: grumpigLevelData
};

export const levels = {
    LevelOne: {
        platforms: [
            {
                x: 1000,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 400,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 750,
                y: 220,
                tint: 0x3c6529
            },
            {
                x: 200,
                y: 250,
                scaleX: 0.5,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 1400,
                y: 340,
                tint: 0x3c6529
            },
            {
                x: 450,
                y: 400,
                tint: 0x3c6529
            },

            {
                x: 1100,
                y: 450,
                tint: 0x3c6529
            },

            {
                x: 450,
                y: 100,
                scaleX: 0.1,
                tint: 0x3c6529
            },

            {
                x: 1500,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },

            {
                x: -20,
                y: 200,
                scaleX: 0.1,
                scaleY: 33,
                tint: 0x3c6529
            },
            {
                x: 1910,
                y: 200,
                scaleX: 0.1,
                scaleY: 33,
                tint: 0x3c6529
            },
            {
                x: 620,
                y: -75,
                scaleX: 0.1,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 761,
                y: -10,
                scaleX: 0.1,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 927,
                y: 20,
                scaleX: 0.1,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 327,
                y: -24,
                scaleX: 0.1,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 133,
                y: -27,
                scaleX: 0.1,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 22,
                y: 120,
                scaleX: 0.1,
                scaleY: 1,
                tint: 0x3c6529
            },
            {
                x: 1450,
                y: 170,
                scaleX: 0.5,
                scaleY: 1,
                tint: 0x3c6529
            },
        ],
        waters: [],
        stars: [

            {
                x: 30,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,

            },
            {
                x: 449,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 372,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 206,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 738,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 1516,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 1116,
                y: 512,
                scaleX: 0.05,
                scaleY: 0.05
            },
            {
                x: 688,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 330,
                y: -56,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 133,
                y: -59,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 762,
                y: -40,
                scaleX: 0.05,
                scaleY: 0.05,
            },


        ],
        floatingStars: [
            {
                x: 100,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,


            },
            {
                x: 460,
                y: 200,
                scaleX: 0.05,
                scaleY: 0.05,


            },
            {
                x: 787,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,


            },
            {
                x: 1728,
                y: 180,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1150,
                y: -100,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1267,
                y: 126,
                scaleX: 0.05,
                scaleY: 0.05,


            },


        ],
        portals: [
            {
                x: 50,
                y: 462,
                scaleX: 0.3,
                scaleY: 0.3,
                // destination: "LevelTwo"
                boss: "GrumpigBoss",
                levelData: grumpigLevelData,
            },
            // { omnious testing portal 
            //     x: 550,
            //     y: 450,
            //     scaleX: 0.3,
            //     scaleY: 0.3,
            //     tint: 0xff0000,
            //     destination: "LevelThree",
            // },
        ],
        movingPlatforms: [
            // {
            //     x: 200,
            //     y: 420,
            //     centerX: 200,
            //     centerY: 420,
            //     movementType: 'circular',
            //     radius: 120,
            //     // moveY: 300,
            //     speed: 0.1,
            //     scaleX: 0.1,
            //     tint: 0xff0000,
            //     angle: 0,
            //     startingAngle: 0,

            // },  
            // ---just a basic tester from original
        ],
    },
    LevelTwo: {
        platforms: [
            {
                x: 1000,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 400,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 1500,
                y: 568,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {
                x: 454,
                y: 280,
                scaleX: 0.5,
                tint: 0x3c6529
            },
            {
                x: 254,
                y: 380,
                scaleX: 0.5,
                tint: 0x3c6529
            },
            {
                x: 268,
                y: 100,
                scaleX: 0.5,
                tint: 0x3c6529
            },
            {
                x: 813,
                y: 280,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: 1053,
                y: 280,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: 1259,
                y: 200,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: 1047,
                y: 60,
                scaleX: 0.1,
                tint: 0x3c6529
            },
            {
                x: -20,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: -20,
                y: -350,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: 1910,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: 1910,
                y: -350,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {
                x: 1580,
                y: 200,
                scaleX: 0.05,
                tint: 0x3c6529
            },
            {
                x: 1847,
                y: 200,
                scaleX: 0.1,
                tint: 0x3c6529
            },

        ],
        waters: [],
        stars: [
            {
                x: 813,
                y: 250,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1050,
                y: 20,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1050,
                y: 240,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1285,
                y: 200,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 285,
                y: 60,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1584,
                y: 160,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1696,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 603,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 702,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            }

        ],
        floatingStars: [
            {
                x: 740,
                y: 80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 660,
                y: 80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 530,
                y: 80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 160,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 90,
                y: 250,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1432,
                y: 50,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1847,
                y: 50,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1847,
                y: 350,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1284,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,
            }
        ],
        portals: [
            {
                x: 50,
                y: 462,
                scaleX: 0.3,
                scaleY: 0.3,
                destination: "QuagBallIntro",
                // boss: "GrumpigBoss"
            },
        ],
        movingPlatforms: [],
    },
    LevelThree: {
        platforms: [
            { //leftmost ground
                x: 400,
                y: 632,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            { //middle ground
                x: 900,
                y: 632,
                scaleX: 2,
                scaleY: 2,
                tint: 0x3c6529
            },
            {//world bounds left 
                x: -20,
                y: 300,
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
                y: 100,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {//world bounds right 
                x: 1290,
                y: 300,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {//world bounds right 
                x: 1290,
                y: -100,
                scaleX: 0.1,
                scaleY: 21,
                tint: 0x3c6529,
            },
            {//the borders to the pool
                x: 180,
                y: 489,
                scaleX: 0.05,
                scaleY: 7,
                tint: 0x3c6529,
            },
            { //the borders to the pool
                x: 180,
                y: 269,
                scaleX: 0.05,
                scaleY: 7,
                tint: 0x3c6529,
            },
            {//more borders to the pool
                x: 180,
                y: 100,
                scaleX: 0.05,
                scaleY: 7,
                tint: 0x3c6529,
            },
            {//ladder platform left
                x: 16,
                y: 310,
                scaleX: 0.07,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {//ladder platform left
                x: 16,
                y: 450,
                scaleX: 0.2,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {//ladder platform left
                x: 600,
                y: 376,
                scaleX: 0.05,
                scaleY: 7,
                tint: 0x3c6529,
            },
            {//ladder platform left
                x: 600,
                y: 576,
                scaleX: 0.05,
                scaleY: 2,
                tint: 0x3c6529,
            },
            {//ladder platform left
                x: 16,
                y: 220,
                scaleX: 0.2,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {//ladder platform left
                x: 153,
                y: 330,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 330,
                y: 330,
                scaleX: 0.1,
                tint: 0x3c6529,
            },
            {  //ladder platform cont.
                x: 20,
                y: 100,
                scaleX: 0.25,//change back to 0.2 when done coding
                scaleY: 0.1,
                tint: 0x3c6529
            },
            { //pool border ladder on right
                x: 636,
                y: 450,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            {
                x: 796,
                y: 300,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            {
                x: 933,
                y: 420,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529
            },
            { //right swimming pool ladder to get stars
                x: 604,
                y: 200,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right swimming pool ladder to get stars
                x: 604,
                y: 50,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //swimming pool mid platform above
                x: 410,
                y: 270,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529
            },
            { //swimming pool mid platform above
                x: 280,
                y: 120,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right border ladder bottom 
                x: 1235,
                y: 480,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529
            },
            { //right border ladder 2
                x: 1235,
                y: 400,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right border ladder 3
                x: 1235,
                y: 320,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right border ladder 4
                x: 1235,
                y: 240,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right border ladder 4
                x: 1235,
                y: 160,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right border ladder 5
                x: 1235,
                y: 80,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            { //right border ladder 6
                x: 1235,
                y: 0,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529

            },
            {
                x: 364,
                y: 496,
                scaleX: 0.3,
                scaleY: 0.3,
                tint: 0x3c6529
            },
            {
                x: 318,
                y: 526,
                scaleX: 0.05,
                scaleY: 1.8,
                tint: 0x3c6529
            },
            {
                x: 412,
                y: 526,
                scaleX: 0.05,
                scaleY: 1.8,
                tint: 0x3c6529
            },

        ],
        waters: [
            {
                x: 390,
                y: 440,
                scaleX: 1,
                scaleY: 10,
                opacity: 0.1,
            },
        ],
        stars: [
            {
                x: 16,
                y: 430,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 153,
                y: 200,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 15,
                y: 280,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 100,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 60,
                scaleX: 0.05,
                scaleY: 0.05,
            }
        ],
        floatingStars: [
            {//star in a cave
                x: 370,
                y: 530,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 292,
                y: -10,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 358,
                y: 30,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 418,
                y: 70,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 741,
                y: 400,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 821,
                y: 400,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 460,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 380,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 300,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 220,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 140,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: 60,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: -20,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1235,
                y: -80,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 254,
                y: 390,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 454,
                y: 390,
                scaleX: 0.05,
                scaleY: 0.05,
            },


        ],
        portals: [
            {
                x: 100, //1235 for original, set back after testing 100 for testing
                y: 400, //-120 400 for testing
                scaleX: 0.3,
                scaleY: 0.3,
                destination: "LevelFour",//swap out when i actually finish the next scene
            },
        ],
        movingPlatforms: [],
    },
    LevelFour: {
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
            { //wooper spawn platform
                x: 100,
                y: 500,
                scaleX: 0.1,
                scaleY: 0.3,
                tint: 0xFF0000,
            },
            { //exit water platform
                x: 300,
                y: 580,
                scaleX: 0.3,
                scaleY: 0.3,
                tint: 0x3c6529,
            },
            { //exit water platform #2
                x: 680,
                y: 580,
                scaleX: 0.3,
                scaleY: 0.3,
                tint: 0x3c6529,
            },
            { //water rock thing
                x: 500,
                y: 650,
                scaleX: 0.5,
                scaleY: 0.7,
                tint: 0x3c6529,
            },
            {
                x: 280,
                y: 730,
                scaleX: 0.3,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 630,
                y: 710,
                scaleX: 0.3,
                scaleY: 0.5,
                tint: 0x3c6529,
            },
            {
                x: 50,
                y: 710,
                scaleX: 0.3,
                scaleY: 0.5,
                tint: 0x3c6529,
            },
            {
                x: 730,
                y: 750,
                scaleX: 0.3,
                scaleY: 0.5,
                tint: 0x3c6529,
            },
            {
                x: 1058,
                y: 710,
                scaleX: 0.3,
                scaleY: 0.5,
                tint: 0x3c6529,
            },
            {
                x: 1177,
                y: 710,
                scaleX: 0.3,
                scaleY: 3,
                tint: 0x3c6529,
            },//these two make the 'dumbell' shape
            {
                x: 940,
                y: 710,
                scaleX: 0.3,
                scaleY: 3,
                tint: 0x3c6529,
            },
            {
                x: 500,
                y: 250,
                scaleX: 0.6,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 600,
                y: 340,
                scaleX: 0.8,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 10,
                y: 400,
                scaleX: 0.05,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 10,
                y: 250,
                scaleX: 0.05,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 224, //jumping platform
                y: 280,
                scaleX: 0.05,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 586,
                y: 150,
                scaleX: 0.1,
                scaleY: 3,
                tint: 0x3c6529,
            },
            {
                x: 586,
                y: 20,
                scaleX: 0.1,
                scaleY: 2,
                tint: 0x3c6529,
            },
            {
                x: 563,
                y: 86,
                scaleX: 0.01,
                scaleY: 3,
                tint: 0x3c6529,
            },
            {
                x: 834,
                y: 130,
                scaleX: 0.01,
                scaleY: 3,
                tint: 0x3c6529,
            },
            {
                x: 1020,
                y: 200,
                scaleX: 0.01,
                scaleY: 3,
                tint: 0x3c6529,
            },
            {
                x: 1178,
                y: 300,
                scaleX: 0.5,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 917,
                y: 380,
                scaleX: 0.1,
                scaleY: 0.2,
                // tint: 0x3c6529,
            },
            {
                x: 1150,
                y: 480,
                scaleX: 0.1,
                scaleY: 0.2,
                // tint: 0x3c6529,
            },
        ],
        floatingStars: [
            {
                x: 48,
                y: 686,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 48,
                y: 750,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 415,
                y: 720,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 480,
                y: 370,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 585,
                y: 686,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 712,
                y: 726,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 735,
                y: 784,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1060,
                y: 770,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 920,
                y: 784,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1250,
                y: 784,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1250,
                y: 730,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1044,
                y: 686,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 210,
                y: 500,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 180,
                y: 500,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 100,
                y: 530,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 395,
                y: 290,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 930,
                y: -116,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 1150,
                y: 440,
                scaleX: 0.05,
                scaleY: 0.05,
            },
        ],
        stars: [
            {
                x: 224,
                y: 100,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 590,
                y: -30,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 910,
                y: 0,
                scaleX: 0.05,
                scaleY: 0.05,
            },

        ],

        portals: [
            {
                x: 100, //1235 for original, set bac after testing
                y: 400, //-120 
                scaleX: 0.3,
                scaleY: 0.3,
                destination: "LevelFive",//swap out when i actually finish the next scene
            },
        ],
        waters: [
            {
                x: 640,
                y: 690,
                scaleX: 3.4,
                scaleY: 7,
            }
        ],
        movingPlatforms: [],
    },
    LevelFive: {
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
            {
                x: 100,
                y: 500,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 212,
                y: 484,
                scaleX: 0.1,
                scaleY: 17.79,
                tint: 0x3c6529,
            },
            {
                x: 70,
                y: 595,
                scaleX: 0.35,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 118,
                y: 753,
                scaleX: 0.375,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 66,
                y: 651,
                scaleX: 0.1,
                scaleY: 3,
                tint: 0x3c6529,
            },
            {
                x: 175,
                y: 683,
                scaleX: 0.25,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 176,
                y: 201,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 16,
                y: 335,
                scaleX: 0.1,
                scaleY: 0.1,
                tint: 0x3c6529,
            },
            {
                x: 750,
                y: 593,
                scaleX: 2.79,
                scaleY: 1.25,
                tint: 0x3c6529,
            },
            {
                x: 280,
                y: 745,
                scaleX: 0.05,
                scaleY: 6,
                tint: 0x3c6529,
            },
            {
                x: 340,
                y: 712,
                scaleX: 0.05,
                scaleY: 3.3,
                tint: 0x3c6529,
            },
            {
                x: 580,
                y: 665,
                scaleX: 1.25,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 580,
                y: 750,
                scaleX: 1.25,
                scaleY: 1,
                tint: 0x3c6529,
            },
            {
                x: 835,
                y: 750,
                scaleX: 0.05,
                scaleY: 3,
                tint: 0x3c6529,
            },

        ],
        floatingStars: [
            {
                x: 176,
                y: 720,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 149,
                y: 635,
                scaleX: 0.05,
                scaleY: 0.05,
            },
            {
                x: 16,
                y: 627,
                scaleX: 0.05,
                scaleY: 0.05,
            },
        ],

        stars: [],
        portals: [],
        waters: [
            {
                x: 643,
                y: 653,
                scaleX: 3.3,
                scaleY: 9.3,
            },
        ],
        movingPlatforms: [],
    },
    ToBeContinued: {
        platforms: [],
        floatingStars: [],
        stars: [],
        portals: [],
        waters: [],
        movingPlatforms: [],

    },
    QuagBallIntro: {
        platforms: [],
        floatingStars: [],
        stars: [],
        portals: [],
        waters: [],
        movingPlatforms: [],
    }

}

