$(document).ready(function(){
    init("console");
    init("repeater");
    init("server");
    init("radio");
});

function init(id){
    var canvasSrc = document.getElementById(id);
    var contextSrc = canvasSrc.getContext('2d');
    var image = new Image();
    image.src="images/"+id+".jpg";
    image.onload=function(){
        contextSrc.drawImage(image,0,0);
    }

    contextSrc.fillStyle='#fff';
    contextSrc.font = '10px Adobe Ming Std';
    contextSrc.fillText(id,0,60);

    contextSrc.stroke();
}

function allowDrop(ev){
    ev.preventDefault();
}

//拖拽开始
function drag(ev){
    ev.dataTransfer.setData("Text", ev.target.id);
}

//拖拽结束
function drop(ev){
    //ev.preventDefault();
    var data = ev.dataTransfer.getData("Text");
    //ev.target.appendChild(document.getElementById(data));
    draw(ev,data);
}