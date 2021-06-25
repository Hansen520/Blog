let passcode = 'secret1 passcode'

class Employee1 {
  private _fullName: string
  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    // 密码正确则更改用户名
    if (passcode && passcode === 'secret passcode') {
      this._fullName = newName
    } else {
      console.log('Error: Unauthorized update od employee~')
    }
  }
}

let employee1 = new Employee1()
employee1.fullName = 'Bib Smith'
if (employee1.fullName) {
  console.log(employee1.fullName)
}