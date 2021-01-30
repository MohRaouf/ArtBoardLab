var canvas = document.getElementById("artBoard");
canvas.oncontextmenu = new Function("return false;")
canvas.width = canvas.getBoundingClientRect().width;
canvas.height = canvas.getBoundingClientRect().height;

fillColorInput = document.getElementById("fillColor")
strokeColorInput = document.getElementById("strokeColor")

fillColorInput.value = "#ff0000"
var fillColor = fillColorInput.value;
console.log(fillColor)
strokeColorInput.value = "#ccb7b7"
var strokeColor = strokeColorInput.value;
console.log(strokeColor)

var shape = "line"
var context = canvas.getContext("2d");
var position = { x: 0, y: 0 }
var mouse = { x: 0, y: 0 };

mouseDown=false;

function drawLine(startPosition, endPosition) {
    context.strokeStyle = strokeColor;
    context.lineWidth = 5;
    // draw a red line
    context.beginPath();
    context.moveTo(startPosition.x, startPosition.y);
    context.lineTo(endPosition.x, endPosition.y);
    context.stroke();
}

function drawCircle(startPosition, endPosition) {
    context.beginPath();
    radius = getRadius(startPosition, endPosition)
    context.arc(startPosition.x, startPosition.y, radius, 0, 2 * Math.PI);
    context.lineWidth = 5;
    context.fillStyle = fillColor; //green
    context.strokeStyle = strokeColor;
    context.stroke();
    context.fill();
}
function drawRect(startPosition, endPosition) {
    context.beginPath();
    width =Math.abs(endPosition.x-startPosition.x) ;
    height= Math.abs(endPosition.y-startPosition.y);
    context.rect(startPosition.x, startPosition.y, width, height);
    console.log(width)
    console.log(height)
    context.lineWidth = 5;
    context.fillStyle = fillColor; //green
    context.strokeStyle = strokeColor;
    context.stroke();
    context.fill();
}
function drawEraser(startPosition, endPosition) {
    context.beginPath();
    width =20;
    height= 20;
    context.rect(startPosition.x, startPosition.y, width, height);
    context.lineWidth = 5;
    context.fillStyle = "black"; //green
    context.strokeStyle = "black";
    context.stroke();
    context.fill();
}

function getRadius(pos1, pos2) {
    diffX = pos2.x - pos1.x;
    diffY = pos2.y - pos1.y;
    return Math.sqrt(diffX * diffX + diffY * diffY);
}
document.addEventListener("mousemove", (e) => {
    const bounds = canvas.getBoundingClientRect();
    mouse.x = e.pageX - bounds.left - scrollX;
    mouse.y = e.pageY - bounds.top - scrollY;
    if(mouseDown && shape == "freeHand"){
        drawLine(position,mouse);
        position.x = mouse.x;
        position.y = mouse.y;
    }
    if(mouseDown && shape == "eraser"){
        drawEraser(position,mouse);
        position.x = mouse.x;
        position.y = mouse.y;
    }
    //  console.log(`MouseX = ${this.mouse.x}, MouseY = ${this.mouse.y}`)
});

fillColorInput.addEventListener("change", (e) => {
    fillColor = fillColorInput.value
    console.log(fillColor)
})
strokeColorInput.addEventListener("change", (e) => {
    strokeColor = strokeColorInput.value
    console.log(strokeColor)
})


//detect the mouse down for continous isShooting
canvas.addEventListener('mousedown', (e) => {
    position.x = mouse.x;
    position.y = mouse.y;
    if(shape=="freeHand" || "eraser"){
        mouseDown=true;
    }
})
//detect the mouse down for continous isShooting
canvas.addEventListener('mouseup', (e) => {
    switch (shape) {
        case "line":
            drawLine(position, mouse);
            break;
        case "circle":
            drawCircle(position, mouse);
            break;
        case "rect":
            drawRect(position, mouse);
            break;
        case "eraser":
            drawEraser(position,mouse)
            break;
        case "freeHand":

            break;
    }
    mouseDown=false;
})




$("#line").click(() => {
    shape = "line";
})
$("#circle").click(() => {
    shape = "circle";
})
$("#rect").click(() => {
    shape = "rect";
})
$("#freeHand").click(() => {
    shape = "freeHand";
})
$("#eraser").click(() => {
    shape = "eraser";
})

