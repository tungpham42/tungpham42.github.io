/*global define:false, window:false, document:false, console: false, setInterval:false, setTimeout:false, clearInterval:false, CustomEvent:false */
define(["config"], function (config) {
    "use strict";
    
    var context = {},
        scale,
        sel, // current selection
        cfg = config.draw,
        fieldSize = config.game.size;
    
    var animPathTimer,
        animSelectTimer;

    var noPathWarn;
        
    function _drawField(c, field) {
        var grad,
            i,
            offset,
            ctx;
        if (!c) {
            return;
        }
        ctx = c.getContext("2d");

        // draw the field grid
        ctx.beginPath();
        ctx.lineWidth = cfg.cellMargin;
        ctx.strokeStyle = "#eee";
        ctx.shadowColor = "#999";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = (cfg.cellMargin / 2) * scale;
        for (i = 0, offset = cfg.cellMargin / 2; i < field.m + 1; i++, offset += cfg.cellMargin + cfg.cellSize) {
            ctx.moveTo(0, offset);
            ctx.lineTo(c.width / scale, offset);
            ctx.stroke();
        }
        ctx.shadowOffsetX = (cfg.cellMargin / 2) * scale;
        ctx.shadowOffsetY = 0;
        for (i = 0, offset = cfg.cellMargin / 2; i < field.n + 1; i++, offset += cfg.cellMargin + cfg.cellSize) {
            ctx.moveTo(offset, 0);
            ctx.lineTo(offset, c.height / scale);
            ctx.stroke();
        }
        ctx.closePath();
        // final touch -- the rightmost border and the bottom one
        ctx.beginPath();
        ctx.lineWidth = cfg.cellMargin;
        ctx.shadowOffsetX = cfg.cellMargin;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = "#eee";
        ctx.shadowColor = "#999";
        ctx.moveTo(c.width / scale - cfg.cellMargin, 0);
        ctx.lineTo(c.width / scale - cfg.cellMargin, c.height / scale);
        ctx.stroke();
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = cfg.cellMargin;
        ctx.moveTo(0, c.height / scale - cfg.cellMargin);
        ctx.lineTo(c.width / scale, c.height / scale - cfg.cellMargin);
        ctx.stroke();

        ctx.closePath();
    }
    
    function _initCanvas(field) {
        // calculate size
        var cnvs = document.getElementById(field.id),
            w = field.n * (cfg.cellSize + cfg.cellMargin) + cfg.cellMargin * 1.5,
            h = field.m * (cfg.cellSize + cfg.cellMargin) + cfg.cellMargin * 1.5,
            pixRatio = window.devicePixelRatio || 1,
            ctx;
        if (!cnvs) {
            return;
        }
        scale = pixRatio;
        ctx = cnvs.getContext("2d");
        cnvs.width = w * pixRatio;
        cnvs.height = h * pixRatio;
        cnvs.style.width = w + 'px';
        cnvs.style.height = h + 'px';
        if (pixRatio !== 1) {
            ctx.scale(pixRatio, pixRatio);
        }
        ctx.lineJoin = "bevel";
        ctx.lineCap = "square";
        ctx.fillStyle = "#ddd";
        ctx.fillRect(0, 0, w, h);
        _drawField(cnvs, field);
        context[field.id] = { field: field, canvas: cnvs, ctx: ctx };
        
    }
    
    function initCanvas(mfield, nfield) {
        _initCanvas(mfield);
        _initCanvas(nfield);
    }

    function drawBall(id, x, y, r, color) {
        var ctx = context[id].ctx,
            grd = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x - r * 0.2, y - r * 0.2, r / 2);
        grd.addColorStop(0.0, "#f5f5f5");
        try {
            grd.addColorStop(1.0, color);
        } catch (e) {
            console.error("Color", color, e);
        }
        ctx.shadowOffsetX = r * 0.1;
        ctx.shadowOffsetY = r * 0.1;
        ctx.shadowBlur = r * 0.1;
        ctx.strokeStyle = color;
        ctx.fillStyle = grd;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    function eraseCell(id, i, j) {
        var ctx = context[id].ctx,
            cell = context[id].field.$(i, j);
        var x, y;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.strokeStyle = "#ddd";
        ctx.fillStyle = "#ddd";
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(cell.ballX, cell.ballY, cfg.cellSize / 2 - cfg.cellMargin - 1, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    
    function drawNewBalls(colors, field) {
        var i,
            cell;
        for (i = 0; i < 3; i++) {
            cell = field.$(0, i);
            eraseCell(config.NEW_BALLS_CANVAS, 0, i);
            drawBall(config.NEW_BALLS_CANVAS, cell.ballX, cell.ballY, 3 / 10 * cfg.cellSize, colors[i]);
        }
    }

    var animPathState = {
        r: 0,
        path: null,
        color: null,
        stop: true
    };
    
    var evnt = new CustomEvent(
        "moveCompleted",
        {
            detail: {
                ball: null
            },
            bubbles: true,
            cancelable: true
        }
    );

    function animatePath() {
        var r = --animPathState.r,
            cpath = animPathState.path,
            color = animPathState.color,
            k,
            c,
            cnvs = context[config.MAIN_CANVAS].canvas;
        if (r < 0 && r + 2 > 0) {
            if (cpath && cpath[0]) {
                evnt.detail.ball = cpath[0];
                cnvs.dispatchEvent(evnt);
                for (k = 1; k < cpath.length; k++) {
                    c = cpath[k];
                    if (!c.color) {
                        eraseCell(config.MAIN_CANVAS, c.i, c.j);
                    }
                }
            }
        } else if (r > 0) {
            for (k = 1; k < cpath.length; k++) {
                c = cpath[k];
                if (!c.color) {
                    eraseCell(config.MAIN_CANVAS, c.i, c.j);
                    drawBall(config.MAIN_CANVAS, c.ballX, c.ballY, animPathState.r, color);
                }
            }
        }
    }

    var animSelState = {
        ch: 0,
        dir: -1
    };

    function animateSelected() {
        var cell = sel,
            height,
            dir = -1,
            ch = animSelState.ch, // current height
            x,
            y,
            grd,
            ctx = context[config.MAIN_CANVAS].ctx,
            r  = 3 / 10 * cfg.cellSize;
        if (!cell) {
            return;
        }
        height = Math.floor(5 * r / 12);
        x = cell.ballX;
        y = cell.ballY;

        eraseCell(config.MAIN_CANVAS, cell.i, cell.j);
        ch++;
        if (ch === height) {
            ch = 0;
            dir *= -1;
        }
        animSelState.ch = ch;
        animSelState.dir = dir;
        y += ch * dir;
        grd = ctx.createRadialGradient(x - r * 0.2, y - r * 0.2, 0, x - r * 0.2, y - r * 0.2, r / 2);
        grd.addColorStop(0.0, "#f5f5f5");
        try {
            grd.addColorStop(1.0, cell.color);
        } catch (e) {
            console.error("Cell", cell, e);
        }
        ctx.shadowOffsetX = r * 0.1;
        ctx.shadowOffsetY = r * 0.1 + ch;
        ctx.shadowBlur = r * 0.1;
        ctx.strokeStyle = cell.color;
        ctx.fillStyle = grd;
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    
    function moveBall(i, j, path) {
        var start = context[config.MAIN_CANVAS].field.$(i, j);
        var color = start.color;
        var h;
        var dest = path[0];
        start.color = null;
        eraseCell(config.MAIN_CANVAS, i, j);
        dest.color = color;
        drawBall(config.MAIN_CANVAS, dest.ballX, dest.ballY, 3 / 10 * cfg.cellSize, color);
        path.push(start);
        animPathState.r = Math.floor(3 / 10 * cfg.cellSize / 2);
        animPathState.path = path;
        animPathState.color = color;
        animPathState.stop = false;
        animPathTimer = setInterval(animatePath, 100);
    }
    
    function _offset() {
        var elem = document.getElementById("playground"),
            elemBounds = elem.getBoundingClientRect(),
            body = window.document.body,
            offsetTop,
            offsetLeft;

        if (window.getComputedStyle(body).position === "static") {
            offsetLeft = elemBounds.left + window.pageXOffset;
            offsetTop = elemBounds.top + window.pageYOffset;
        } else {
            var bodyBounds = body.getBoundingClientRect();
            offsetLeft = elemBounds.left - bodyBounds.left;
            offsetTop = elemBounds.top - bodyBounds.top;
        }
        return { left: offsetLeft, top: offsetTop };
    }
    
    function warnNoPath() {
        var offset = _offset();
        if (noPathWarn) {
            return;
        }
        noPathWarn = document.createElement("div");
        noPathWarn.style.position = "absolute";
        noPathWarn.style.width = context[config.MAIN_CANVAS].canvas.style.width;
        noPathWarn.style.height = context[config.MAIN_CANVAS].canvas.style.height;
        noPathWarn.style.display = "flex";
        noPathWarn.style.justifyContent = "center";
        noPathWarn.style.alignItems = "center";
        noPathWarn.style.fontWeight = "bold";
        noPathWarn.style.fontSize = "25px";
        noPathWarn.innerHTML = "Cannot move";
        noPathWarn.style.color = "rgb(255, 0, 0)";
        noPathWarn.style.backgroundColor = "rgba(255, 125, 125, 0.5)";
        noPathWarn.style.transitionProperty = "opacity";
        noPathWarn.style.transitionDuration = "1s";
        noPathWarn.style.left = offset.left + "px";
        noPathWarn.style.top = offset.top + "px";
        
        document.body.appendChild(noPathWarn);
        setTimeout(function () {
            document.body.removeChild(noPathWarn);
            noPathWarn = null;
        }, 1000);
        setTimeout(function () {
            noPathWarn.style.opacity = 0;
        }, 20);
    }
    
    document.getElementById(config.MAIN_CANVAS).addEventListener("moveCompleted", function () {
        clearInterval(animPathTimer);
    });
    
    function startAnimateSelection(cell) {
        if (sel) {
            console.log("selection exists", sel, "new: ", cell);
            return;
        }
        sel = cell;
        animSelectTimer = setInterval(animateSelected, 100);
    }
    
    function stopAnimateSelection() {
        sel = null;
        clearInterval(animSelectTimer);
    }
    
    return {
        initCanvas: initCanvas,
        drawBall: drawBall,
        eraseCell: eraseCell,
        moveBall: moveBall,
        drawNewBalls: drawNewBalls,
        startAnimateSelection: startAnimateSelection,
        stopAnimateSelection: stopAnimateSelection,
        warnNoPath: warnNoPath
    };
});
