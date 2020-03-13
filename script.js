const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
let cWidth = 800, cHeight = 650;
let intersectionEachOthers = false;
let oneCircle = true;
let manyCircles = false;
let atAllDots = true;
let choosing = false;
let dots = [];
let scaleRate = 1;
let mouse = {
    x : 0,
    y : 0,
    down: false
};
CANVAS.onmousemove = function (e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
};
CANVAS.onmousedown = function () {
    mouse.down = true;
};
CANVAS.onmouseup = function () {
    mouse.down = false;
};

function zoom(in_out) {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "black";
    CTX.beginPath();
    CTX.scale( (in_out)? scaleRate + 0.25 : scaleRate - 0.25, (in_out)? scaleRate + 0.25 : scaleRate - 0.25 );
    CTX.arc(100, 100, 100, 0, Math.PI*2, true);
    CTX.stroke();
    redraw();
}
function redraw() {

}
function grid(){
    CTX.clearRect(0,0, CANVAS.width, CANVAS.height);
    CTX.beginPath();
    CTX.moveTo(75,50);
    CTX.lineTo(100,75);
    CTX.lineTo(100,25);
    CTX.stroke();
}
function dataImport(){
    //let coordinatesStr;
    //ToDo
}
function dataExport(){

}
function clearAll() {
    grid();
}
function built() {
    let form = document.forms[0];
    if (form.builtOne.checked)
        builtOne();
    if (form.builtMany.checked)
        builtMany();
}
function builtOne(){
    console.log("build one");
}
function builtMany(){
    console.log("build many");
}
function addDivStats() {
    let statsDiv = document.getElementById('stats');
    let div;
    div = document.createElement('div');
    div.style.border = "1px solid black";
    div.className = "stats";
    div.innerText = "Точка №" + 0 + ": x = " + 0 + ", y = " + 0 + ", входить в кола: " + "...";
    statsDiv.append(div);
    //ToDo make it for all dots
}
function removeDivStats() {
    let divs = document.getElementsByClassName('stats');
    for (let i = divs.length-1; i >= 0; i--){
        divs[i].remove();
    }
}
function able_disable() {
    let inputMany = document.getElementsByClassName('many');
    for(let i in inputMany)
        inputMany[i].disabled = !inputMany[i].disabled;
}
function statsExport(){

}
class Dot{
    constructor(_x, _y) {
        if (_x !== undefined && _y !== undefined) {
            this.x = _x;
            this.y = _y;
        } else {
            this.x = 0;
            this.y = 0;
        }
        this.r = 0;
        this.diff = 0;
        this.covered = false;
    }
    Diff (_x, _y, _R) {
        this.r = Math.sqrt(Math.pow(this.x - _x, 2) + Math.pow(this.y - _y, 2));
        this.diff = _R - this.r;
    };
}


let dot = new Dot(5, 6);
for (let k in dot)
    console.log( k  + " " + dot[k]);

