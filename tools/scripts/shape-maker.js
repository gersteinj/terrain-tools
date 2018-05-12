// var totalPoints = parseInt(prompt('How many points?'), 10);
var totalPoints = 7;
var userPoints = [];
var textSize = 20;
var infoString = 'Total Points: ' + totalPoints + '\nPoints remaining: ' + (totalPoints - userPoints.length);

var text = new PointText({
    point: new Point(20, 20 + textSize),
    content: infoString,
    justification: 'left',
    fontSize: 30
});


var myPath = new Path();
myPath.strokeColor = 'black';
// myPath.dashArray = [10,5];
var tempPath = new Path();
tempPath.strokeColor = 'red';
tempPath.dashArray = [10,5];
tempPath.closed = true;

function onMouseDown(event) {
    if (userPoints.length < totalPoints) {
        var p = event.point
        userPoints.push(p);
        myPath.add(p);
        tempPath.add(p);
        console.log(p);
        tempPath.smooth();
        infoString = 'Total Points: ' + totalPoints + '\nPoints remaining: ' + (totalPoints - userPoints.length);
        text.content = infoString;
    }
    if (userPoints.length === totalPoints) {
        console.log('got them all!');
        myPath.closed = true;
        myPath.smooth();
        tempPath.remove();
        // myPath.fullySelected = true;
    }
    
}