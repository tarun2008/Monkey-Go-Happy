
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg;
var score=0;
function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  player_collided = loadImage("sprite_4.png");
  bgImg = loadImage("jungle.jpg")
}



function setup() {

  
  
  bg= createSprite(400,40);
  bg.velocityX=-4;  
  bg.addImage(bgImg)
  bg.scale=0.9
  score=0;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  player = createSprite(100,340,20,50);
  player.addAnimation("monkey", monkey_running);
  player.scale=0.1;
  player.addAnimation("collided", player_collided);
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;  
  ground.visible=false;
  
  
  
}


function draw() {
createCanvas(600,400);
background("white");
text("Score: "+ score, 500,50);

  if (gameState===PLAY){

    

       player.collide(ground);

       if (ground.x < 300){
             ground.x = ground.width/2;

           }

           if (bg.x < 150){
            bg.x = bg.width/2.3;

          }
          
    
       if(keyDown("space")&& player.y >= 300) {

            player.velocityY = -15;

           }

           player.velocityY = player.velocityY + 0.8
                 
       if(player.isTouching(FoodGroup)){

            FoodGroup.destroyEach();
            score=score+1;
            player.scale +=+0.1

          }

      else if(obstacleGroup.isTouching(player)){

            gameState = END
            text("Game Over ", 500,50);
          }

            banana();
            obstacle();
            
           
          }

  else if (gameState === END) {

      ground.velocityX = 0;
      player.velocityY = 0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      player.changeAnimation("collided",player_collided);
      bg.velocityX=0;

  }
 
  drawSprites();

}

function banana (){
  
 if(World.frameCount%80===0){ 
var banana=createSprite(400,100,20,20);
 banana.addImage(bananaImage);
 banana.scale=0.1
 banana.y=Math.round(random(150,250)); 
 banana.velocityX=-4;
 banana.setlifetime=410;
   
FoodGroup.add(banana);  
}
}

function obstacle (){
  
 if(World.frameCount%300===0){ 
var obstacle=createSprite(400,100,20,20);

 obstacle.addImage(obstaceImage);
 obstacle.scale=0.2;
 obstacle.y=315;  
 obstacle.x=Math.round(random(300,400)); 
 obstacle.velocityX=-4;
 obstacle.setlifetime=1;
 obstacle.setCollider("circle",0,0,130);
 
   
obstacleGroup.add(obstacle);  
}
}


