const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, box2, box3, box4, box5;
var ground;
var pig1, pig2;
var log1, log2, log3, log4;
var bird;
var backgroundImage;
var platform;
var slingshot;
var score = 0;

function preload()
{
    //backgroundImage = loadImage("sprites/bg.png");
    getTime(); //function call
}


function setup()
{
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    box1=new Box(700, 320, 70, 70);   
    box2=new Box(920, 320, 70, 70);
    ground=new Ground(600, height, 1200, 20);   
    pig1 = new Pig(810, 320);
    log1 = new Log(810, 260, 300, PI/2);
    platform = new Ground(150, 315, 300, 150);

    box3 = new Box(700, 240, 70, 70);
    box4 = new Box(920, 240, 70, 70);
    pig2 = new Pig(810, 240);
    log2 = new Log(810, 180, 300, PI/2);

    box5 = new Box(810, 160, 70, 70);
    log3 = new Log(760, 120, 150, PI/7);
    log4 = new Log(870, 120, 150, -PI/7);

    bird = new Bird(204, 66);
    slingshot = new Slingshot(bird.body, {x: 204, y:66});
}

function draw()
{
    if(backgroundImage)
    {
        background(backgroundImage);
    }
    
    textSize(25);
    fill("white");
    text("Score:" + score, width-250, 50);

    Engine.update(engine);

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();
    platform.display();

    box3.display();
    box4.display();
    pig2.display();
    log2.display();

    box5.display();
    log3.display();
    log4.display();

    bird.display();
    slingshot.display();
}

function mouseDragged()
{
    if(slingshot.sling.bodyA === bird.body)
    {
        Matter.Body.setPosition(bird.body, {x: mouseX, y: mouseY});
    }
}

function mouseReleased()
{
    slingshot.fly();
}

function keyPressed()
{
    if(keyCode === 32)
    {
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body, {x: 204, y: 66});
        slingshot.attach(bird.body);
    }
}

async function getTime()
{
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();
    console.log(responseJSON);
    console.log(responseJSON.datetime);

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11, 13);
    console.log(hour);

    if(hour>=06 && hour<=19)
    {
        backgroundImage = loadImage("sprites/bg1.png");
    }
    else
    {
        backgroundImage = loadImage("sprites/bg2.jpg");
    }
}






















