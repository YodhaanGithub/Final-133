stAtus = "";
objects = [];
AC_image = ""


function preload(){
    ROOM_image = loadImage("room.jpg");
}

function setup(){
    canvas = createCanvas(640,350);
    canvas.position(315,200);
    object_detector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    stAtus = true;
    object_detector.detect(ROOM_image,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(ROOM_image,0,0,700,300);
    if(stAtus != ""){
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";

            fill("cyan");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",objects[i].x, objects[i].y);
            noFill();
            stroke("cyan");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}