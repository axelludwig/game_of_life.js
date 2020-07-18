// classes

class Cell {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
        this.nextState;
    }
}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// setup

const width = 800;
const height = 800;
const resolution = 40;
const stateCellsRate = 0.4;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
fillCanvas('white')

var run = false;

var array = generateFirstCells();
drawCells(array);

// var pos = getPos(array[5][4])
// drawCell(array[5][4])


function Loop() {
    runNextTurn();
    setTimeout(() => {
        if (run) {
            Loop();
        }
    }, 100);
}



////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


// cells

function generateFirstCells() {
    var array = [];
    for (var i = 0; i < width; i += resolution) {
        var temparray = []
        for (var j = 0; j < height; j += resolution) {
            if (!isBorder(i, j)) var c = new Cell(i, j, Math.random() < stateCellsRate)
            else var c = new Cell(i, j, false)
            temparray.push(c);
        } array.push(temparray)
    } return array;
}

function isBorder(x, y) {
    if (0 == x || 0 == y || (width - resolution) == x || (height - resolution) == y || (width / resolution) - 1 == x || (height / resolution) - 1 == y) return true;
    else return false;
}

function updateState(cell) {
    cell.state = cell.nextState;
}

function updateNextState(cells, x, y) {
    if (isBorder(x, y)) return;
    var aliveNeighbours = 0;

    if (cells[x - 1][y - 1].state) aliveNeighbours++;
    if (cells[x][y].state) aliveNeighbours++;
    if (cells[x + 1][y - 1].state) aliveNeighbours++;

    if (cells[x - 1][y].state) aliveNeighbours++;
    if (cells[x + 1][y].state) aliveNeighbours++;

    if (cells[x - 1][y + 1].state) aliveNeighbours++;
    if (cells[x][y + 1].state) aliveNeighbours++;
    if (cells[x + 1][y + 1].state) aliveNeighbours++;

    // if alive
    if (cells[x][y].state) {
        if (2 == aliveNeighbours || 3 == aliveNeighbours) cells[x][y].nextState = true
        else cells[x][y].nextState = false
    } else {
        if (3 == aliveNeighbours) cells[x][y].nextState = true
        else cells[x][y].nextState = false
    }
    // console.log(aliveNeighbours, cells[x][y].state, cells[x][y].nextState)
}

function getPos(cell) {
    var x = (cell.x / resolution) - 1;
    var y = (cell.y / resolution) - 1;
    return [x, y]
}

function runNextTurn(cells) {
    for (var i = 0; i < width / resolution; ++i) {
        for (var j = 0; j < height / resolution; ++j) {
            updateNextState(array, i, j)
        }
    }

    for (var i = 0; i < width / resolution; ++i) {
        for (var j = 0; j < height / resolution; ++j) {
            if (!isBorder(i, j)) {
                updateState(array[i][j])
            }
        }
    } drawCells(array)
}

function Run(bool) {
    run = bool
    if (bool) Loop();
}

function Reset() {
    array = generateFirstCells();
    drawCells(array);
}

// draw functions


function fillCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, height, width);
}

function drawPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}

function drawBigPixel(x, y) {
    ctx.fillRect(x, y, resolution, resolution);
}


// draw cells

function drawCell(cell) {
    if (cell.state) ctx.fillStyle = 'black';
    else ctx.fillStyle = 'white';
    ctx.fillStyle = 'red';
    drawBigPixel(cell.x, cell.y)
}

function drawCells(array) {
    array.map((subarray) => {
        subarray.map((cell) => {
            if (cell.state) ctx.fillStyle = 'black';
            else ctx.fillStyle = 'white';
            drawBigPixel(cell.x, cell.y)
        })
    })
}