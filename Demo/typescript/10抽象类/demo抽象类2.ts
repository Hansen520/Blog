abstract class Department {
  name: string

  constructor(name: string) {
    this.name = name
  }
  printName(): void{
    console.log('Department name ' + this.name)
  }
  abstract printMeeting(): void
}

class AccountinDepartment extends Department {
  constructor() {
    super('Accounting ad Auditing')
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am')
  }

  genterateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department
// 只有实例类型能被实例化，抽象类型不能被实例化
department = new AccountinDepartment()
department.printName()
department.printMeeting()
// 报错，原因是上面已经说了此为Department类型，只要改成AccountinDepartment就不会报错了
// department.genterateReports()

/*打印结果
Department name Accounting ad Auditing
The Accounting Department meets each Monday at 10am
*/