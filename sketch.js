var monkey,monkey_running,monkeyCollide;
var ground,invisibleGround;
var banana ,bananaImage,obstacle,obstacleImage;
var bananaGroup,obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running=loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup(){
 createCanvas(600,300);
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
  monkey = createSprite(50,5,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);

  ground = createSprite(340,600,600,10);
  ground.scale = 2.1;
  
  invisibleGround = createSprite(300,278,600,10);
  invisibleGround.visible = true;
}

function draw(){
  background("skyblue");
  fill("darkblue");
  textSize(15);
  text("SURVIVAL TIME: "+score, 450, 20);
  text("Score: "+bananaScore,260,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/80);
    ground.velocityX = -(2+score*1.9/100);
  
    if(keyDown("space")&&monkey.y >= 235 ) {
      monkey.velocityY = -13; 
    }
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++  
      bananaGroup.destroyEach();
    }
    
    if (monkey.isTouching(obstacleGroup)){
       gameState = END;
    }
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide",monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red");
    stroke("brown");
    textSize(30);
    text("GAME OVER !", 200, 170);
    fill("black");
    textSize(15);
    text("Press 'M' to play again", 220, 200);
    
    if (keyDown("M")){
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.changeAnimation("monkey",monkey_running);
    score = 0;
    bananaScore = 0;
    gameState = PLAY; 
    }
  }
  
  drawSprites(); 
  monkey.collide(invisibleGround);
}

function bananas(){
  if (frameCount%80 === 0){
    banana = createSprite(650,150, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.9/100);           
    banana.lifetime = 250;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%90 === 0){
    obstacle = createSprite(620,253,5,5);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.12;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 250;
    obstacleGroup.add(obstacle);
  }
}

