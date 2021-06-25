var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    function Department(name) {
        this.name = name;
    }
    Department.prototype.printName = function () {
        console.log('Department name ' + this.name);
    };
    return Department;
}());
var AccountinDepartment = /** @class */ (function (_super) {
    __extends(AccountinDepartment, _super);
    function AccountinDepartment() {
        return _super.call(this, 'Accounting ad Auditing') || this;
    }
    AccountinDepartment.prototype.printMeeting = function () {
        console.log('The Accounting Department meets each Monday at 10am');
    };
    AccountinDepartment.prototype.genterateReports = function () {
        console.log('Generating accounting reports...');
    };
    return AccountinDepartment;
}(Department));
var department;
// 只有实例类型能被实例化，抽象类型不能被实例化
department = new AccountinDepartment();
department.printName();
department.printMeeting();
// 报错，原因是上面已经说了此为Department类型，只要改成AccountinDepartment就不会报错了
// department.genterateReports()
