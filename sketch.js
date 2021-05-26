var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameState;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstaclesGroup;
var ground;
var score = 0;
var monkeySound;
var gameOverSound;

function preload(){  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkey_collided = loadAnimation("monkey_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkeySound = loadSound("monkey.mp3");
 
}



function setup() {
  createCanvas(400,400);
 
  monkey = createSprite(60, 320);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.15;
  
  ground = createSprite(400, 370, 900, 60);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  ground.shapeColor = "brown";
  ground.visible = true;
  
  monkey.setCollider("circle",-150, 80, 200);
   
  
  bananasGroup = createGroup();
  obstaclesGroup = createGroup();
}


function draw() {
   background("cyan");
   fill(151, 20, 250);
   textSize(20);
   text("score : " + score, 300,20);
   console.log("this is ",gameState);
  
  if (gameState === PLAY) {
  if(keyDown("space")&& monkey.y >= 290) {     
      monkey.velocityY = -15;
      monkeySound.play();
   }
    
  if (monkey.y < 240) {
     monkey.changeAnimation("collided", monkey_collided);
  }
    
  if (monkey.y > 300) {
     monkey.changeAnimation("moving", monkey_running);
  }  
  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.7;      
  monkey.collide(ground);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
  if (bananasGroup.collide(monkey)) {
    bananasGroup.destroyEach();
    score = score + 2;
   }
   
  if (obstaclesGroup.isTouching(monkey)) {
    gameState = END;
    //gameOverSound.play();
  }    
  obstacles();
  bananas();
    
  
 } 
  
  else if (gameState === END)  {
       console.log("end");
        
       monkey.changeAnimation("collided", monkey_collided);
    
       obstaclesGroup.setVelocityXEach(0);
       bananasGroup.setVelocityXEach(0);
       
       obstaclesGroup.setLifetimeEach(-1);
       bananasGroup.setLifetimeEach(-1);
    
       monkey.velocityY = 0;
       ground.velocityX = 0;
    
       fill("red");
       stroke("lime");
       textSize(30);            
       text("GAME OVER", 100, 100);
       fill(0);
       textSize(20);
       text("click on 'r' to restart" , 110, 150);
 }    
  
  
  if (keyDown("r")) {
    reset();
  }
  
  drawSprites();

}

function obstacles () {
  if (frameCount % 130 === 0) {
    var obstacle = createSprite(600,330,40,10);   
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -(8 + score/3);
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    //adjust the depth
    obstacle.depth = monkey.depth;
    obstacle.depth = monkey.depth + 1;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
}

function bananas () {
   if (frameCount % 65 === 0) {
      var banana = createSprite(600,200,40,10);   
      banana.addImage(bananaImage);
      banana.scale = 0.09;
      banana.velocityX = -(5 + score/2);
    
     
    banana.lifetime = 200;
    
  
    banana.depth = monkey.depth;
    banana.depth = monkey.depth + 1;
    
    bananasGroup.add(banana);

  }

}

function reset () {
  gameState = PLAY;
   
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  
  monkey.changeAnimation("moving", monkey_running);
   
  score = 0;

}


