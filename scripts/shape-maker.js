$( document ).ready(function() {
    // Everything in here will run once the document is ready
    console.log( "ready!" );
    $('.collapsible').collapsible();
    $('.modal').modal();
    $( "#export-button" ).click(function(){
        downloadAsSVG(prompt('Filename?'));
    })
});

// Create the initial blob
var blob = new Path.Circle(view.center, 50);
blob.strokeColor = "black";
blob.strokeWidth = 1;
blob.fillColor = "yellowgreen";

// Options for the hit test
var  hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
}

var segment, path;
var movePath = false;
var hitResult;

var downloadAsSVG = function (fileName) {
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));

    if(!fileName) {
        fileName = "TerrainMaker"
    }

    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}

function onMouseMove(event) {
    hitResult = project.hitTest(event.point, hitOptions);

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
