let font; // Variable for the custom font
let secondFont; 
let textColor; // Current text color
let colorToggle = false; // To toggle between two colors
let fontSize = 32;
let color1 = [0, 0, 255]; 
let color2 = [107, 213, 255]; 
let bgImage;
let star;

function preload() {
  font = loadFont('font/04B_30__.TTF'); 
  secondFont = loadFont('font/PressStart2P-Regular.ttf');
  bgImage = loadImage('images/Artboard 2.png'); 
  star = loadImage('images/Asset 1.png');
  music = loadSound('POL-king-of-coins-short.wav');

}

// Variables for the ball
var ballPosX;
var ballPosY;
var diameter = 25; // Ball size
var xBallChange;
var yBallChange;

// Variables for the paddle
let paddlePosX;
let paddlePosY;
let paddleWidth = 80;
let paddleHeight = 10;
let started = false;
let gameStarted = false; // To track if the game has started

// Game Boy dimensions
let gameboyWidth = 350;
let gameboyHeight = 650;
let screenX, screenY, screenWidth, screenHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Game Boy screen dimensions
  screenWidth = 280;
  screenHeight = 300;

  resetGame(); // Call resetGame function to initialize the game
  
  // Initial paddle position
  paddlePosX = screenWidth / 2 - paddleWidth / 2;
  paddlePosY = screenHeight - 60;
  
  // Initial ball position
  ballPosX = Math.floor(Math.random() * screenWidth);
  ballPosY = 50;
  
  started = false;
  xBallChange = 0;
  yBallChange = 0; // Initially, no movement

  textColor = color1; // Start with color1
}

