var Timer = function() {
  // set variables
  var newGame = true;

  // Method to display
  this.display = function(limit) {
    // Start the counter
    if (newGame) {
      starting = millis();
      newGame = false;

    }
    //display the progress bar
    noStroke();
    fill(10, 256, 256);
    rect(0, 0, (millis() - starting) / limit * width, 10);
    
    // control if the time is over and create a new game - 1 point
    if (millis() - starting > limit && newGame == false) {
     points--;
     this.reset();
     setGame();
    }

  }
  // Reset the process
  this.reset = function () {
      win = false;
      newGame = true;
  }
}