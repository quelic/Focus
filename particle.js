// Create the player
function Particle(x, y, m) {
  this.pos = createVector(x, y);
  // Start with a random velocity
  this.vel = createVector(random(-20, 20), random(-20, 20));
  this.acc = createVector(0, 0);
  this.force = createVector(0, 0);
  this.mass = m;

  // keep memory of old position
  this.oldPos = createVector(0, 0);

  // calculate edges
  this.edges = function() {

    if (this.pos.y > height / 1.1 - 0) {
      this.vel.y = -this.vel.y;
      this.pos.y = height / 1.1;
    }
    if (this.pos.x > width - 0) {
      this.vel.x = -this.vel.x;
      this.pos.x = width;
    }
    if (this.pos.y < 0) {
      this.vel.y = -this.vel.y;
      this.pos.y = 0;
    }
    if (this.pos.x < 0) {
      this.vel.x = -this.vel.x;
      this.pos.x = 0;
    }

  }

  // Update and apply simple fricction
  this.update = function(fric) {
    this.oldPos.x = this.pos.x;
    this.oldPos.y = this.pos.y;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.mult(fric);
    this.acc.set(0, 0);

  }

  // Calculate force and modify acceleration
  this.applyForce = function(force) {
      this.force = force;
      var f = this.force.copy();
      f.div(this.mass);
      this.acc.add(f);
    }
    // represent the object on screen
  this.display = function() {
    strokeWeight(this.mass);
    line(this.pos.x, this.pos.y, this.oldPos.x, this.oldPos.y);
    // if the dot is quite and there is no movement, draw an ellipse instead #bugfix
    if (this.pos.x == this.oldPos.x && this.pos.y == this.oldPos.y) {
      noStroke();
      fill(0, 40);
      ellipse(this.pos.x, this.pos.y, this.mass, this.mass);

    }
  }
}