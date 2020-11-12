 //variable
var monkey , monkey_running,monkey_stop;
var banana ,bananaImage,fruit,fruit2, obstacles,obstacle, obstacleImage,food,fruits;
var foodGroup, obstacleGroup;
var background,backgroundImage,GameOverSound,gameover;
var survivalTime=0,score;
var ground, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload()
{
 backgroundImage = loadImage("background0.png");
  groundImage=loadImage("ground2.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collided=loadAnimation("sprite_0.png","sprite_1.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  fruit = loadImage("fruit.png");
  fruit2 = loadImage("fruit2.png");
  
  gameoverImage = loadImage("gameover.png")
   GameOverSound=loadSound("GameOver.mp3")
}


function setup() 
{
  createCanvas(600, 600);
  background = createSprite(0,150,600,600);
  background.addImage(backgroundImage)
  background.scale = 2.5
  
  ground = createSprite(600,570,400,20);
  ground.addImage("ground",groundImage);
  //ground.velocityX=-4
  ground.x = ground.width /2;
  
  ground.visible=false;
  
  monkey=createSprite(120,500,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.2
  
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  score=0
  
  //to set collider
  monkey.setCollider("rectangle",0,0,200,400);
  
}


function draw() 
{

  
   //  ground
  background.velocityX = -3 ;
    if (background.x < 0)
    {
      background.x = background.width/2;
    }
  
  //to jump
  if(keyDown("space") && monkey.y >=500)
    {
      monkey.velocityY=-15  
    }
  
  monkey.velocityY=monkey.velocityY+0.8
  
  monkey.collide(ground)
  
  //gameState
  if(gameState === PLAY)
{
    if(foodGroup.isTouching(monkey))
    {
        foodGroup.destroyEach();
        score=score+2;
    }
    
    else if(obstaclesGroup.isTouching(monkey))
    {
       obstaclesGroup.destroyEach();
          gameState=END;
        GameOverSound.play();
    }
}  
  
 if (gameState === END) 
{
     
     foodGroup.setLifetimeEach(0);
     obstaclesGroup.setLifetimeEach(0);
    
     background.velocityX = 0 ;
     gameover=createSprite(300,300)
     gameover.scale=1.5;
     gameover.addImage(gameoverImage)
  
      
}
  

  monkey.collide(ground);
  
  //function for fruit
  food();
  //function for obstacles
  obstacle();
  
  drawSprites();
  
  //text for score
  stroke("white")
  textSize(20)
  fill("white")
  text("score:"+score,500,50)
  
  //text for survivalTime
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime= Math.round(frameCount/frameRate())
  text("survivalTime:"+survivalTime,50,50)
}

 //function for food
function food()
{
   if(World.frameCount%80===0)
  {
    fruits=createSprite(670,350,20,20);
    fruits.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,3));
    if(r == 1)
    {
      fruits.addImage(bananaImage);
    }
    
    else if(r == 2)
    {
      fruits.addImage(fruit);
    }
    
    else if(r == 3)
    {
      fruits.addImage(fruit2);
    }
    
    fruits.velocityX=-7;
    fruits.lifetime=80;
    
   foodGroup.add(fruits);
    }
}

 //function for obstacle
function obstacle()
{
  if(World.frameCount%90===0)
  {
    obstacles=createSprite(670,550,20,20);
    obstacles.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,2));
    if(r == 1)
    {
      obstacles.addImage(obstacleImage);
    }
    
    else if(r == 2)
    {
      obstacles.addImage(obstacleImage);
      
    }
    
    obstacles.velocityX=-7;
    obstacles.lifetime=100;
    
   obstaclesGroup.add(obstacles);
    }
}

