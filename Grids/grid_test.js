
var grid = new Grid()
var canvas
var ctx
var scale = 2
function init() {
    grid = new Grid(256, 256)
    ugrid = new UInt8ClampedGrid(256,256,4)
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    
    
}
init()

function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function Draw() {
    for (let x = 0; x < grid.size.x; x++) {
        for (let y = 0; y < grid.size.y; y++) {
            ctx.fillStyle = grid.get_cell(x,y,0)
            ctx.fillRect(x * scale, y * scale, scale, scale)
        }
    }
}

function Run_test1() {
    for (let x = 0; x < grid.size.x; x++) {
        for (let y = 0; y < grid.size.y; y++) {
            
            grid.set_cell(x, y,0,"rgb(0," + x + "," + y + ")")
            
        }
    }
    Draw()
}
function Run_test2() {
    for (let x = 0; x < grid.size.x; x++) {
        for (let y = 0; y < grid.size.y; y++) {
            var c = Math.trunc(grid.dist(0,0,x,y))
            grid.set_cell(x, y,0,"hsl(" + (c * c) % 360 + ",100%,50%)")
            
        }
    }
    Draw()
}
function Run_test3() {
    for (let x = 0; x < grid.size.x; x++) {
        for (let y = 0; y < grid.size.y; y++) {
            var c = Math.trunc(grid.manhat(0, 0, x, y))
            grid.set_cell(x, y,0,"hsl(" + (c * c) % 360 + ",100%,50%)")

        }
    }
    Draw()
}
function Run_test4() {
    for (let x = 0; x < grid.size.x; x++) {
        for (let y = 0; y < grid.size.y; y++) {
            var c = Math.trunc(grid.maxhat(0, 0, x, y))
            grid.set_cell(x, y,0,"hsl(" + (c * 5) % 360 + ",100%,50%)")

        }
    }
    Draw()
}
var imgd = ctx.createImageData(grid.size.x, grid.size.y)
//ugrid.cells = imgd.data
//imgd.data = ugrid.cells
var go = true
function Run_test5(i) {
    for (let x = 0; x < grid.size.x; x++) {
        for (let y = 0; y < grid.size.y; y++) {
            var c = Math.trunc(grid.maxhat(128, 128, x, y))
            var rgb = hslToRgb(((c + i / 3) % 360) / 360, 1, .5)
            ugrid.set_cell(x, y, 0, rgb[0])
            ugrid.set_cell(x, y, 1, rgb[1])
            ugrid.set_cell(x, y, 2, rgb[2])
            ugrid.set_cell(x, y, 3, 255)
            /**imgd.data[(x * imgd.width + y) * 4 + 0] = rgb[0]
            imgd.data[(x * imgd.width + y) * 4 + 1] = rgb[1]
            imgd.data[(x * imgd.width + y) * 4 + 2] = rgb[2]
            imgd.data[(x * imgd.width + y) * 4 + 3] = 255**/
            

        }
    }
    ctx.putImageData(imgd,0,0)
    
    if(go){
        requestAnimationFrame(Run_test5)
    }
}