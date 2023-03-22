var objects = [];
var statusAtual = false;

function preload(){
    video = createVideo("video.mp4");
}

function setup(){
    canvas = createCanvas(480, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.querySelector("#Status").innerHTML = "Status: Detectando Objeto";
    document.querySelector("#NumeroObjetos").innerHTML = "CARREGAMENTO : Carregando Video";
}

function modelLoaded(){
    console.log("Modelo Carregado!");
    video.loop();
    video.speed(1);
    video.volume(0);
    statusAtual = true;
}

function gotResults(error, result){
    if(error){
        console.error(error);
    }
    else{
        objects = result;
        console.log(result);
    }
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(statusAtual){
        objectDetector.detect(video, gotResults);
        for(var i=0; i<objects.length; i++){
            document.querySelector("#Status").innerHTML = "Status: Objeto Detectado";
            document.querySelector("#NumeroObjetos").innerHTML = "Quantidade De Objetos Detectados: "+objects.length;
            confidence = floor(objects[i].confidence*100);
            label = objects[i].label;
            x = objects[i].x-50;
            y = objects[i].y;
            w = objects[i].width;
            h = objects[i].height;
            text(label+" "+confidence+"%", x, y);
            stroke("#FF0000");
            noFill();
            rect(x, y, w, h)
        }
    }
}