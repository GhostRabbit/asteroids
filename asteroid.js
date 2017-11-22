function newAsteroid() {
  // Do not spawn asteroids too close to ship, give 20% margin
  let pos
  do {
    pos = createVector(random(width * 0.8), random(height * 0.8))
  } while (p5.Vector.dist(pos, ship.pos) < 0.2 * width)
  return new Asteroid(40, pos)
}

class Asteroid {
  constructor(r, pos) {
    this.r = r
    this.pos = pos
    this.vel = p5.Vector.random2D()
    this.angle = 0
    this.angleVel = random(-0.05, 0.05)
    this.shape = []
    var points = random(5, 10)
    for (var i = 0; i < points; i++) {
      const p = p5.Vector.fromAngle(map(i, 0, points, 0, TWO_PI)).mult(this.r * random(0.5, 1.3))
      this.shape.push(p)
    }
  }

  render() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)

    beginShape()
    this.shape.forEach(s => vertex(s.x, s.y))
    endShape(CLOSE)
    pop()
  }

  update() {
    this.pos.add(this.vel)
    this.angle += this.angleVel

    if (this.pos.x < 0) this.pos.x = width
    else if (this.pos.x > width) this.pos.x = 0

    if (this.pos.y < 0) this.pos.y = height
    else if (this.pos.y > height) this.pos.y = 0
  }

  split() {
    if (this.r < 20) return []
    return [new Asteroid(this.r / 2, this.pos.copy()), new Asteroid(this.r / 2, this.pos.copy())]
  }
}
