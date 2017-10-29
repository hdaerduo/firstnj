$(document).ready(function () {

    var canvas = document.getElementById('canvas');
    stage = new JTopo.Stage(canvas); // 创建一个舞台对象
    scene = new JTopo.Scene(stage); // 创建一个场景对象

    //显示工具栏  
    showJTopoToobar(stage);

    stage.addEventListener("mouseover", function (event) {

        console.log("鼠标进入");


    });
    stage.addEventListener("mousedrag", function (event) {

        console.log("拖拽");

    });

    stage.addEventListener("mouseup", function (event) {

        if (event.button == 2) {
            console.log('松开右键');

        } else if (event.button == 1) {
            console.log = ('松开中键');
        } else if (event.button == 0) {
            console.log('松开左键');
        }

    });

    stage.addEventListener("mousemove", function (event) {

    });





});


//打印鼠标指针坐标
function writeMessage(oGetMousePos, message) {
    var oContext = oGetMousePos.getContext("2d");
    oContext.clearRect(0, 0, oGetMousePos.width, oGetMousePos.height);
    oContext.font = "20pt Microsoft JhengHei";
    oContext.fillStyle = "tomato";
    oContext.fillText(message, 10, 60);
};


//获取画布中鼠标的位置
function getMousePos(canvas, evt, scene) {
    var rect = canvas.getBoundingClientRect();

    return {
        x: evt.clientX - rect.left * (canvas.width / rect.width) - (scene ? scene.translateX : 0),
        y: evt.clientY - rect.top * (canvas.height / rect.height) - (scene ? scene.translateY : 0)
    }
}


//绘制节点  
function draw(ev, data) {
    var mousePos = getMousePos(stage.canvas, ev, scene);
    var message = "x:" + mousePos.x + ",y:" + mousePos.y;
    console.log(message, data);
    addNode(data, mousePos);

    //防止创建节点后连线  
    nodelist = [];
}

function makeNode(name) {
    var node = new JTopo.Node(name);
    node.setImage("images/" + name + ".jpg");
    return node;
}

//添加节点
function addNode(name, mousePos) {
    var node = makeNode(name);

    node.setLocation(mousePos.x, mousePos.y);
    node.shadow = "true";
    //node.showSelected = "false";
    scene.add(node);
    node.dbclick(function (ev) {
        console.log(node.text + "被点双击了");
    });

    node.click(function (ev) {
        console.log("点击了节点");
        currentSel = node;
    });

    node.mouseup(function (ev) {
        console.log(node.text + "鼠标离开");

        //是否连线
        if (islink) {
            nodelist.push(node);
            if (nodelist.length >= 2 && nodelist[nodelist.length - 1] != nodelist[nodelist.length - 2]) {
                console.log("11");
                linkNode(nodelist[nodelist.length - 1], nodelist[nodelist.length - 2]);
                nodelist = [];

            }
        }
    });
}


//增加连线  
function linkNode(nodeFrom, nodeTo) {
    var link = new JTopo.Link(nodeFrom, nodeTo);
    link.click(function (ev) {
        console.log("点击了连线");
    });
    link.click(function (ev) {
        console.log("点击了连线");
        currentSel = link;
    });

    scene.add(link);
}

//删除节点或者连线
function delNode(node) {
    scene.remove(node);
}

// 简单连线
function newLink(nodeA, nodeZ, text, dashedPattern) {
    var link = new JTopo.Link(nodeA, nodeZ, text);
    link.lineWidth = 3; // 线宽
    link.dashedPattern = dashedPattern; // 虚线
    link.bundleOffset = 60; // 折线拐角处的长度
    link.bundleGap = 20; // 线条之间的间隔
    link.textOffsetY = 3; // 文本偏移量（向下3个像素）
    link.strokeColor = '0,200,255';
    scene.add(link);
    return link;
}

// 折线
function newFoldLink(nodeA, nodeZ, text, direction, dashedPattern) {
    var link = new JTopo.FoldLink(nodeA, nodeZ, text);
    link.direction = direction || 'horizontal';
    link.arrowsRadius = 15; //箭头大小
    link.lineWidth = 3; // 线宽
    link.bundleOffset = 60; // 折线拐角处的长度
    link.bundleGap = 20; // 线条之间的间隔
    link.textOffsetY = 3; // 文本偏移量（向下3个像素）
    link.strokeColor = JTopo.util.randomColor(); // 线条颜色随机
    link.dashedPattern = dashedPattern;
    scene.add(link);
    return link;
}

// 二次折线
function newFlexionalLink(nodeA, nodeZ, text, direction, dashedPattern) {
    var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
    link.direction = direction || 'horizontal';
    link.arrowsRadius = 10;
    link.lineWidth = 3; // 线宽
    link.offsetGap = 35;
    link.bundleGap = 15; // 线条之间的间隔
    link.textOffsetY = 10; // 文本偏移量（向下15个像素）
    link.strokeColor = '0,250,0';
    link.dashedPattern = dashedPattern;
    scene.add(link);
    return link;
}

// 曲线
function newCurveLink(nodeA, nodeZ, text) {
    var link = new JTopo.CurveLink(nodeA, nodeZ, text);
    link.lineWidth = 3; // 线宽
    scene.add(link);
    return link;
}