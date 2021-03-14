var ground,ground_img, inviground; 
var trex ,trex_running;
var trex_last;
var cloud, cloud_img;
var cgroup,ogroup;
var obstacle;
var obs_img;
var obs2_img;
var obs3_img;
var obs4_img;
var obs5_img;
var obs6_img;
var score;
var gamestate= "play";
var gameover, gameover_img;
var restart,restart_img;
var js,ds,cs;

function preload(){
  //loading images
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png"); 
  trex_collide = loadAnimation("trex_collided.png")
  ground_img = loadAnimation("ground2.png");
  trex_last = loadAnimation("trex_collided.png")
  cloud_img = loadAnimation("cloud.png")
  obs_img = loadAnimation("obstacle1.png")
  obs2_img = loadAnimation("obstacle2.png")
  obs3_img = loadAnimation("obstacle3.png")
  obs4_img = loadAnimation("obstacle4.png")
  obs5_img = loadAnimation("obstacle5.png")
  obs6_img = loadAnimation("obstacle6.png")
  gameover_img = loadAnimation("gameOver.png")
  restart_img = loadAnimation("restart.png")
  js=loadSound("jump.mp3")
  ds=loadSound("die.mp3")
  cs=loadSound("checkPoint.mp3")

}

function setup(){
  createCanvas(1000,200)
  //create ground
  ground= createSprite(500, 170, 1000, 2);
  ground.addAnimation("img", ground_img);    
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("run", trex_running);
  trex.addAnimation("stop",trex_collide);
  trex.scale=0.5;
  //trex.debug = true;
  

  score=0;
  
  //creating invisible ground
  inviground = createSprite(500,175,1000,2);
  inviground.visible=false;
  
  //adding gameover sprite
  gameover = createSprite(400,80);
  gameover.visible = false;                                             gameover.addAnimation("gameover",gameover_img);  
  
  //adding restart 
  restart = createSprite(400,130);
  restart.visible = false;                                             restart.addAnimation("reset",restart_img);  
  
  //creating groups
  cgroup=new Group();
  ogroup=new Group();
  
  trex.setCollider("circle",0,0,50);
}

function draw(){
  background("white")
  
  //gamestate play
  if (gamestate=="play") {
    score = score+1;
    // score=score+Math.round(frameCount/50)
       
     //trexjump
     if( trex.y>140  && (keyDown("space")||keyDown("up_Arrow"))) {
      trex.velocityY = -15;
      js.play(); 
    }
    //trex gravity
    trex.velocityY = trex.velocityY+1;
    
    //making infinite ground
    ground.velocityX= -10;
    //resetting the ground
    if (ground.x<0){
      ground.x = 300 
    }
    
    if (score%100==0){
      cs.play()
    }
    //creating cloud
    createcloud()
    //creating obstacle
    createobstacle()
    
    if(trex.isTouching(ogroup)){
      gamestate="end"
      ds.play();
    }
    
  }
  
  // gamestate end 
  if (gamestate=="end"){
    ground.velocityX=0;
    ogroup.setVelocityXEach(0);
    trex.velocityY=0;
    cgroup.setVelocityXEach(0);
    trex.changeAnimation("stop",trex_collide);
    ogroup.setLifetimeEach(-1)
    cgroup.setLifetimeEach(-1)
    gameover.visible = true;
    restart.visible = true;
    if(mousePressedOver(restart)){
      reset()
    }
    
  }
  text("score:"+score, 500,20)
 
  
  //code debugging
  

  //prevent trex to fall down the screen
  trex.collide(inviground);
  
  
  drawSprites();
}

function reset(){
  gamestate="play";
  score=0
  cgroup.destroyEach();
  ogroup.destroyEach();
  gameover.visible= false;
  restart.visible= false;
}
function createcloud(){
  if (frameCount % 100 === 0) {
    cloud = createSprite(900,50,20,20)
    cloud.velocityX= -10
    cloud.addAnimation("cloud",cloud_img)
    cloud.scale= 0.7
    cloud.lifetime= 350
    var n= Math.round(random(10,30))
    cloud.y=n
    cgroup.add(cloud)
  }
}


function createobstacle(){
  if (frameCount % 60 === 0 ) {
    obstacle = createSprite(900,160,40,50)
    obstacle.velocityX= -10
    obstacle.scale= 0.6
    obstacle.lifetime=250
    var r= Math.round(random(1,6))
    //obstacle.debug = true; 
    switch(r){
      case 1: obstacle.addAnimation("obstacle",obs_img);
              break;
      case 2: obstacle.addAnimation("obstacle",obs2_img);
              break;
      case 3: obstacle.addAnimation("obstacle",obs3_img);
              break;        
      case 4: obstacle.addAnimation("obstacle",obs4_img);
              break;  
      case 5: obstacle.addAnimation("obstacle",obs5_img);
              break;        
      case 6: obstacle.addAnimation("obstacle",obs6_img);
              break;

    }
    ogroup.add(obstacle)
  } 
  
}