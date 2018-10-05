
(function(){var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var drawDiv = document.getElementById("drawDiv");
    var mouseDown = {},
        drawRectangle = {},
        dragging = false,
        gridSize = 50;

    for (var i = gridSize; i < 1000; i += gridSize) {
        for (var j = gridSize; j < 600; j += gridSize) {

            drawPoints(i, j, "red");
        }
    }
// used to draw points
    function drawPoints(x, y, color) {
        context.beginPath();
        context.arc(x, y, 2, 0, 2 * Math.PI);
        context.fillStyl2= color;
        context.fill();
        context.closePath();
    }
    function snapToGrid(x, y) {
        var modX = x % (gridSize);
        var modY = y % (gridSize);
        var result = {x: 0, y: 0};
        result.x=modX > gridSize / 2?x + (gridSize - modX):x - modX;
        result.y=modY > gridSize / 2? y + (gridSize - modY):y - modY;
        return result;
    }


    function drawStart(x, y) {
        mouseDown.x = x;
        mouseDown.y = y;
        drawRectangle.left = mouseDown.x;
        drawRectangle.top = mouseDown.y;
        moveDiv();
        showDiv();
        dragging = true;
    }
    function Stretch(x, y) {
        drawRectangle.left = x < mouseDown.x ? x : mouseDown.x;
        drawRectangle.top = y < mouseDown.y ? y : mouseDown.y;
        drawRectangle.width = Math.abs(x - mouseDown.x);
        drawRectangle.height = Math.abs(y - mouseDown.y);
        moveDiv();
        resizeDiv();
    }

    function End() {
        resizeDiv();
        dragging = false;
    }

    function moveDiv() {
        drawDiv.style.top = drawRectangle.top + 'px';
        drawDiv.style.left = drawRectangle.left + 'px';
    }
    function showDiv() {
        drawDiv.style.display = 'inline';
    }
    function resizeDiv() {
        drawDiv.style.width = drawRectangle.width + 'px';
        drawDiv.style.height = drawRectangle.height + 'px';
    }

    canvas.onmousedown = function (e) {
        var x = e.clientX,
            y = e.clientY;
        e.preventDefault();
        var s = snapToGrid(x,y);
        drawStart(s.x, s.y);
    };
    window.onmousemove = function (e) {
        var x = e.clientX,
            y = e.clientY;
        e.preventDefault();
        if (dragging) {
            var g = snapToGrid(x,y);
            Stretch(g.x, g.y);
        }
    };
    window.onmouseup = function (e) {
        e.preventDefault();
        End();
    };





})();
