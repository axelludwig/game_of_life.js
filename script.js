class Cell {
    constructor(x, y, alive) {
        this.x = x;
        this.y = y;
        this.alive = alive;
    }

    toString() {
        return this.x + ':' + this.y + ':' + this.alive
    }

    static hello(x) {
        return "Hello ";
    }
}

const width = 800;
const height = 800;
const resolution = 20;

const aliveCellsRate = 0.1;


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

var array = generateFirstCells();
drawCells(array);

function generateFirstCells() {
    var array = [];
    for (var i = 0; i < width; i += resolution) {
        for (var j = 0; j < width; j += resolution) {
            var c = new Cell(i, j, Math.random() < aliveCellsRate)
            array.push(c);
        }
    }
    return array;
}

function drawPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

function drawCells(array) {
    array.map((cell) => {
        if (cell.alive) ctx.fillStyle = 'black';
        else ctx.fillStyle = 'white';
        drawBigPixel(cell.x, cell.y)
    })
}

function drawBigPixel(x, y) {
    ctx.fillRect(x, y, resolution, resolution);
}

function getneighbours(cell) {
    // if (0 === cell.x || )
}

function getCell(x, y, array) {
    for (var i = 0; i < width; i += resolution) {
        for (var j = 0; j < width; j += resolution) {
            if (i == x || j == y) return (i, j);
        }
    }
}

function drawCell(cell) {
    if (cell.alive) ctx.fillStyle = 'black';
    else ctx.fillStyle = 'white';
    drawBigPixel(cell.x, cell.y)
}

function debug() {
    var array = generateFirstCells();
    drawCells(array);
    // ctx.fillStyle = 'red';
    // drawPixel(50, 50)
}