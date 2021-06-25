class Animal {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`)
  }
}

class Rhino extends Animal {
  constructor() {
    super('Rhino')
  }
}

class Emplyee {
  private name: string
  constructor(name: string) {
    this.name = name
  }
}

let animal = new Animal('Foat')
let rhino = new Rhino()
let employee = new Emplyee('Bob')

animal = rhino