function draw() {
  background(0, 150, 255); // Light blue background to match the image
  
  fill(255);
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2 + 100, 600, 600);

  image(bgImage, 0, 400, windowWidth, windowHeight);
  if (star) { // Check if the star image loaded successfully
    image(star, windowWidth - 400, -200, 550, 550);
  }

  // Calculate the center of the viewport
  let centerX = windowWidth / 2;
  let centerY = windowHeight / 2;

  // Offsets for positioning the Game Boy
  let offsetX = centerX - gameboyWidth / 2;
  let offsetY = centerY - gameboyHeight / 2;

  // Game Boy Body
  fill(255, 165, 0); // Orange for the body
  stroke(150, 75, 0); // Darker orange stroke for the outline
  strokeWeight(5);
  rect(offsetX, offsetY, gameboyWidth, gameboyHeight, 20); // Main Game Boy body

  // Screen
  fill(0); // Light off-white color for the screen placeholder
  screenX = offsetX + 35;
  screenY = offsetY + 40;
  rect(screenX, screenY, screenWidth, screenHeight); // Centered screen in the body

  // Screen Border
  noFill();
  stroke(200, 100, 50); // Dark orange-brown for the screen border
  strokeWeight(8);
  rect(screenX, screenY, screenWidth, screenHeight); // Border around the screen

  // D-Pad
  fill(200, 100, 50); // Orange for D-pad buttons
  noStroke();
  rect(offsetX + 60, offsetY + 380, 40, 90, 5); // Vertical bar of D-pad
  rect(offsetX + 40, offsetY + 400, 85, 40, 5); // Horizontal bar of D-pad

  // A and B Buttons
  ellipse(offsetX + 300, offsetY + 400, 50); // A Button
  ellipse(offsetX + 250, offsetY + 450, 50); // B Button

  // Start and Select Buttons
  fill(255, 255, 255); // White for Start and Select buttons
  rect(offsetX + 90, offsetY + 520, 70, 15, 10); // Start button
  rect(offsetX + 200, offsetY + 520, 70, 15, 10); // Select button

  // Speaker
  fill(0); // Black for speaker bars
  for (let i = 0; i < 8; i++) {
    rect(offsetX + 120 + i * 25, offsetY + 580, 15, 35); // Speaker grill lines
  }

  // Game inside the Game Boy screen
  push();
  translate(screenX, screenY); // Move everything to the screen coordinates

  if (gameStarted) {
    // Ball bounces off walls inside the screen
    ballPosX += xBallChange;
    ballPosY += yBallChange;

    // Ball collision with screen edges (Game Boy screen border)
    if (ballPosX < diameter / 2 || ballPosX > screenWidth - diameter / 2) {
      xBallChange *= -1;
    }
    if (ballPosY < diameter / 2 || ballPosY > screenHeight - diameter / 2) {
      yBallChange *= -1;
    }

    // Detect collision with paddle
    if ((ballPosX > paddlePosX && ballPosX < paddlePosX + paddleWidth) &&
        (ballPosY + diameter / 2 >= paddlePosY)) {
      yBallChange *= -1;
    }
  }

  // Draw ball
  fill(255);
  noStroke();
  ellipse(ballPosX, ballPosY, diameter, diameter);

  // Draw paddle
  fill(255);
  noStroke();
  rect(paddlePosX, paddlePosY, paddleWidth, paddleHeight);

  pop(); // End the screen transformation

  // Show instructions if the game hasn't started yet
  if (!gameStarted) {
    fill(255);
    textAlign(CENTER);
    textSize(10);
    text("Press SPACE to start", windowWidth / 2, windowHeight / 2 - 10);
  } else {
    // Start playing music when the game starts
    if (!music.isPlaying()) {
      music.play();
    }
  }
  fill(255, 25, 35);
  textFont(font);
  textSize(60);
  textAlign(CENTER, CENTER);
  text("Game\nOn!", offsetX + 760, offsetY + 90);

  // Animate the text color
  if (frameCount % 60 === 0) { // Change color every 60 frames (1 second)
    if (colorToggle) {
      textColor = color1;
    } else {
      textColor = color2;
    }
    colorToggle = !colorToggle; // Toggle the color
  }

  // Draw animated text to the left of the Game Boy
  fill(textColor);
  textFont(font);
  textSize(100);
  textAlign(CENTER, CENTER);
  text("PONG!", offsetX - 280, offsetY + 80); // Position the text to the left of the Game Boy

  // Instruction box
  fill(224, 93, 19, 220);
  stroke(255, 165, 0);
  strokeWeight(3);
  rect(offsetX - 450, offsetY + 200, 380, 400, 20);

  noStroke();
  fill(255); // White color for the text
  textAlign(CENTER, CENTER);
  textFont(secondFont); // Use the second font
  textSize(20);
  text("Welcome to the \nPong Quest!", offsetX - 450 + 200, offsetY + 200 + 50);
  textSize(15);
  text("Dive into a \nnostalgic arcade\n experience that will \n surely take you back\nto your childhood.", offsetX - 450 + 190, offsetY + 250 + 100);
  textSize(20);
  text("How To Play", offsetX - 450 + 190, offsetY + 200 + 250);
  textSize(15);
  text("Use ARROW keys to move", offsetX - 450 + 190, offsetY + 200 + 300); // Centered text in the instruction box
  text("Press 'R' to restart", offsetX - 450 + 190, offsetY + 200 + 320); // Centered text in the instruction box
  

}


// Function to reset the game
function resetGame() {
  music.stop();

  // Initial paddle position
  paddlePosX = screenWidth / 2 - paddleWidth / 2;
  paddlePosY = screenHeight - 50;

  // Initial ball position
  ballPosX = Math.floor(Math.random() * screenWidth);
  ballPosY = 50;

  // Reset movement and game state
  xBallChange = 0;
  yBallChange = 0; // No movement before the game starts
  gameStarted = false;
}

// Move paddle with left and right arrow keys
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    paddlePosX -= 50;
    if (paddlePosX < 0) paddlePosX = 0; // Keep paddle inside screen
  } else if (keyCode === RIGHT_ARROW) {
    paddlePosX += 50;
    if (paddlePosX + paddleWidth > screenWidth) paddlePosX = screenWidth - paddleWidth; // Keep paddle inside screen
  }

  // Start the game when the spacebar is pressed
  if (key === ' ') {
    if (!gameStarted) {
      // Initialize ball movement when the game starts
      xBallChange = 5;
      yBallChange = 5;
      gameStarted = true;
    }
  }
  // Restart the game when 'R' is pressed
  if (key === 'r' || key === 'R') {
    resetGame(); // Call resetGame function to restart
  }
}