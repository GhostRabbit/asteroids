let asteroids = []
let lasers = []
let ship
let gameState = "gameOn"
let score = 0
let asteroidAdder

function setup() {
  createCanvas(windowWidth, windowHeight)
  // fullscreen(true)

  ship = new Ship()
  for (var i = 0; i < 10; i++) {
    asteroids.push(newAsteroid())
  }
  asteroidAdder = setInterval(function () {
    if (gameState === 'gameOver') {
      clearInterval(asteroidAdder)
    } else {
      asteroids.push(newAsteroid())
    }
  }, 3000);

}

function draw() {
  if (gameState === "gameOn") {
    incrementGameState()

    background(0)
    drawObjects()
    drawScore()
  } else if (gameState === "gameOver") {
    drawGamwOver()
  }
}

function drawObjects() {
  noFill()
  stroke(255)
  strokeWeight(2)

  asteroids.forEach(a => a.render())
  lasers.forEach(l => l.render())

  fill(0);
  ship.render()
}

function incrementGameState() {
  // Update game objects
  ship.update()
  lasers.forEach(l => l.update())
  asteroids.forEach(a => a.update())

  // Collision detection
  lasers.forEach(laser => {
    asteroids.forEach(asteroid => {
      if (p5.Vector.dist(laser.pos, asteroid.pos) < asteroid.r) {
        laser.hits()
        asteroid.hits()
        score++;
      }
    })
  })

  lasers = lasers.filter(laser => !laser.toBeRemoved());

  // Split hit asteroids
  asteroids = asteroids.flatMap(asteroid => {
    if (asteroid.hit) {
      return asteroid.split()
    }
    return asteroid
  })


  // Ship hit detection
  asteroids.forEach(asteroid => {
    if (p5.Vector.dist(ship.pos, asteroid.pos) < asteroid.r) {
      // Asteroid hit ship
      gameState = "gameOver"
    }
  })
}

function drawScore() {
  textSize(32)
  textAlign(LEFT)
  stroke(128)
  fill(255)
  text("Score " + score, 20, height - 30)
}

function drawGamwOver() {
  textSize(32)
  textAlign(CENTER)
  stroke(128)
  fill(255)
  text("Game Over", width / 2, height / 2)
}

function keyPressed() {
  if (keyCode === 32) {  // Space
    lasers.push(ship.fire())
    return false //Prevent default behaviours
  }
}