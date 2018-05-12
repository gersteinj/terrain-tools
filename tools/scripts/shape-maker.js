$( document ).ready(function() {
    console.log( "ready!" );
});

var blob = new Path.Circle(view.center, 50);
blob.strokeColor = "black";
blob.strokeWidth = 1;
blob.fillColor = "orchid";

var  clickHitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
}

var moveHitOptions = {
    segments: false,
    stroke: false,
    fill: true
}

var segment, path;
var movePath = false;
var hitResult;

function onMouseMove(event) {
    hitResult = project.hitTest(event.point, clickHitOptions);

    if(hitResult) {
        hitResult.item.selected = true;
    } else {
        project.deselectAll();
    }
}


function onMouseDown(event) {
    segment = path = null;
    // var hitResult = project.hitTest(event.point, clickHitOptions);
    
    if(!hitResult) {
        return;
    }

    if(event.modifiers.shift) {
        if(hitResult.type == 'segment') {
            hitResult.segment.remove();
            path.close();
            path.smooth();
        }
    }

    if (hitResult) {
        console.log(hitResult);
        path = hitResult.item;
        path.selected = true;
        
        if (hitResult.type == 'segment') {
            segment = hitResult.segment;
        } else if(hitResult.type == 'stroke') {
            var location = hitResult.location;
            segment = path.insert(location.index + 1, event.point);
            path.smooth();
        }
    }
}

function onMouseDrag(event) {
    if (segment) {
        segment.point += event.delta;
        path.smooth();
    }
    else if (path) {
        path.position += event.delta;
    }
}
