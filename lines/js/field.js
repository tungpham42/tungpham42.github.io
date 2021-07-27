/*global define:false */
define(["config"], function (config) {
    "use strict";
    
    function Field(id, m, n) {
        var i, j, k, l,
            cfg = config.draw;

    
        this.field = []; // array, field representation
        this.id = id;
        this.m = m;
        this.n = n;
    
        // field is a linear array of size fieldSize*fieldSize
        // position is calculated as index = x*fieldSize + y
        for (k = 0; k < m * n; k++) {
            i = Math.floor(k / m);
            j = k % m;
            this.field[k] = {
                i: i,
                j: j,
                color: null,
                ballX: i * (cfg.cellMargin + cfg.cellSize) + cfg.cellMargin + cfg.cellSize / 2,
                ballY: j * (cfg.cellMargin + cfg.cellSize) + cfg.cellMargin + cfg.cellSize / 2
            };
        }
    }
    
    Field.prototype.isInside =  function (i, j) {
        return ((i >= 0) && (i < this.m)) &&
                ((j >= 0) && (j < this.n));
    };

    Field.prototype.idx = function (i, j) {
        return i * this.m + j;
    };
    
    Field.prototype.$ = function (i, j) {
        if (this.isInside(i, j)) {
            return this.field[this.idx(i, j)];
        }
        return undefined;
    };
    
    return Field;
        
});