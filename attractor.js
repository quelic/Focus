// Original code by Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Gravitational Attraction

// Several tweaks done by Quelic Berga

var Attractor = function(x, y, m, name) {

  this.pos = createVector(x, y);
  // setup initial mass
  this.mass = m;
  this.G = 5;
  this.name = name;

  this.calculateAttraction = function(p) {
    // Calculate direction of force
    var force = p5.Vector.sub(this.pos, p.pos);
    // Distance between objects
    var distance = force.mag();
    // do not calculate force if the object is far from the attractor
    if (distance > 200 && this.name != "guide") {
      force.x = 0;
      force.y = 0;
      return force;
    } else {
      // Artificial constraint
      distance = constrain(distance, 10, 35);
      // Normalize vector (distance doesn't matter here, we just want this vector for direction)

      force.normalize();
      // Calculate gravitional force magnitude
      var strength = (this.G * this.mass * p.mass) / (distance * distance);
      // Get force vector --> magnitude * direction
      force.mult(strength);

      return force;
    }
  }

  // Update position to allow movement
  this.update = function(x, y) {
    this.pos = createVector(x, y);
  }

  // Method to display
  this.display = function() {
    ellipseMode(CENTER);
    // Draw different objects in different ways: attractors and the guide look different
    if (this.name != "guide") {
      ellipseMode(CENTER);
      noStroke();
      // fill according to the mas and position
      fill(this.pos.x % 256, 10 + this.mass, 156);
    } else {
      strokeWeight(4);
      stroke(4);
      noFill();
    }
    ellipse(this.pos.x, this.pos.y, this.mass, this.mass);

  }
}