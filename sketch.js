var splashScreen;
var player, playerImg;
var playBtn, InfoBtn;
var spaceship2,spaceship3,spaceship1;
var ufo
var fireballImg, fireball, fireballGroup
var asteroid1,asteroid2;
var backgroundIMG

var enemy, enemyGroup;

var lastFireTime = 0;

var gameState = "wait";
var score = 0;

var speed = 0;
var angle = 0;
var friction = 0.99; 

var health = 300;
var maxHealth = 300;

function preload() {
    splashScreen = loadImage("./assets/SpaceClash.gif")
    playerImg = loadImage("./assets/spaceship 1.png")
    spaceship1 = loadImage("./assets/spaceship 2.png")
    spaceship2 = loadImage("./assets/spaceship 3.png")
    spaceship3 = loadImage("./assets/spaceship 4.png")
    ufo = loadImage("./assets/ufo_3-transformed.png")
    fireballImg = loadImage("./assets/fireball 1.gif")
    asteroid1 = loadImage("./assets/asteroid 1.png")
    asteroid2 = loadImage("./assets/asteroid 2.png")
    backgroundIMG = loadImage("./assets/background.jpeg")
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(240);

    playBtn = createImg("./assets/play.png");
    playBtn.position(windowWidth/2,windowHeight/2);
    playBtn.size(400,200) ;
    playBtn.hide();
    
    InfoBtn = createImg("./assets/info.png");
    InfoBtn.position(windowWidth/2,windowHeight/2+200);
    InfoBtn.size(400,200);
    InfoBtn.hide();

    player = createSprite(windowWidth/12,windowHeight/2);
    player.addImage(playerImg);
    player.scale = 1.5;
    player.visible = false;
    player.rotation = angle;

    enemyGroup = new Group();
    fireballGroup = new Group();

}
function draw() {
    if(gameState == "wait") {
        background(splashScreen);
        playBtn.show();
        InfoBtn.show();
        score = 0;
        health = 300;
        player.visible = false;
    }
    playBtn.mousePressed( () =>{
        gameState = "level1"
        playBtn.hide()
        InfoBtn.hide()
    })
    InfoBtn.mousePressed( () =>{
        gameState = "info"
        playBtn.hide()
        InfoBtn.hide()
    })
    if(gameState == "info") {
        aboutGame();
    }
    if(gameState == "level1") {
        background(backgroundIMG);
        player.visible = true;
        playerMovement();
        spawnEnemies();
        if(keyDown("SPACE")){
            fireballSpawn();
            for(var i=0; i<enemyGroup.length; i++){
                if(fireballGroup.isTouching(enemyGroup.get(i))){
                    enemyGroup.get(i).remove();
                    fireballGroup.destroyEach();
                    score += 50;
                }
            }
        }
        for(var i=0; i<enemyGroup.length; i++){
            if(player.isTouching(enemyGroup.get(i))){
                enemyGroup.get(i).remove();
                health -= 100;
            }
        }

        if(score == 100){
            gameState = "level1win";
        }

        if(health == 0){
            gameState = "gamelost"
        }

    }
    if(gameState == "level1win"){
        score= 0;
        health = 300;
        player.visible = false;
        levelWin();
    }
    if(gameState == "level2"){
        background(backgroundIMG);
        player.visible =true;
        playerMovement();
        spawnEnemies();
        if(keyDown("SPACE")){
            fireballSpawn();
            for(var i=0; i<enemyGroup.length; i++){
                if(fireballGroup.isTouching(enemyGroup.get(i))){
                    enemyGroup.get(i).remove();
                    fireballGroup.destroyEach();
                    score += 25;
                }
            }
        }
        for(var i=0; i<enemyGroup.length; i++){
            if(player.isTouching(enemyGroup.get(i))){
                enemyGroup.get(i).remove();
                health -= 150;
            }
        }

        if(score == 100){
            gameState = "gamewin";
            enemyGroup.destroyEach();
            player.visible = false;
            fireballGroup.destroyEach();
        }

        if(health == 0){
            gameState = "gamelost";
            enemyGroup.destroyEach();
            player.visible = false;
            fireballGroup.destroyEach();
        }

    }
    if(gameState == "gamelost"){
        score= 0;
        health = 300;
        player.visible = false;
        gameOver();
    }
    if(gameState == "gamewin"){
        gameWin();
        score = 0;
        health = 300;
        player.visible = false;
    }
    drawSprites();

    if(gameState == "level1" || gameState == "level2"){
        textSize(80);
        fill("white");
        text("Score: "+score, windowWidth/1.2, windowHeight/12);
        healthBar();
    }

    if(gameState == "level1"){
        textSize(80);
        fill("white");
        text("Level 1", windowWidth/2,windowHeight/12);
    }
    if(gameState == "level2"){
        textSize(80);
        fill("white");
        text("Level 2", windowWidth/2,windowHeight/12);
    }
   


}
function aboutGame() {
    swal({
        title : "About Game",
        text : "Use arrows keys to move and defeat the enemy. Use space button to shoot the enemy so it can be defeated.",
        textAlign : "center",
        imageUrl : "./assets/SpaceClash.gif",
        imageSize : "200x200",
        confirmButtonText : "Go Back To Main Screen",
        confirmButtonColor: "turquoise"
    },
    function(){
        gameState = "wait"
    })
} 

