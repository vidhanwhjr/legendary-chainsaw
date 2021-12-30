status1 = "";
objects = [];
function preload(){
    img = loadImage('Rc.jpg');
}
function setup(){
    canvas = createCanvas(600, 600);
    canvas.center();

    object_dectector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status- dectecting objects";
}

function modelLoaded(){
    console.log("model loaded");
    status1 = true;
    object_dectector.detect(img, gotResults);
}

function gotResults(error, results){
   if(error){
       console.error(error);
   }
   else{
       console.log(results);
       objects = results;
   }
}

function draw(){
    image(img, 0, 0, 600, 600);
        if(status1 != ""){
            for(i = 0; i < objects.length; i++){
                accuracy = floor(objects[i].confidence*100);
                fill("#FF0000");
                text(objects[i].label + " " + accuracy + "%",objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke('#FF0000');
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                }
            document.getElementById('no_of_objects_detected').innerHTML = "There are 6 big objects that the cocossd model had to detect out of which it has detected" + i + " objects";
        }
}