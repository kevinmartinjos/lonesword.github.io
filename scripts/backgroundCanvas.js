var canvas = document.getElementById("homeCanvas");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


/*Because Vicotor js' original limit requires me to supply 
a goddamn multiplier. It's one shitty library*/
Victor.prototype.limit = function(limit){
  var mag = this.magnitude();
  if(mag * mag > limit * limit){
    this.normalize();
    this.multiply(new Victor(limit, limit));
  }
};

function Boid(x, y){
  this.location = new Victor(x, y);
  // var angle = Math.random() * Math.PI * 2;
  this.velocity = new Victor(Math.random() * 2 - 1, Math.random() * 2 - 1);
  this.acceleration = new Victor(0, 0);
  this.radius = 5.0;
  this.neighbourRadius = 50;
  this.desiredSep = 25;
  this.maxForce = 0.03;
  this.maxSpeed = 2;
  console.log(this.velocity);
}

Boid.prototype.applyForce = function(force){
  this.acceleration.add(force);
};

Boid.prototype.wrapOnBorders = function(){
  var r = this.radius;

  if(this.location.x > canvas.width + r)
    this.location.x = -r;
  else if(this.location.x < -r)
    this.location.x = canvas.width + r;

  if(this.location.y > canvas.height + r)
    this.location.y = -r;
  else if(this.location.y < -r)
    this.location.y = canvas.height + r;
}

Boid.prototype.render = function(){
  context.beginPath();
  context.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
  context.stroke();
  context.closePath();
};

Boid.prototype.seek = function(locationSum){
  var desired = locationSum.clone().subtract(this.location);

  desired.normalize();
  desired.x *= this.maxSpeed;
  desired.y *= this.maxSpeed;

  var steer = desired.clone().subtract(this.velocity);
  steer.limit(this.maxForce);
  return steer;
};

Boid.prototype.cohese = function(boids){
  var locationSum = new Victor(0, 0);
  var count = 0;

  for(var i in boids){
    var boid = boids[i];
    var otherLocation = boid.location.clone();
    var distanceVector = otherLocation.subtract(this.location.clone());
    var distance = distanceVector.magnitude();
    if(distance > 0 && distance < this.neighbourRadius){
      locationSum.add(otherLocation);
      count++;
    }
  }

  if(count){
    //locationSum.divide() does not work due to a bug in victor.js
    locationSum.x /= count;
    locationSum.y /= count;
    return this.seek(locationSum);
  }
  else
    return new Victor(0, 0);
};

Boid.prototype.align = function(boids){
  var totalVelocity = new Victor(0, 0);
  var distanceVector, distance, location, otherLocation;
  var count = 0;

  for(var i=0; i<boids.length; i++){
    otherLocation = boids[i].location.clone();
    location = this.location.clone();
    distanceVector = otherLocation.clone().subtract(location);
    distance = distanceVector.magnitude();
    if(distance && distance < this.neighbourRadius){
      totalVelocity.add(boids[i].velocity);
      count++;
    }
  }

  if(count > 0){
    totalVelocity.x /= count;
    totalVelocity.y /= count;
    totalVelocity.normalize();
    totalVelocity.x *= this.maxSpeed;
    totalVelocity.y *= this.maxSpeed;

    var steer = totalVelocity.clone().subtract(this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }
  else
    return new Victor(0, 0);
};


Boid.prototype.seperate = function(boids){
  var steer = new Victor(0, 0);
  var otherLocation, location, distanceVector, distance;
  var count = 0;

  for(var i=0; i<boids.length; i++){
    otherLocation = boids[i].location.clone();
    location = this.location.clone();
    distanceVector = otherLocation.clone().subtract(location);
    distance = distanceVector.magnitude();
    if(distance > 0 && distance < this.desiredSep){
      distanceVector.normalize();

      //making the distance vector point away from the neighbour
      distanceVector.x *= -1;
      distanceVector.y *= -1;

      //weight by distance
      distanceVector.x /= distance;
      distanceVector.y /= distance;

      steer.add(distanceVector);
      count++;
    }
  }

  if(count > 0){
    steer.x /= count; 
    steer.y /= count;
  }

  if(steer.magnitude() > 0){
    steer.normalize();
    steer.x *= this.maxSpeed;
    steer.y *= this.maxSpeed;
    steer.subtract(this.velocity);
    steer.limit(this.maxForce);
  }

  return steer;

};

(function run(){
  var boidList = [];
  var boidCount = 30;
  var coh = null, sep = null, ali = null;

  for(var i=0; i<boidCount; i++)
    boidList.push(new Boid(Math.random() * canvas.width, Math.random() * canvas.height));

  function mainLoop(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0; i<boidCount; i++){
      coh = boidList[i].cohese(boidList);
      sep = boidList[i].seperate(boidList);
      ali = boidList[i].align(boidList);
      boidList[i].applyForce(coh);
      boidList[i].applyForce(ali);
      boidList[i].applyForce(sep);
      boidList[i].velocity.add(boidList[i].acceleration);
      boidList[i].location.add(boidList[i].velocity);
      boidList[i].acceleration.multiply(new Victor(0, 0));
      boidList[i].wrapOnBorders();
      boidList[i].render();
    }
  }

  setInterval(mainLoop, 1000/60);
}());