function spawnEnemies() {
    var rand = Math.round(Math.random()*3+1)   // 0&1 0, 0.01, 0.5, 0.7, 0.000001,1

    var ranX = Math.round(Math.random()*windowWidth-50) ;

    var ranY = Math.round(Math.random()*windowHeight-50) 
    //1,  2, 3, 4
    
   // enemy.visible=false;
    // 5%2 -- remainder - 1   4%2 --- 0
// A, B , C -- case A: case B .... 
//Rohan , Tanay , Arnav --- case Rohan: case Tanay:
    if(frameCount % 500 == 0) {
        enemy = createSprite(windowWidth+200, ranY);
       switch(rand) {

        case 1:
           
            enemy.addImage(ufo)
            
            enemy.positionX = windowWidth/2;
            enemy.positionY = windowHeight/2;
            enemy.velocityX = Math.round(Math.random()*-5);
            //enemy.velocityY = Math.round(Math.random()*-5); 
            enemy.scale = 0.5;
            enemy.Lifetime= 1000;
            break;
        case 2:
            console.log("2")
            enemy.addImage(spaceship2)
          
            enemy.positionX = windowWidth/2;
            enemy.positionY = windowHeight/2;
            enemy.velocityX = Math.round(Math.random()*-5);
          //  enemy.velocityY = Math.round(Math.random()*-5);
            enemy.scale = 0.5;
            enemy.Lifetime= 1000;
            break;
        case 3:
            enemy.addImage(spaceship3)
           
            enemy.positionX = windowWidth/2;
            enemy.positionY = windowHeight/2;
           // enemy.velocityY = Math.round(Math.random()*-5);
            enemy.velocityX = Math.round(Math.random()*-5);
            enemy.scale = 0.5;
            enemy.Lifetime= 1000;
            break;
        case 4:
            enemy.addImage(asteroid2)
           
            enemy.positionX = windowWidth/2;
            enemy.positionY = windowHeight/2;
            //enemy.velocityY = Math.round(Math.random()*-5);
            enemy.velocityX = Math.round(Math.random()*-5);
            enemy.scale = 1;
            enemy.Lifetime= 1000;
            break;
        default:
           
            break;
       }
       enemyGroup.add(enemy);
    } 


    
}

function playerMovement() {
    if (keyIsDown(LEFT_ARROW)) {
        angle -= 1.2; 
    }
    if (keyIsDown(RIGHT_ARROW)) {
        angle += 1.2; 
    }
    if (keyIsDown(UP_ARROW)) {
        speed += 0.05; 
    }

    
    player.rotation = angle;
    player.setSpeed(speed, angle);

    console.log(player.rotation)
    
    speed *= friction;
    if (player.position.x < 0) {
        player.position.x = 0;
    }
    if (player.position.x > width) {
        player.position.x = width;
    }
    if (player.position.y < 0) {
        player.position.y = 0;
    }
    if (player.position.y > height) {
        player.position.y = height;
    }
}

function healthBar() {
    strokeWeight(10);
    stroke("#006400");
    noFill();
    rect(windowWidth/15, windowHeight/15, maxHealth, 20);
 
    noStroke();
    fill("#006400");
    rect(windowWidth/15, windowHeight/15, health, 20);
}

function fireballSpawn() {
    var currentTime = millis();
    if (currentTime - lastFireTime > 500) {
        fireball = createSprite(player.position.x+20,player.position.y+20);
        fireball.addImage(fireballImg);
        fireball.rotation = player.rotation;
        fireball.setSpeed(speed+10, angle);
        fireball.Lifetime = 1000;
        fireballGroup.add(fireball);
        
        lastFireTime = currentTime; // Update last fire time
    }
}

function gameWin() {
    swal({
        title : "You Won!",
        text : "Congratulations you won! Click the button to play again.",
        textAlign : "center",
        imageUrl : "./assets/SpaceClash.gif",
        imageSize : "200x200",
        confirmButtonText : "Restart",
        confirmButtonColor: "turquoise"
    },
    function(){
        gameState = "wait"
    })
}


function gameOver() {
    swal({
        title : "Game Over!",
        text : "You lost! Click the button to try again.",
        textAlign : "center",
        imageUrl : "./assets/SpaceClash.gif",
        imageSize : "200x200",
        confirmButtonText : "Replay",
        confirmButtonColor: "turquoise"
    },
    function(){
        gameState = "wait"
    })
}

function levelWin() {
    swal({
        title : "You Beat Level 1!",
        text : "Congratulations you beat level 1! Click the button to move on.",
        textAlign : "center",
        imageUrl : "./assets/SpaceClash.gif",
        imageSize : "200x200",
        confirmButtonText : "Unlock next level",
        confirmButtonColor: "turquoise"
    },
    function(){
        gameState = "level2"
    })
}