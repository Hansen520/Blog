class Person1 {
  // protected只能保护
  protected name: string
  protected constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person1 {
  private department: string
  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }
  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}`
  }
}

let howard = new Employee('Howard', 'Sales')
