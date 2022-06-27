var PLAY = 1;
var END = 0;
var gameState = PLAY;

var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var score = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  doorsGroup = new Group();
  climbersGroup = new Group();
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost",ghostImg);

  invisibleBlockGroup = new Group();

  score = 0;
  
}

function draw() {
  background(200);
  text("Score: "+ score,500,50);
  ghost.velocityY = -1;
  
  if(gameState === PLAY){
    score = score +Math.round(getFrameRate()/60);
    tower.velocityY = -6;

    /*if(tower.y > 400){
       tower.y = 300;
    }*/

    if(tower.y < 0){
      tower.y = tower.width/2;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 2;
    }  

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 2;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    spawnDoors();
  
    if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
    gameState = END;
  }
}
 else if(gameState === END){
   tower.velocityY = 0;
   ghost.velocityX = 0;

   climbersGroup.setVelocityYEach(0);
   doorsGroup.setVelocityYEach(0);

   climbersGroup.setLifetimeEach(-1);
   doorsGroup.setLifetimeEach(-1);

   if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
     ghost.destroy();
     climber.destroy();
     door.destroy();
   }
  }
 // spawnDoors();
  drawSprites();
}

function spawnDoors(){
  if(frameCount % 240 === 0){
   door = createSprite(200,-50);
   door.addImage(doorImg);
   door.x = Math.round(random(120,400));
   door.velocityY = 1;
   door.lifetime = 800;
   doorsGroup.add(door);

   invisibleBlock = createSprite(200,15);
   //invisibleBlock.width = climber.width;
   invisibleBlock.height = 2;
   invisibleBlock.x = door.x;
   invisibleBlock.velocityY = 1;
   invisibleBlock.debug = true;
   invisibleBlockGroup.add(invisibleBlock);
   
   ghost.depth = door.depth;
   ghost.depth +=1;

   climber = createSprite(200,10);
   climber.addImage(climberImg);
   climber.x = door.x;
   climber.velocityY = 1;
   climber.lifetime = 800;
   climbersGroup.add(climber);
   
  }
}

