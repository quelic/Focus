var win = false;
var time;


var Home = function(x, y, s) {
  // Method to display
  this.display = function(user) {
    // Check if the user is inside the home and set up the win process
    if (user.pos.x > x && user.pos.x < x + s && user.pos.y > y && user.pos.y < y + s && win == false) {
      win = true;
      time = millis();
    }
    // make a growing box to change of game is the user won.
    if (win) {
      fill((millis() / 5) % 256, 256, 206 + 50 * sin(millis() / 250));
      rectMode(CENTER);
      noStroke();
      //Changing the size of the home to fullfill the screen
      s = s * 1.15;
    } else {
      // normal display of the home
      strokeWeight(4);
      stroke(0);
      noFill();

    }

    // once the home is hitted hold 1.5 sec before changing of screen
    if (millis() - time > 1500 && win) {

      win = false;
      // win a point every time a new game is generated
      points++;
      setGame();

    }
    // draw the home
    rect(x, y, s, s);
  }
}