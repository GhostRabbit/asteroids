class Laser {
  constructor(pos, angle) {
    this.pos = pos
    this.angle = angle
    this.vel = p5.Vector.fromAngle(angle).mult(10)
    this.hit = false
  }

  render() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    line(0, 0, -10, 0)
    pop()
  }

  hits() {
    this.hit = true
  }

  update() {
    this.pos.add(this.vel)
  }

  toBeRemoved() {
    // Is this laser offscreen?
    return this.hit ||
      this.pos.x < 0 || this.pos.x > width ||
      this.pos.y < 0 || this.pos.y > height
  }
}

