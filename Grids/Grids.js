Grid_Proto = function (sx, sy,cell_size) {
    this.size = { x: sx, y: sy, cell : cell_size||1 }
}

Grid = function (sx, sy, init) {
    Grid_Proto.call(this, sx, sy, 1)
    this.cells = []
    console.log(this.size)

    for (let i = 0; i < this.size.x*this.size.y; i++) {
        this.cells[i] = init
    }
}
Grid.prototype = new Grid_Proto()

UInt8ClampedGrid = function (sx, sy, cell_size) {
    Grid_Proto.call(this, sx, sy, cell_size)
    this.cells = new Uint8ClampedArray(sx * sy * cell_size)
    
}
UInt8ClampedGrid.prototype = new Grid_Proto()


Grid_Proto.prototype.get_cell = function (x, y, cell) {
    if (x < 0 || y > this.size.y || y < 0 || cell < 0 || cell > this.size.cell - 1)
        return undefined
    return this.cells[(x * this.size.y + y) * this.size.cell + cell||0]
}
Grid_Proto.prototype.set_cell = function (x, y, cell,value) {
    if (x < 0 || y > this.size.y || y < 0 || cell < 0 || cell > this.size.cell - 1)
        return undefined
    index = (x * this.size.y + y) * this.size.cell + cell||0
    this.cells[index] = value
    return this.cells[index]
}
Grid_Proto.prototype.dist = function (x1, y1, x2, y2) {
        var x = x1 - x2
        var y = y1 - y2
        return Math.sqrt(x*x+y*y)
}
Grid_Proto.prototype.manhat = function (x1, y1, x2, y2) {
        return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
Grid_Proto.prototype.maxhat = function (x1, y1, x2, y2) {
        return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2))
}

