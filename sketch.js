var road, roadImg;
var player, playerAnimation;
var cash, gold, ruby, diamond, hole;
var cashImg, goldImg, rubyImg, diamondImg, holeImg;
var cashG, goldG, rubyG, diamondG, holeG;
var boundaryLeft, boundaryRight;
var gameOver, gameOverImg;
var restart, restartImg;
var score = 0;

// Game State variable
var gameState = "play";


function preload() {
    // Loading the images and animation.
    roadImg = loadImage("Road.png");
    playerAnimation = loadAnimation("player1.png", "player2.png");
    cashImg = loadImage("cash.png");
    goldImg = loadImage("gold.png");
    rubyImg = loadImage("ruby.png");
    diamondImg = loadImage("diamond.png");
    holeImg = loadImage("hole.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    // Creating the road
    road = createSprite(width/2, 200);
    road.addImage(roadImg);
    road.scale = 3;
    road.velocityY = 0;

    // Creating the player
    player = createSprite(width/2, height-100, 50, 50);
    player.addAnimation("playerRunning", playerAnimation);
    player.scale = 2;
    player.setCollider("rectangle", 0, 0, 20, 60);

    // Creating the boundaries
    boundaryLeft = createSprite(width/5.8, height/2, 20, height);
    boundaryRight = createSprite(width/1.21, height/2, 20, height);
    boundaryLeft.visible = false;
    boundaryRight.visible = false;

    // Creating the GAME OVER sign
    gameOver = createSprite(width/2, height/2);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 3;

    // Creating the RESTART button
    restart = createSprite(width/2, (height/2) + 150);
    restart.addImage(restartImg);
    restart.scale = 0.7;

    // Create the groups for the loot
    cashG = new Group();
    goldG = new Group();
    rubyG = new Group();
    diamondG = new Group();
    holeG = new Group();
}

function draw() {

    background(0);

    // The Game State PLAY
    if(gameState == "play") {

        // Making the GAME OVER and RESTART images invisible
        gameOver.visible = false;
        restart.visible = false;

        // Make the player move
        if(keyDown(LEFT_ARROW)) {
            player.x = player.x - 7;
        }
        if(keyDown(RIGHT_ARROW)) {
            player.x = player.x + 7;
        }

        // Make the road move
        road.velocityY = 3;

        // Make the player visible
        player.visible = true;

        // Make the player collide with the boundaries
        player.collide(boundaryLeft);
        player.collide(boundaryRight);

        // Make the road infinite
        if(road.y > height) {
            road.y = height/2;
        }

        // Generating loot
        createCash();
        createGold();
        createRubies();
        createDiamonds();
        createHoles();

        // Adding up the score when you get loot
        if(cashG.isTouching(player)) {
            cashG.destroyEach();
            score = score + 50;
        }
        else if(goldG.isTouching(player)) {
            goldG.destroyEach();
            score = score + 100;
        }
        else if(rubyG.isTouching(player)) {
            rubyG.destroyEach();
            score = score + 150;
        }
        else if(diamondG.isTouching(player)) {
            diamondG.destroyEach();
            score = score + 200;
        }

        // Code for if the holes are touched
        else {
            if(holeG.isTouching(player)) {
                gameState = "end";
            }
        }
    }

    if(gameState == "end") {

        // Making the player disappear
        player.visible = false;
        player.x = width/2;

        // Stooping the moving road
        road.velocityY = 0;

        // Destroying loot
        cashG.destroyEach();
        goldG.destroyEach();
        rubyG.destroyEach();
        diamondG.destroyEach();
        holeG.destroyEach();

        // Making the GAME OVER and RESTART images reappear
        gameOver.visible = true;
        restart.visible = true;

        // Calling the reset function
        if(mousePressedOver(restart)) {
            reset();
        }
    }
    
    // Draw Sprites
    drawSprites();

    // Creating the score
    textSize(20);
    text("Score: " + score, width/12, height/20);
}

function createCash() {
    if(World.frameCount % Math.round(random(100, 200)) == 0) {
        cash = createSprite(Math.round(random(width/5.3, width/1.25)), 40, 10, 10);
        cash.addImage(cashImg);
        cash.scale = 0.03;
        cash.velocityY = 3;
        cash.lifetime = height/3;
        cashG.add(cash);
    }
}
function createGold() {
    if(World.frameCount % Math.round(random(200, 300)) == 0) {
        gold = createSprite(Math.round(random(width/5.3, width/1.25)), 40, 10, 10);
        gold.addImage(goldImg);
        gold.scale = 0.05;
        gold.velocityY = 3;
        gold.lifetime = height/3;
        goldG.add(gold);
    }
}
function createRubies() {
    if(World.frameCount % Math.round(random(300, 400)) == 0) {
        ruby = createSprite(Math.round(random(width/5.3, width/1.25)), 40, 10, 10);
        ruby.addImage(rubyImg);
        ruby.scale = 0.05;
        ruby.velocityY = 3;
        ruby.lifetime = height/3;
        rubyG.add(ruby);
    }
}
function createDiamonds() {
    if(World.frameCount % Math.round(random(400, 500)) == 0) {
        diamond = createSprite(Math.round(random(width/5.3, width/1.25)), 40, 10, 10);
        diamond.addImage(diamondImg);
        diamond.scale = 0.03;
        diamond.velocityY = 3;
        diamond.lifetime = height/3;
        diamondG.add(diamond);
    }
}
function createHoles() {
    if(World.frameCount % Math.round(random(100, 500)) == 0) {
        hole = createSprite(Math.round(random(width/5.3, width/1.25)), 40, 10, 10);
        hole.addImage(holeImg);
        hole.scale = 0.2;
        hole.velocityY = 3;
        hole.lifetime = height/3;
        holeG.add(hole);
    }
}

function reset() {
    score = 0;
    gameState = "play";
}
 