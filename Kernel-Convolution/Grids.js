Grid_Proto = function (sx, sy, cell_size) {
    ///<summary>The Grid prototype. Not to be use by its own</summary>
    this.size = { x: sx, y: sy, cell : cell_size||1 }
}

Grid = function (sx, sy, initial_value) {
    ///<summary>A basic grid for storing data</summary>
    ///<param name="sx" type="Number" integer="true">The width of the grid</param>
    ///<param name="sy" type="Number" integer="true">The height of the grid</param>
    ///<param name="initial_value">The initial value of the cells</param>
    ///<returns type="Grid">A grid with spesified size</returns>
    Grid_Proto.call(this, sx, sy, 1)
    this.cells = []
    console.log(this.size)

    for (let i = 0; i < this.size.x*this.size.y; i++) {
        this.cells[i] = initial_value
    }
}
Grid.prototype = new Grid_Proto()

UInt8ClampedGrid = function (sx, sy, cell_size) {
    ///<summary>A grid for storing bytes</summary>
    ///<param name="sx" type="number" integer="true">The width of the grid</param>
    ///<param name="sy" type="number" integer="true">The height of the grid</param>
    ///<param name="cell_size" type="number" integer="true">The initial value of the cells</param>
    ///<returns type="Grid">A grid with spesified size</returns>
    Grid_Proto.call(this, sx, sy, cell_size)
    this.cells = new Uint8ClampedArray(sx * sy * cell_size)
    
}
UInt8ClampedGrid.prototype = new Grid_Proto()


Grid_Proto.prototype.get_cell = function (x, y, cell) {
    ///<summary>Get value of a cell</summary>
    ///<param name="x" type="Number" integer="true">The x-coordinate of the cell</param>
    ///<param name="y" type="Number" integer="true">The y-coordinate of the cell</param>
    ///<param name="cell" type="Number" integer="true">The cell index. Defaults to 0.
    ///(only applies if each cell has more than one value))</param>
    ///<returns>The value of the cell</returns>
    cell = cell || 0
    if (x < 0 || y > this.size.y || y < 0 || cell < 0 || cell > this.size.cell - 1)
        return undefined
    index = (x + this.size.x * y) * this.size.cell + cell || 0
    return this.cells[index]
}
Grid_Proto.prototype.set_cell = function (x, y,value, cell) {
    ///<summary>Set value of a cell</summary>
    ///<param name="x" type="Number" integer="true">The x-coordinate of the cell</param>
    ///<param name="y" type="Number" integer="true">The y-coordinate of the cell</param>
    ///<param name="cell" type="Number" integer="true">The cell index. Defaults to 0.
    ///(only applies if each cell has more than one value))</param>
    ///<returns>The value of the cell</returns>
    cell = cell || 0
    if (x < 0 || y > this.size.y || y < 0 || cell < 0 || cell > this.size.cell - 1)
        return undefined
    index = (x + this.size.x * y) * this.size.cell + cell || 0
    
    console.log(index)
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

