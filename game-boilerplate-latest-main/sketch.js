var splashScreen;
var player, playerImg;
var playBtn, InfoBtn;
var spaceship2,spaceship3,spaceship1;
var ufo
var fireball
var asteroid1,asteroid2;
var backgroundIMG

var gameState = "wait";
var score = 0;

var speed = 0;
var angle = 0;
var friction = 0.99; 

function preload() {
    splashScreen = loadImage("./assets/SpaceClash.gif")
    playerImg = loadImage("./assets/spaceship 1.png")
    spaceship1 = loadImage("./assets/spaceship 2.png")
    spaceship2 = loadImage("./assets/spaceship 3.jpg")
    spaceship3 = loadImage("./assets/spaceship 4.jpg")
    ufo = loadImage("./assets/ufo_3-transformed.png")
    fireball = loadImage("./assets/fireball 1.gif")
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
    player.scale = 0.9;
    player.visible = false;
    player.rotation = angle;

}
function draw() {
    if(gameState == "wait") {
        background(splashScreen);
        playBtn.show();
        InfoBtn.show();
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
    drawSprites()
   
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