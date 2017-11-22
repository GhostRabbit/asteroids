class Laser {
  constructor(pos, angle) {
    this.pos = pos
    this.angle = angle
    this.vel = p5.Vector.fromAngle(angle).mult(10)
  }

  render() {
    push()
    translate(this.pos.x, this.pos.y)
    rotate(this.angle)
    line(0, 0, -10, 0)
    pop()
  }

  update() {
    // Return: Is this laser dead (offscreen)?
    this.pos.add(this.vel)

    return this.pos.x < 0 || this.pos.x > width ||
      this.pos.y < 0 || this.pos.y > height
  }
}

