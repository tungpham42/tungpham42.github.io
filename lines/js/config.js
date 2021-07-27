/*global define:false */
define(function () {
    "use strict";
    
    return {
        MAIN_CANVAS: "playground",
        NEW_BALLS_CANVAS: "nextballs",
        game: {
            size: 9
        },
        draw: {
            cellSize: 50,
            cellMargin: 3,
            colors: [
                "#e50909", // red
                "#04e007", // green
                "#050985", // blue
                "#2c2c2c", // black
                "#ff8040", // orange
                "#b9005c", // magenta
                "#17c6c6"  // lightblue
            ]
        }
    };

});