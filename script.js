const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
let intersectionEachOthers = false;
let oneCircle = true;
let manyCircles = false;
let atAllDots = true;
let choosing = false;
let dots = [];

function grid(scl){
    CTX.clearRect(0,0, CANVAS.width, CANVAS.height);
}
function dataImport(){
    let coordinatesStr;
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
    div.innerText = "Точка №" + 0 + ": x = " + 0 + ", y = " + 0 + ", входить в кола: " + "...";
    statsDiv.append(div);
}
function able_disable() {
    let inputMany = document.getElementsByClassName('many');
    for(i in inputMany)
        if (inputMany[i].disabled)
            inputMany[i].disabled = false;
        else
            inputMany[i].disabled = true;
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

CTX.arc(100, 100, 100, 0, Math.PI*2, true);
CTX.stroke();

let dot = new Dot(5, 6);
for (k in dot)
    console.log( k  + " " + dot[k]);
let mouse = {
    x : 0,
    y : 0,
    down: false
};
window.onmousemove = function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
};
window.onmousedown = function () {
    mouse.down = true;
};
window.onmouseup = function () {
    mouse.down = false;
};
