// creating the varibles 
var layout

function preload(){
  layoutImg = loadImage("jungle.jpg");
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", 
  "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(1200,550);

  layout = createSprite(400, 200, 1200, 550);
  layout.addImage(layoutImg);
  layout.scale = 1.5;

  ground = createSprite(550,500,width,10);
  ground.shapeColor = "blue";

  monkey = createSprite(100,190,10,10);
  monkey.addAnimation("jfnisbn",monkeyImg);
  monkey.scale = 0.23;
  monkey.velocityY = 9;
  monkey.setCollider("circle",0,0,250);

  score = 0;

  gameState = "start";

  bananaGroup = new Group();
  stoneGroup = new Group();
}

function draw() {
  background(255,255,255); 
  
  monkey.collide(ground);

  if(keyDown("space")){
    gameState = "play";
  }

  if(gameState === "play"){

    if(keyDown(UP_ARROW)){
      monkey.velocityY = -16;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    
    if(frameCount % 70 === 0){
      var rand = 1
      if(rand === 1){
        var banana = createSprite(1210,random(100,450),10,10);
        banana.addImage(bananaImg);
        banana.velocityX = -15;
        banana.scale = 0.12;
        banana.setCollider("circle",0,30,100);
        bananaGroup.add(banana);
        bananaGroup.setLifetimeEach(200);
      }
    }

    if(frameCount % 70 === 0){
      var rand1 = 1
      if(rand1 === 1){
        var stone = createSprite(1210,450,10,10);
        stone.addImage(stoneImg);
        stone.velocityX = -10;
        stone.scale = 0.25;
        stone.setCollider("circle",0,0,100);
        stoneGroup.add(stone);
        stoneGroup.setLifetimeEach(200);
      }
    }

    if(monkey.isTouching(bananaGroup)){
      monkey.scale = monkey.scale + 0.001;
      score = score + 1;
      bananaGroup.destroyEach();
    }
  }


  drawSprites();

  if(monkey.isTouching(stoneGroup)){
    monkey.destroy();
    var gameOver = createSprite(width/2,height/2,10,10);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.9;
  }

  if(score === 30){
    fill("yellow"); 
    textSize(50);
    text(" You Win !! ", 400, height/2); 
    monkey.destroy();
    bananaGroup.setLifetimeEach(1);
    stoneGroup.setLifetimeEach(1);
  }
  
    fill("black"); 
    textSize(30);
    text("Player Score = " + score, 850, 50); 

  if(gameState === "start"){
    fill("orange"); 
    textSize(30);
    text("Welcome to Monkey go happy !!", 400, 100); 

    fill("orange"); 
    textSize(30);
    text("Press space to start the game !!", 400, 150); 

    fill("orange"); 
    textSize(30);
    text("Press the up arrow to make the monkey to jump !! ", 300, 300); 

  }
}