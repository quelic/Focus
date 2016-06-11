/******************************************************************
 * 
 * Focus, the game
 * by Quelic Berga
 * 
 * 
 * Hunt the moving black dot with your gravitational forces and 
 * bring it home (black box) to win a point. 
 * 
 * Time is running and other gravitational forces might interfer. 
 * 
 * Enjoy! 
 * 
 * 
 * It is inspired by the 2st lecture by Daniel Shiffman in the course
 * the nature of code, available on kadenze.com during may'16
 * 
 * Author info at
 * quelic@caotic.net
 * 
 *****************************************************************/


//We define the actors of the scene,
var attractors = [];
var numAtt = 40;
var home;
var cared;
var user;
var home;
var newGame = true;
var points = 0;

// Setup the size and call the function that creates a new game
function setup() {
  createCanvas(1200, 800);
  // create a timmer
  timer = new Timer();
  if (newGame) {
    newGame = false;
    setGame();
  }

  //Several aeshtetic aspects
  colorMode(HSB);
  textSize(950);
  textAlign(CENTER)
  cursor(CROSS);
}

function setGame() {

  newGame = true;

  // place as many attractors as set in numAtt var
  for (i = 0; i < numAtt; i++) {
    attractors[i] = new Attractor(random(width), random(height), random(10, 25));
  }
  // create the user attractor
  attractor = new Attractor(mouseX, mouseY, 70, "guide");
  // place the home somewere in the scene with some margins
  home = new Home(300 + random(width - 600), 300 + random(height - 600), 40);
  // create the ball that have to be driven to the home in another random place. 
  user = new Particle(random(width), random(height), 15);
  timer.reset();
}

// Update player position on each mouse movement
function mouseMoved() {
  attractor.update(mouseX, mouseY);
}

function draw() {
  background(255);
  stroke(0, 230, 0);
  // draw the score
  text(points, width / 2, height - 100);

  // calculate all forces bettwen user and attractors
  for (i = 0; i < attractors.length; i++) {
    //apply a sinus to modify mass and make it funnier
    attractors[i].mass = attractors[i].mass + ((sin((millis() / 350) + attractors[i].pos.x - attractors[i].pos.y)));

    var force = attractors[i].calculateAttraction(user);
    user.applyForce(force);

    attractors[i].display();
  }

  // calulate the guide force to the user.
  var force = attractor.calculateAttraction(user);
  user.applyForce(force);

  // draw the other agents
  attractor.display();
  user.update(0.95);
  user.edges();
  user.display();
  home.display(user);
  // Show the timmer while playing.
  if (win == false) {
    timer.display(7000);
  }
}