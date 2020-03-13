const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');
let intersectionEachOthers = false;
//let atAllDots = true;
let d = [];
let scaleRate = 1;
let Cx, Cy, R,
    tempX, tempY, tempR,
    lenX, lenY,
    smallR = 1;
let inpX, inpY;
let enough; //enough to draw circle
let mouse = {
    xPressed : 0,
    yPressed : 0,
    x: 0,
    y: 0,
    xReleased : 0,
    yReleased : 0,
    down: false
};

CANVAS.onmousemove = function (e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
};
CANVAS.onmousedown = function (e) {
    mouse.xPressed = e.offsetX;
    mouse.yPressed = e.offsetY;
    mouse.down = true;
    if (document.forms[0].inputByYourself.checked) {
        let newDot = new Dot(mouse.x, mouse.y);
        d.push( newDot );
        /*
        for (let i = 0; i < dots.length; i++)
            for (let k in dots[i])
                console.log( k  + " " + dots[i][k]);

         */
        CTX.strokeStyle = 'red';
        CTX.beginPath();
        CTX.arc(mouse.x, mouse.y, 1, 0, Math.PI*2, true);
        CTX.stroke();
    }
};
CANVAS.onmouseup = function (e) {
    mouse.xReleased = e.offsetX;
    mouse.yReleased = e.offsetY;
    mouse.down = false;
};
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
function zoom(in_out) {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);
    CTX.fillStyle = "blue";
    CTX.beginPath();
    CTX.scale( (in_out)? scaleRate + 0.25 : scaleRate - 0.25, (in_out)? scaleRate + 0.25 : scaleRate - 0.25 );
    CTX.arc(100, 100, 100, 0, Math.PI*2, true);
    CTX.stroke();
    redraw();
}
function redraw() {

}
function grid(){
    CTX.beginPath();
    CTX.clearRect(0,0, CANVAS.width, CANVAS.height);
}
function dataImport(){
    //let coordinatesStr;
    //ToDo
}
function dataExport(){

}
function clearAll() {
    d = [];
    grid();
}
function built() {
    grid();
    if (d !== [])
        for (let dIndex in d){
            CTX.strokeStyle = 'red';
            CTX.beginPath();
            CTX.arc(d[dIndex].x, d[dIndex].y, 1, 0, Math.PI*2, true);
            CTX.stroke();
        }
    let form = document.forms[0];
    if (form.builtOne.checked)
        builtOne();
    if (form.builtMany.checked)
        builtMany();
}
function builtOne(){
    console.log("build one");
    //two dots
    let k = 0, m = 0, n = 0;
    let max = 0, dist = [ d.length*(d.length-1)/2 ];

    for (let i = 0; i < d.length-1; i++)
    for (let j = i+1; j < d.length; j++) {
        lenX = Math.abs(d[i].x - d[j].x);
        lenY = Math.abs(d[i].y - d[j].y);
        dist[k] = Math.sqrt(Math.pow(lenX, 2) + Math.pow(lenY,2));
        if(max < dist[k]) {
            max = dist[k];	m = i;	n = j;
        }
        k++;
    }
    tempX = (d[m].x + d[n].x)/2;
    tempY = (d[m].y + d[n].y)/2;
    tempR = Math.sqrt(Math.pow(d[m].x - tempX, 2) + Math.pow(d[m].y - tempY, 2));
    enough = true;
    for (let i = 0; i < d.length; i++)
    if ((Math.pow(d[i].x-tempX, 2) + Math.pow(d[i].y-tempY, 2)) > Math.round(tempR*tempR * 100000000.0)/100000000.0 + 0.000000001)
        //if ((Math.pow(d[i].x-tempX, 2) + Math.pow(d[i].y-tempY, 2)) > tempR*tempR)
        enough = false;
    Cx = tempX; Cy = tempY; R = tempR;

    //three dots
    if (!enough) {
        let threeR = max, threeX = 0, threeY = 0;
        console.log("beep");
        for (let i = 0; i < d.length-2; i++)
        for (let j = i+1; j < d.length-1; j++) {
            for (let l = j+1; l < d.length; l++) {
                Cx = -(d[i].y*(d[j].x*d[j].x + d[j].y*d[j].y - d[l].x*d[l].x - d[l].y*d[l].y) +
                    d[j].y*(d[l].x*d[l].x + d[l].y*d[l].y - d[i].x*d[i].x - d[i].y*d[i].y) +
                    d[l].y*(d[i].x*d[i].x + d[i].y*d[i].y - d[j].x*d[j].x - d[j].y*d[j].y))/
                    (2*(d[i].x*(d[j].y-d[l].y) + d[j].x*(d[l].y - d[i].y) + d[l].x*(d[i].y - d[j].y)));
                Cy = (d[i].x*(d[j].x*d[j].x + d[j].y*d[j].y - d[l].x*d[l].x - d[l].y*d[l].y) +
                    d[j].x*(d[l].x*d[l].x + d[l].y*d[l].y - d[i].x*d[i].x - d[i].y*d[i].y) +
                    d[l].x*(d[i].x*d[i].x + d[i].y*d[i].y - d[j].x*d[j].x - d[j].y*d[j].y))/
                    (2*(d[i].x*(d[j].y-d[l].y) + d[j].x*(d[l].y - d[i].y) + d[l].x*(d[i].y - d[j].y)));
                R = Math.sqrt( Math.pow(d[i].x - Cx, 2) + Math.pow(d[i].y - Cy, 2));

                enough = true;
                for (let iter = 0; iter < d.length; iter++)
                //if ((Math.pow(d[iter].x-Cx, 2) + Math.pow(d[iter].y-Cy, 2)) > Math.round(R*R * 100000000.0)/100000000.0)
                if ((Math.pow(d[iter].x-Cx, 2) + Math.pow(d[iter].y-Cy, 2)) > R*R)
                    enough = false;
                console.log("("+d[i].x+";"+d[i].y+") ("+d[j].x+";"+d[j].y+") ("+d[l].x+";"+d[l].y+") " + R + " " + enough);
                if (enough && R < threeR) {
                    threeX = Cx;	threeY = Cy;	threeR = R;
                }
            }
        }

        Cx = threeX;	Cy = threeY;	R = threeR;
        console.log(R);
    }
    CTX.strokeStyle = 'blue';
    CTX.beginPath();
    CTX.arc(Cx, Cy, R, 0, Math.PI*2, true);
    CTX.stroke();
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


