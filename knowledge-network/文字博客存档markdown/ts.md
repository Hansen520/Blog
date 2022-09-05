## 基础类型

### 字符串

我们可以使用`string`表示 JavaScript 中任意的字符串

```javascript
let firstname: string = 'Captain'; // 字符串字面量
let familyname: string = String('S'); // 显式类型转换
let fullname: string = `my name is ${firstname}.${familyname}`; // 模板字符串

```

### 数字

支持的十进制整数、浮点数，以及二进制数、八进制数、十六进制数

```javascript
/** 十进制整数 */
let integer: number = 6;
/** 十进制整数 */
let integer2: number = Number(42);
/** 十进制浮点数 */
let decimal: number = 3.14;
/** 二进制整数 */
let binary: number = 0b1010;
/** 八进制整数 */
let octal: number = 0o744;
/** 十六进制整数 */
let hex: number = 0xf00d;

```

较少的大整数，那么我们可以使用`bigint`类型来表示

```javascript
let big: bigint = 100n;
```

**虽然**`number`和`bigint`都表示数字，但是这两个类型不兼容。

### 布尔值

我们可以使用`boolean`表示 True 或者 False

```javascipt
let TypeScriptIsGreat: boolean = true;
let TypeScriptIsBad: boolean = false
```

### Symbol

ts支持Symbol原始类型，即我们可以通过Symbol创建一个独一无二的标记

```javascript
let sym1: symbol = Symbol();
let sym2: symbol = Symbol('42');
```

### Array

我们也可以像 JavaScript 一样定义数组类型，并且指定数组元素的类型

```javascript
// 子元素是数字类型的数组
let arrayOfNumber: number[] = [1, 2, 3];
// 子元素是字符串类型的数组
let arrayOfString: string[] = ['x', 'y', 'z']
```

### 元组类型(Tuple)

```javascript
let tom: [string, number] = ['Tom', 25];

const teacherList: [string, string, number][] = [
    ['dell', 'male', 20],
    ['hansen', 'male', 22]
]
```

### any

any 指的是一个任意类型，它是官方提供的一个选择性绕过静态类型检测的作弊方式

注解为 any 类型的变量进行任何操作，包括获取事实上并不存在的属性、方法，并且 TypeScript 还无法检测其属性是否存在、类型是否正确

不过切记，避免使用any， Any is Hell(Any 是地狱)，因此，除非有充足的理由，否则我们应该尽量避免使用 any ，并且开启禁用隐式 any 的设置。

### unknown

与 any 不同的是，unknown 在类型上更安全。比如我们可以将任意类型的值赋值给 unknown，但 unknown 类型的值只能赋值给 unknown 或 any

```javascript

let result: unknown;
let num: number = result; // 提示 ts(2322)
let anything: any = result; // 不会提示错误
```

### void\undefined\null

这个三个应该用不到

**注意：我们可以把 undefined 值或类型是 undefined 的变量赋值给 void 类型变量，反过来，类型是 void 但值是 undefined 的变量不能赋值给 undefined 类型**

### never

never 表示永远不会发生值的类型

```javascript
function ThrowError(msg: string): never {
  throw Error(msg);
}
```

never 是所有类型的子类型，它可以给所有类型赋值。

```javascript
let Unreachable: never = 1; // ts(2322)
Unreachable = 'string'; // ts(2322)
Unreachable = true; // ts(2322)
let num: number = Unreachable; // ok
let str: string = Unreachable; // ok
let bool: boolean = Unreachable; // ok
```

我们可以把 never 作为接口类型下的属性类型，用来禁止写接口下特定的属性

```javascript
const props: {
    id: number,
    name?: never
} = {
    id: 1
}
 props.name = null // (2322)
 props.name = 'str' // (2322)
 props.name = 1; // (2322)
```

无论我们给 props.name 赋什么类型的值，它都会提示类型错误，实际效果等同于 name 只读

### object

它也是个没有什么用武之地的类型

```javascript
declare function create(o: object | null): any;
create({}); // ok
create(() => null); // ok
create(2); // ts(2345)
create('string'); // ts(2345)
```

### 类型断言

有时候我们遇到TS类型不发检测的情况，如下所示

```javascript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2); // 提示 Type 'undefined' is not assignable to type 'number'
```

解释:greaterThan2 一定是一个数字（确切地讲是 3），因为 arrayNumber 中明显有大于 2 的成员，但静态类型对运行时的逻辑无能为力。

在 TypeScript 看来，greaterThan2 的类型既可能是数字，也可能是 undefined，所以上面的示例中提示了一个 ts(2322) 错误，此时我们不能把类型 undefined 分配给类型 number

不过，我们可以使用一种笃定的方式——**类型断言**

```typescript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```

又使用尖括号 + 类型的格式做类型断言，如下代码所示：

```javascript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = <number>arrayNumber.find(num => num > 2);

```

上两种方式虽然没有任何区别，但是尖括号格式会与 JSX 产生语法冲突，因此我们更推荐使用 as 语法。

此外还有一种特殊非空断言，即在值（变量、属性）的后边添加 '!' 断言操作符，它可以用来排除值为 null、undefined 的情况。这也是类型断言的一种方式方法。

```javascript
let mayNullOrUndefinedOrString: null | undefined | string;
mayNullOrUndefinedOrString!.toString(); // ok
mayNullOrUndefinedOrString.toString(); // ts(2531)
```

在复杂应用场景中，如果我们使用非空断言，就无法保证之前一定非空的值，比如页面中一定存在 id 为 feedback 的元素，数组中一定有满足 > 2 条件的数字，这些都不会被其他人改变。而一旦保证被改变，错误只会在运行环境中抛出，而静态类型检测是发现不了这些错误的。

## 字面量类型、类型推断、类型扩宽和类型缩小

在ts中，我们使用`let`定义变量时候，我们可以不用写明类型注解，但是`const`是必须要写的，不然就会报出错误，如下代码所示。



```typescript
{
    // 用let定义的变量，能推断出是什么类型
    let str = 'this is string';
    let num = 1; // 等价
    let bool = true; // 等价
}
{
    // 用const定义的类型，并不能推出是什么类型
    const str = 'this is string'; // 不等价
    const num = 1; // 不等价
    const bool = true; // 不等价
}
```

**如上述代码中注释说明，通过 let 和 const 定义的赋予了相同值的变量，其推断出来的类型不一样。**看下面**上下文推断**小节这里就能找到端倪哟。

### 类型推断

在 TypeScript 中，类型标注声明是在变量之后（即类型后置），使用类型标注后置的好处是编译器可以通过代码所在的上下文推导其对应的类型，无须再声明变量类型，具体示例如下：

```typescript
{
  let x1 = 42; // 推断出 x1 的类型是 number
  let x2: number = x1; // ok
}
```

在上述代码中，`x1` 的类型被推断为 `number`，将变量赋值给 `number` 类型的变量 `x2` 后，不会出现任何错误。

其实我们有很多代码都可以从上下文中推断出来。比如我们可以根据`return`语句推断函数返回的类型。如下代码：

```typescript
{
    /** 根据参数的类型，推断出返回值的类型也是 number */
    function add1(a: number, b: number) {
        return a + b
    }
    // 推断出 x1 的类型也是 number
    const x1 = add1(1, 1);
	/** 推断参数 b 的类型是数字或者 undefined，返回值的类型也是数字 */
    function add2(a: number, b = 1) {
        return a + b;
    }
    const x2 = add2(1);
    // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number | undefined
    const x3 = add2(1, '1'); 
}
```

在上述 `add1` 函数中，我们 `return` 了变量 `a + b` 的结果，因为 `a` 和 `b` 的类型为 `number`，所以函数返回类型被推断为 `number`。

当然，拥有默认值的函数参数的类型也能被推断出来。比如上述 `add2` 函数中，`b` 参数被推断为 `number | undefined` 类型，如果我们给 `b` 参数传入一个字符串类型的值，由于函数参数类型不一致，此时编译器就会抛出一个 `ts(2345)` 错误。

### 上下文推断

通过类型推断的例子，我们发现变量的类型可以通过被赋值的值进行推断。除此之外，在某些特定的情况下，我们也可以通过变量所在的上下文环境推断变量的类型，代码如下：

```typescript
{
  type Adder = (a: number, b: number) => number;
  const add: Adder = (a, b) => {
    return a + b;
  }
  const x1 = add(1, 1); // 推断出 x1 类型是 number
  const x2 = add(1, '1');  // ts(2345) Argument of type '"1"' is not assignable to parameter of type 'number
}
```

这里我们定义了一个实现加法功能的**函数类型 Adde**定义的 Adder 类型使用了 type 类型别名)，声明了**add**变量的类型为 Adder 并赋值一个匿名箭头函数，箭头函数参数 a 和 b 的类型和返回类型都没有显式声明。

ts通过**add**的类型 Adder 反向（通过变量类型推断出值的相关类型）推断出箭头函数参数及返回值的类型，也就是说函数参数 `a、b`，以及返回类型在这个变量的声明上下文中被确定了。

### 字面量类型

字面量不仅可以表示值，还可以表示类型，即所谓的字面量类型。

当前，ts支持3中字面量类型：**字符串字面量、数字字面量类型、布尔字面量类型**，对应的字符串字面量、数字字面量、布尔字面量分别拥有与其值一样的字面量类型，

```typescript
{
    let testFiedStr: 'this is string' = 'this is string';
    let testFiedNum: 1 = 1;
    let testFiedBoolean: true = true;
}
```

字面量类型是集合类型的子类型，它是集合类型的一种更具体的表达。比如 `'this is string'` （就是说，他的值只能是`this is string`），而 `string` 类型不一定是 `'this is string'`（因为定义了`string`后，他可以写上任何的字符串）类型。

#### 字符串字面量

单独定义字面量类型并没有多大的用处，它真正的应用场景是可以把多个字面量类型组合成一个联合类型。如下代码所示。

```typescript
type Direction = 'up' | 'down';
function move(dir: Direction) {
    // ...
}
move('up'); // ok
move('down');// ok
move('right'); // Argument of type '"right"' is not assignable to parameter of type 'Direction'.(2345)
```

使用 string 类型，使用字面量类型（组合的联合类型）可以将函数的参数限定为更具体的类型。

#### 数字字面量类型及布尔字面量类型

数字字面量类型和布尔字面量类型的使用与字符串字面量类型的使用类似，我们可以使用字面量组合的联合类型将函数的参数限定为更具体的类型，比如声明如下所示的一个类型 Config：

```typescript
interface Config {
    size: 'small' | 'big';
    isEnable: true | false;
    margin: 0 | 2 | 4 | 8 | 16 | 32 | 64
}
```

**介绍完三种字面量类型后，我们再来看看通过 let 和 const 定义的变量的值相同，而变量类型不一致的具体原因。**

- const 示例

```typescript
{
  const str = 'this is string'; // str: 'this is string'
  const num = 1; // num: 1
  const bool = true; // bool: true
}
```

在上述代码中，我们将 const 定义为一个不可变更的常量，在缺省类型注解的情况下，TypeScript 推断出它的类型直接由赋值字面量的类型决定。

- let示例

这个会难以理解点。

```typescript
{
  let str = 'this is string'; // str: string
  let num = 1; // num: number
  let bool = true; // bool: boolean
}
```

缺省显式类型注解的<u>可变更的变量的类型转换为了赋值字面量类型的父类型</u>，比如 str 的类型是 'this is string' 类型（这里表示一个字符串字面量类型）的父类型 string，num 的类型是 1 类型的父类型 number。

这种转换为父类型的这种设计称之为 `"literal widening"`

#### Literal Widening

所有<u>通过 let 或 var 定义的变量、函数的形参、对象的非只读属性</u>，如果满足<u>指定了初始值且未显式添加类型注解的条件</u>，那么它们推断出来的类型就是指定的初始值字面量类型拓宽后的类型，这就是字面量类型拓宽。

下面我们通过字符串字面量的示例来理解一下字面量类型拓宽：

```typescript
{
  let str = 'this is string'; // 类型是 string
  let strFun = (str = 'this is string') => str; // 类型是 (str?: string) => string;
  const specifiedStr = 'this is string'; // 类型是 'this is string'
  let str2 = specifiedStr; // 类型是 'string'
  let strFun2 = (str = specifiedStr) => str; // 类型是 (str?: string) => string;
}
```

上面`str`和`strFun`满足了 `let`、形参且未显式声明类型注解的条件，所以变量、形参的类型拓宽为 `string`（形参类型确切地讲是 `string | undefined`）。

`const`定义的常量不可变更，类型没有拓宽，所以 `specifiedStr` 的类型是 `'this is string'` 字面量类型。

`str2`与`strFun2`赋予的值 `specifiedStr` 的类型是字面量类型，且没有显式类型注解，所以变量、形参的类型也被拓宽了。其实，这样的设计符合实际编程诉求。我们设想一下，如果 `str2` 的类型被推断为 `'this is string'`，它将不可变更，因为赋予任何其他的字符串类型的值都会提示类型错误。

基于字面量类型拓宽的条件，我们可以通过如下所示代码添加显示类型注解控制类型拓宽行为。

```typescript
{
  const specifiedStr: 'this is string' = 'this is string'; // 类型是 '"this is string"'
  let str2 = specifiedStr; // 即便使用 let 定义，类型是 'this is string'
}
```

实际上，除了字面量类型拓宽之外，`TypeScript` 对某些特定类型值也有类似 `"Type Widening"` （类型拓宽）的设计，下面我们具体来了解一下。

#### Type Widening

比如对 `null` 和 `undefined` 的类型进行拓宽，通过 `let`、`var` 定义的变量如果满足未显式声明类型注解且被赋予了 `null` 或 `undefined` 值，则推断出这些变量的类型是 `any`：

```typescript
{
    let x = null; // 类型拓展成any
    let y = undefined; // 类型拓展成any
    // ----------------------------
    const z = null; // 类型是null
    // ----------------------------
    let anyFun = (param = null) => param;//  形参类型是null
    let z2 = z; // 类型是null
    let x2 = x; // 类型是null
    let y2 = y; // 类型是undefined
}
```

既然有类型拓宽，自然也会有类型缩小，下面我们简单介绍一下 Type Narrowing。

#### Type Narrowing

在 TypeScript 中，我们可以通过某些操作将变量的类型由一个较为宽泛的集合缩小到相对较小、较明确的集合，这就是 "Type Narrowing"。

```typescript
{
    let func = (anything: any) => {
        if(typeof anything === 'string') {
            return anything; // 类型是string
        } else if(typeof anything === 'number') {
            return anything; // 类型是number
        }
        return null;
    }
}
```

同样，我们可以使用类型守卫将联合类型缩小到明确的子类型，具体示例如下：

```typescript
{
  let func = (anything: string | number) => {
    if (typeof anything === 'string') {
      return anything; // 类型是 string 
    } else {
      return anything; // 类型是 number
    }
  };
}
```

当然，我们也可以通过字面量类型等值判断`（===）`或其他控制流语句（包括但不限于 <u>if、三目运算符、switch</u> 分支）将联合类型收敛为更具体的类型，如下代码所示：

```typescript
{
  type Goods = 'pen' | 'pencil' |'ruler';
  const getPenCost = (item: 'pen') => 2;
  const getPencilCost = (item: 'pencil') => 4;
  const getRulerCost = (item: 'ruler') => 6;
  const getCost = (item: Goods) =>  {
    if (item === 'pen') {
      return getPenCost(item); // item => 'pen'
    } else if (item === 'pencil') {
      return getPencilCost(item); // item => 'pencil'
    } else {
      return getRulerCost(item); // item => 'ruler'
    }
  }
}
```

在上述 `getCost` 函数中，接受的参数类型是字面量类型的联合类型，函数内包含了 `if` 语句的 3 个流程分支，其中每个流程分支调用的函数的参数都是具体独立的字面量类型。

那为什么类型由多个字面量组成的变量 `item` 可以传值给仅接收单一特定字面量类型的函数 `getPenCost`、`getPencilCost`、`getRulerCost` 呢？这是因为在每个流程分支中，编译器知道流程分支中的 `item` 类型是什么。比如 `item === 'pencil'` 的分支，`item` 的类型就被收缩为`“pencil”`。

## 函数类型：返回值类型和参数类型到底如何定义？

ts中函数是最基本、最重要的元素

**定义一**

```typescript
function add() {}
const add1 = () => {}
```

**定义二**

```tsx
const add = (a: number, b: number): number => {
    return a + b
}
```

参数名后的 `':number'` 表示参数类型都是数字类型，圆括号后的 `': number'` 则表示返回值类型也是数字类型。

### 返回值类型

在 JavaScript 中，我们知道一个函数可以没有显式 return，此时函数的返回值应该是 undefined

```typescript
function fn() {
  // TODO
}
console.log(fn()); // => undefined
```

需要注意的是，在 TypeScript 中，如果我们显式声明函数的返回值类型为 undfined，将会得到如下所示的错误提醒。

```typescript
function fn(): undefined {}// A function whose declared type is neither 'void' nor 'any' must return a value.(2355)
```

正确的做法是使用void 类型来表示函数没有返回值的类型。

需要注意的是，这里的=>与 ES6 中箭头函数的=>有所不同。TypeScript 函数类型中的=>用来表示函数的定义，其左侧是函数的参数类型，右侧是函数的返回值类型；而 ES6 中的=>是函数的实现。

```tsx
type Adder = (a; number, b: number) => number;// TS 函数类型定义
const add: Adder = (a, b) => a + b// ES6箭头函数
```

我们还可以使用类似对象属性的简写语法来声明函数类型的属性，如下代码所示：

```typescript
interface Entity {
    add: (a: number, b: number) => number;
    del(a: number, b: number): number
}

const entity: Entity = {
    add: (a, b) => a + b,
    del(a, b) {
        return a - b
    }
}
```

### 可缺省和可推断的返回值类型

函数返回值的类型可以在 TypeScript 中被推断出来，即可缺省。

```javascript
interface Entity {
    add: (a: number, b: number) => number;
    del(a: number, b: number): number
}

const entity: Entity = {
    add: (a, b) => a + b,
    del(a, b) {
        return a - b
    }
}

function computeTypes(one: string, two: number) {
    const nums = [two];
    const strs = [one];
    return {
        nums,// (property) nums: number[]
        strs// (property) strs: string[]
    }
}
```

函数返回值的类型推断结合泛型,可以实现特别复杂的类型计算（本质是复杂的类型推断）

### 参数类型

可选参数、默认参数、剩余参数的学习

#### 可选参数

我们的函数参数可传可不传，当然 TypeScript 也支持这种函数类型表达。

```typescript
function log(x?: string) {
    return x
}

log()// function log(x?: string): string | undefined
log('hello world')
```

说明上面的x返回可能是string 或 undefined，但是注意了，我们不能显式的传入参数

```javascript
function log(x?: string) {
  console.log(x);
}
function log1(x: string | undefined) {
  console.log(x);
}
log();
log(undefined);
log1(); // ts(2554) Expected 1 arguments, but got 0
log1(undefined);
```

这里的 ?: 表示参数可以缺省、可以不传，也就是说调用函数时，我们可以不显式传入参数。但是，如果我们声明了参数类型为 xxx | undefined,就表示函数参数是不可缺省且类型必须是 xxx 或者 undfined。

#### 默认参数

TypeScript 会根据函数的默认参数的类型来推断函数参数的类型

```typescript
function log(x = 'hello') {
    console.log(x)
}
log(); // => 'hello'
log('hi'); // => 'hi'
log(234)// Argument of type 'number' is not assignable to parameter of type 'string'.(2345)
```

因为上面x定义的类型式字符串类型，所以，下面传入234数字类型就会报错。

**函数的默认参数类型必须是参数类型的子类型**(如下代码)

```javascript
function log3(x: number | string = 'hello') {
    console.log(x);
}
```

函数 log3 的函数参数 x 的类型为可选的联合类型 number | string，但是因为默认参数字符串类型是联合类型 number | string 的子类型，所以 TypeScript 也会检查通过。

#### 剩余参数

```typescript
function sum2(...nums: number[]) {
    return nums.reduce((a, b) => a + b, 0)
}
sum2(1, 2)
sum2(1, 2, 3)
sum2(2, '3')// Argument of type 'string' is not assignable to parameter of type 'number'
```

以上代码'3'不是number 类型

我们将函数参数 nums 聚合的类型定义为 (number | string)[] 就不会出问题了

```javascript
function sum2(...nums: (number|string)[]) {
    return nums.reduce<number>((a, b) => a + (Number(b)), 0)
}
sum2(1, 2)
sum2(1, 2, 3)
sum2(2, '3')
```

### this

在 TypeScript 中，我们只需要在函数的第一个参数中声明 this 指代的对象（即函数被调用的方式）即可，比如最简单的作为对象的方法的 this 指向，如下代码所示：

```typescript
function say(this: Window, name: string) {
    console.log(this.name)
}
window.say = say
window.say('hello')
const obj = {
    say
}
// The 'this' context of type '{ say: (this: Window, name: string) => void; }' is not assignable to method's 'this' of type 'Window'.
obj.say('hello')
```

在上述代码中，我们在 window 对象上增加 say 的属性为函数 say。那么调用`window.say()`时，this 指向即为 window 对象。

调用`obj.say()`后，此时 TypeScript 检测到 this 的指向不是 window，于是抛出了如下所示的一个 ts(2684) 错误。

```javascript
say('captain'); // ts(2684) The 'this' context of type 'void' is not assignable to method's 'this' of type 'Window'

```

**注意: 如果我们直接调用 say()，this 实际上应该指向全局变量 window，但是因为 TypeScript 无法确定 say 函数被谁调用，所以将 this 的指向默认为 void，也就提示了一个 ts(2684) 错误。**

此时，我们可以通过调用 window.say() 来避免这个错误，这也是一个安全的设计。因为在 JavaScript 的严格模式下，全局作用域函数中 this 的指向是 undefined。

**同样，定义对象的函数属性时，只要实际调用中 this 的指向与指定的 this 指向不同，TypeScript 就能发现 this 指向的错误，示例代码如下：**

```typescript
interface Person {
    name: string;
    say(this: Person): void;
}
const person: Person = {
    name: 'captain',
    say() {
        console.log(this.name);
    }
}
const fn = person.say;
// The 'this' context of type 'void' is not assignable to method's 'this' of type 'Person'.(2684)
fn()
```

很明显上面的fn执行是指向person的，但是很明显它指向了window

**注意了，显式注解函数中的 this 类型，它表面上占据了第一个形参的位置，但并不意味着函数真的多了一个参数，因为 TypeScript 转译为 JavaScript 后，“伪形参” this 会被抹掉，这算是 TypeScript 为数不多的特有语法。**

如下所示:

```javascript
function say(name) {
    console.log(this.name);
}
```

链式调用风格的库中，使用 this 也可以很方便地表达出其类型

```typescript
class Container {
  private val: number;
  constructor(val: number) {
    this.val = val;
  }
  // cb是一个回调函数
  map(cb: (x: number) => number): this {
    this.val = cb(this.val);
    return this;
  }
  log(): this {
    console.log(this.val);
    return this;
  }
}
const instance = new Container(1)
  .map((x) => x + 1)
  .log() // => 2
  .map((x) => x * 3)
  .log(); // => 6  
```

### 函数重载

在 TypeScript 中，也可以相应地表达不同类型的参数和返回值的函数，也就是说，函数名称相同，参数数量或类型不同， 或者参数数量相同同时参数顺序不同

```typescript
function convert(x: string | number | null): string | number | -1 {
    if (typeof x === 'string') {
        return Number(x);
    }
    if (typeof x === 'number') {
        return String(x);
    }
    return -1;
}
const x1 = convert('1'); // => string | number
const x2 = convert(1); // => string | number
const x3 = convert(null); // => string | number
```

在上述代码中，我们把 convert 函数的 string 类型的值转换为 number 类型，number 类型转换为 string 类型，而将 null 类型转换为数字 -1。此时， x1、x2、x3 的返回值类型都会被推断成 string | number 。

那么，有没有一种办法可以更精确地描述参数与返回值类型约束关系的函数类型呢？有，这就是函数重载。

```javascript
function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;
function convert(x: string | number | null): any {
    if (typeof x === 'string') {
        return Number(x);
    }
    if (typeof x === 'number') {
        return String(x);
    }
    return -1;
}
const x1 = convert('1'); // => number
const x2 = convert(1); // => string
const x3 = convert(null); // -1
```

**注意：函数重载列表的各个成员（即示例中的 1 ~ 3 行）必须是函数实现（即示例中的第 4 行）的子集，例如 “function convert(x: string): number”是“function convert(x: string | number | null): any”的子集。**

下面写了一段内容方便自己理解

```javascript
interface P1 {
    name: string;
}
interface P2 extends P1 {
    age: number;
}
function convert(x: P1): number;
function convert(x: P2): string;
function convert(x: P1 | P2): any {}
const x1 = convert({ name: "" } as P1); // => number
const x2 = convert({ name: "", age: 18 } as P2); // number
```

因为 P2 继承自 P1，所以类型为 P2 的参数会和类型为 P1 的参数一样匹配到第一个函数重载，此时 x1、x2 的返回值都是 number。

```javascript
function convert(x: P2): string;
function convert(x: P1): number;
function convert(x: P1 | P2): any { }
const x1 = convert({ name: '' } as P1); // => number
const x2 = convert({ name: '', age: 18 } as P2); // => string
```

而我们只需要将函数重载列表的顺序调换一下，类型为 P2 和 P1 的参数就可以分别匹配到正确的函数重载了，例如第 5 行匹配到第 2 行，第 6 行匹配到第 1 行。

所以，在定义重载的时候，一定要把最精确的定义放在最前面

### 类型谓词(is)

本人察觉这个有版本问题，后续再考虑

```javascript
function isString(s): s is string { // 类型谓词
  return typeof s === 'string';
}
```

“参数名 + is + 类型”的格式明确表明了参数的类型，进而引起类型缩小

## 类类型

他是将 继承、封装、多态三要素为一体的编程利器。

### 类

先看一个例子。

```typescript
class Dog {
    name: string
    constructor(name: string) {
        this.name = name
    }
    bark() {
        console.log('Woof! Woof!')
    }
}
const dog = new Dog('Q');
dog.bark()
```

首先，我们定义了一个` class Dog` ，它拥有 `string` 类型的 `name` 属性（见第 2 行）、`bark` 方法（见第 7 行）和一个构造器函数（见第 3 行）。然后，我们通过 `new` 关键字创建了一个 `Dog` 的实例，并把实例赋值给变量 `dog`（见 12 行）。最后，我们通过实例调用了类中定义的 `bark` 方法（见 13 行）。

### 继承

```typescript
class Animal {
    type = 'Animal';
    say(name: string) {
        console.log(`I'm ${name}`)
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!')
    }
}
const dog = new Dog();
dog.bark();// Woof! Woof!
dog.say('SSS'); // I'm SSS
dog.type // Animal

```

上面的例子展示了类最基本的继承用法。比如第 8 ～12 行定义的`Dog`是派生类，它派生自第 1～6 行定义的`Animal`基类，此时`Dog`实例继承了基类`Animal`的属性和方法。因此，在第 15～17 行我们可以看到，实例 dog 支持 bark、say、type 等属性和方法。

**这里的 Dog 基类与第一个例子中的类相比，少了一个构造函数。这是因为派生类如果包含一个构造函数，则必须在构造函数中调用 super() 方法，这是 TypeScript 强制执行的一条重要规则。**

```typescript
class Animal {
    type = 'Animal';// 这一行翻译的时候会直接写进构造器里面
    say(name: string) {
        console.log(`I'm ${name}`)
    }
}

class Dog extends Animal {
    name: string;
    constructor(name: string) {
        super(); // 具体看这一行
        this.name = name;
    }
    bark() {
        console.log('Woof! Woof!')
    }
}
```

有人可能会好奇，这里的 super() 是什么作用？其实这里的 super 函数会调用基类的构造函数，如下代码所示：

```typescript
class Animal {
    weight: number
    type = 'Animal';
    constructor(weight: number) {
        this.weight = weight
    }
    say(name: string) {
        console.log(`I'm ${name}`)
    }
}

class Dog extends Animal {
    name: string;
    constructor(weight:number, name: string) {
        super(weight); // 可以继承基类属性，也可以直接传数字就不会报错了
        this.name = name;
    }
    bark() {
        console.log('Woof! Woof!')
    }
}
const dog = new Dog();
dog.bark();// Woof! Woof!
dog.say('SSS'); // I'm SSS
dog.type // Animal



```

### 公共、私有与受保护的修饰符

ts中支持3中访问修饰符，分别是`public`、`private`、`protected`。

- `public` 修饰的是任何地方可见，共有的属性或方法；
- `pruvate` 修饰的是仅在同一类中可见、私有的属性或方法；
- `protected` 修饰的是仅在类自身及子类中可见、受保护的属性或方法。

在之前的代码中，示例类并没有用到可见性修饰符，在缺省情况下，类的属性或方法默认都是 `public`。如果想让有些属性对外不可见，那么我们可以使用`private`进行设置，如下所示

```typescript
class Son {
    public firstName: string;
    private lastName: string = 'Stark';
    constructor(firstName: string) {
        this.firstName = firstName
        this.lastName
    }
}

const son = new Son('Tony');
console.log(son.firstName); // => 'Tony'
son.firstName = 'Hansen'
console.log(son.firstName);
// Property 'lastName' is private and only accessible within class 'Son'.(2341)
console.log(son.lastName)
```

说明： 在上面的例子中我们可以看到，`Son` 类的 `lastName` 属性是私有的，只在 `Son` 类中可见 , 定义的 `firstName` 属性是公有的，在任何地方都可见。因此，我们既可以通过创建的 `Son` 类的实例 `son` 获取或设置公共的 `firstName` 的属性，还可以操作更改 `firstName` 的值。

不过，对于 `private` 修饰的私有属性，只可以在类的内部可见。比如私有属性 `lastName` 仅在 `Son` 类中可见，如果其他地方获取了 `lastName` ，`TypeScript` 就会提示一个 `ts(2341)` 的错误。

**注意：TypeScript 中定义类的私有属性仅仅代表静态类型检测层面的私有。如果我们强制忽略 TypeScript 类型的检查错误，转译且运行 JavaScript 时依旧可以获取到 lastName 属性，这是因为 JavaScript 并不支持真正意义上的私有属性。**

看转义过后的代码:

```javascript
"use strict";
class Son {
    constructor(firstName) {
        this.lastName = 'Stark';
        this.firstName = firstName;
        this.lastName;
    }
}
const son = new Son('Tony');
console.log(son.firstName); // => 'Tony'
son.firstName = 'Hansen';
console.log(son.firstName);
console.log(son.lastName);
```

下面来看下受保护的属性和方法

```typescript
class Son {
    public firstName: string;
    protected lastName: string = 'Hansen';
    constructor(firstName: string) {
        this.firstName = firstName
        this.lastName
    }
}

class GrandSon extends Son {
    constructor(firstName: string) {
        super(firstName)
    }
    public getMyLastName() {
        return this.lastName
    }
}

const grandSon = new GrandSon('HUO JIN');
console.log(grandSon.getMyLastName()); // Hansen
// Property 'lastName' is protected and only accessible within class 'Son' and its subclasses.(2445)
grandSon.lastName
```

**注意：虽然我们不能通过派生类的实例访问protected修饰的属性和方法，但是可以通过派生类的实例方法进行访问，通过实例的 getMyLastName 方法获取受保护的属性 lastName 是 ok 的，而通过实例直接获取受保护的属性 lastName 则提示了一个 ts(2445) 的错误。**

### 只读修饰符

在前面的例子中，Son 类 public 修饰的属性既公开可见，又可以更改值，如果我们不希望类的属性被更改，则可以使用 readonly 只读修饰符声明类的属性，如下代码所示：

```typescript
class Son {
    public readonly firstName: string
    constructor(firstName: string) {
        this.firstName = firstName
    }
}
const son = new Son('Hansen');
// Cannot assign to 'firstName' because it is a read-only property.(2540)
son.firstName = 'WSC'
```

我们给公开可见属性 firstName 指定了只读修饰符，这个时候如果再更改 firstName 属性的值，TypeScript 就会提示一个 ts(2540) 的错误，这是因为只读属性修饰符保证了该属性只能被读取，而不能被修改。

**注意：如果只读修饰符和可见性修饰符同时出现，我们需要将只读修饰符写在可见修饰符后面。**

### 存取器

在 TypeScript 中还可以通过getter、setter截取对类成员的读写访问。通过对类属性访问的截取，我们可以实现一些特定的访问控制逻辑。

```typescript
class Son {
    public firstName: string;
    protected lastName: string = 'Hansen';
    constructor(firstName: string) {
        this.firstName = firstName;
    }
}
class GrandSon extends Son {
    constructor(firstName: string) {
        super(firstName);
    }
    get myLastName() {
        return this.lastName;
    }
    set myLastName(name: string) {
        if(this.firstName === 'SJ') {
            this.lastName = name;
        } else {
            console.error('Unab;e to change myLastName');
        }
    }
}

const grandSon = new GrandSon('SJ');
console.log(grandSon.myLastName);// Hansen
grandSon.myLastName = 'CC';
console.log(grandSon.myLastName);
const grandSon1 = new GrandSon('TK');
grandSon1.myLastName = 'CC';// "Unab;e to change myLastName" 
```

只有在`firstName` 为`SJ`的时候才不会走自己的错误。

### 静态属性

这些属性存在于类这个特殊的对象上，而不是类的实例上，所以我们可以直接通过类访问静态属性。

```javascript
class MyArray {
    static displayName = 'MyArray';
    static isArray(obj: unknown) {
        return Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
    }
}
console.log(MyArray.displayName); // 'MyArray'
console.log(MyArray.isArray([])); // true
console.log(MyArray.isArray({})); // false
```

通过 `static` 修饰符，我们给 `MyArray` 类分别定义了一个静态属性 `displayName` 和静态方法 `isArray`。之后，我们无须实例化 `MyArray` 就可以直接访问类上的静态属性和方法了。

基于静态属性的特性，我们往往会把与类相关的常量、不依赖实例 this 上下文的属性和方法定义为静态属性，从而避免数据冗余，进而提升运行性能。

**注意：上边我们提到了不依赖实例 this 上下文的方法就可以定义成静态方法，这就意味着需要显式注解 this 类型才可以在静态方法中使用 this；非静态方法则不需要显式注解 this 类型，因为 this 的指向默认是类的实例。（这边如果忘记了this，可以看看前面的this那一章节）**

### 抽象类

它是一种不能被实例化仅能被子类继承的特殊类。我们可以使用抽象类定义派生类需要实现的属性和方法，同时也可以定义其他被继承的默认属性和方法。

看如下代码:

```tsx
abstract class Adder {
    abstract x: number;
    abstract y: number;
    abstract add(): number;
    displayName = 'Adder'
    addTwice(): number {
        return (this.x + this.y) * 2
    }
}
class NumAdder extends Adder {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
    add(): number {
        return this.x + this.y;
    }
}
const numAdder = new NumAdder(1, 2);
console.log(numAdder.displayName); // => 'Adder'
console.log(numAdder.add()); // => 3
console.log(numAdder.addTwice()); // => 6
```

通过 `abstract` 关键字，我们定义了一个抽象类 `Adder`，并通过`abstract`关键字定义了抽象属性`x、y`及方法`add`，而且任何继承` Adder` 的派生类都需要实现这些抽象属性和方法。同时，我们还在抽象类 `Adder` 中定义了可以被派生类继承的非抽象属性`displayName`和方法`addTwice`。

然后，我们定义了继承抽象类的派生类 `NumAdder`， 并实现了抽象类里定义的 `x、y` 抽象属性和 `add` 抽象方法。如果派生类中**缺少**对 `x、y、add` 这三者中任意一个抽象成员的实现，那么就会提示一个 ts(2515) 错误。

说明:

- 抽象类中的其他非抽象成员则可以直接获取，如通过实例 `numAdder`，我们获取了 `displayName` 属性和 `addTwice` 方法。
- 因为抽象类不能被实例化，并且派生类必须实现继承自抽象类上的抽象属性和方法定义，所以抽象类的作用其实就是对基础逻辑的封装和抽象。
- 还有，我们可以定义一个描述对象结构的接口类型抽象结构，并通过implements关键字约束实现。

#### 抽象类与接口的区别

在于接口只能定义类成员的类。

```tsx
interface IAdder {
  x: number;
  y: number;
  add: () => number;
}
class NumAdder implements IAdder {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add() {
    return this.x + this.y;
  }
  addTwice() {
    return (this.x + this.y) * 2;
  }
}
```

### 类的类型

类的最后一个特性-----类的类型和函数类型，即在声明类的时候，其实也同时声明了一个特殊的类型(确切地讲是一个接口类型)，这个类型的名字就是类型，表示类实例的类型；在定义类的时候，我们声明除构造函数外所有属性、方法的类型就是特殊类型的成员。

```tsx
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const a1: A = {}; // ts(2741) Property 'name' is missing in type '{}' but required in type 'A'.
const a2: A = { name: 'a2' }; // ok
```

我们在定义类 `A` ，说明我们同时定义了一个包含字符串属性 `name` 的同名接口类型 `A`。因此，我们把一个空对象赋值给类型是 `A` 的变量 `a1` 时，TypeScript 会提示一个 ts(2741) 错误，因为缺少 `name` 属性。紧接着，我们把对象`{ name: 'a2' }`赋值给类型同样是 `A` 的变量 `a2` 时，TypeScript 就直接通过了类型检查，因为有 `name` 属性。

## 接口类型与类型别名

### Interface接口类型

TypeScript 对对象的类型检测遵循一种被称之为“鸭子类型”（duck typing）或者“结构化类型（structural subtyping）”的准则，即只要两个对象的结构一致，属性和方法的类型一致，则它们的类型就是一致的。如下代码：

```typescript
function Study(language: { name: string; age: () => number }) {
    console.log(`${language.name},${language.age()}`);
}
Study({
    name: 'TypeScript',
    age: () => new Date().getFullYear() - 1999
});
```

这上面虽然说是一种不错的定义方式，但是实际上，定义内联的接口类型是不可复用的，所以我们应该更多地使用`interface`关键字来抽离可复用的接口类型。

来看下接口是怎么定义的吧。

```javascript
/** 关键字 接口名称 */
interface ProgramLanguage {
    // 语言名称
    name: string;
    // 使用年限
    age: () => number
}
```

在前边示例中，通过内联参数类型定义的 `Study`函数就可以直接使用 `ProgramLanguage` 接口来定义参数 `language` 的类型了。

```tsx
function Study(language: ProgramLanguage) {
    console.log(`${language.name},${language.age()}`);
}
```

我们还可以通过复用接口类型定义来约束其他逻辑。比如，我们通过如下所示代码定义了一个类型为` ProgramLanguage` 的变量 `TypeScript`。

```tsx
let TypeScript: ProgramLanguage;
```

接着，我们把满足接口类型约定的一个对象字面量赋值给了这个变量，如下代码所示，此时也不会提示类型错误。

```typescript
TypeScript = {
  name: 'TypeScript',
  age: () => new Date().getFullYear() - 2012
}
```

### 可缺省属性

在前边的例子中，如果我们希望缺少` age` 属性的对象字面量也能符合约定且不抛出类型错误，确切地说在接口类型中 `age` 属性可缺省，那么我们可以在属性名之后通过添加如下所示的`? `语法来标注可缺省的属性或方法。如以下示例中，`OptionalProgramLanguage` 接口就拥有一个可缺省的函数类型的 `age` 属性。

```tsx
/** 关键字 接口名称 */
interface OptionalProgramLanguage {
  /** 语言名称 */
  name: string;
  /** 使用年限 */
  age?: () => number;
}
let OptionalTypeScript: OptionalProgramLanguage = {
  name: 'TypeScript'
}; // ok
```

扩展: 我们看下如下代码

```typescript
/** 关键字 接口名称 */
interface OptionalProgramLanguage2 {
  /** 语言名称 */
  name: string;
  /** 使用年限 */
  age: (() => number) | undefined;
}
```

说明哈，这里OptionalProgramLanguage2的age和上面OptionalProgramLanguage的age是不等价的，函数这章的可缺省参数和参数类型可以是 undefined 一样，可缺省意味着可以不设置属性键名，类型是 undefined 意味着属性键名不可缺省。不过可以加上类型守卫。代码如下：

```typescript
if (typeof OptionalTypeScript.age === 'function') {
  OptionalTypeScript.age();
}
OptionalTypeScript.age?.();
```

### 只读属性

对对象的某个属性或方法锁定写操作，这时，我们可以在属性名前面添加readon修饰符的语法来标注name为只读属性。

```typescript
interface ReadonlyProgramLanguage {
    // 语言名称
    readonly name: string;
    // 使用年限
    readonly age: (() => number) | undefined
}
let ReadOnlyTypeScript: ReadonlyProgramLanguage = {
    name: 'TypeScript',
    age: undefined
}
/* Cannot assign to 'age' because it is a read-only property.(2540) */
ReadOnlyTypeScript.age = 2
```

需要注意的是，这仅仅是静态类型检测层面的只读，实际上并不能阻止对对象的篡改。因为在转译为` JavaScript` 之后，`readonly` 修饰符会被抹除。因此，任何时候与其直接修改一个对象，不如返回一个新的对象，这会是一种比较安全的实践。

### 定义函数类型

**备注：仅仅是定义函数的类型，而不包含函数的实现**

```typescript
interface StudyLanguage {
  (language: ProgramLanguage): void
}
/** 单独的函数实践 */
let StudyInterface: StudyLanguage 
  = language => console.log(`${language.name} ${language.age()}`);
```

定义了一个接口类型 StudyLanguage，它有一个函数类型的匿名成员，函数参数类型 ProgramLanguage，返回值的类型是 void，通过这样的格式定义的接口类型又被称之为可执行类型，也就是一个函数类型。

### 索引签名

在实际工作中，使用接口类型较多的地方是对象，比如 React 组件的 Props & State、HTMLElement 的 Props，这些对象有一个共性，即所有的属性名、方法名都确定。

实际上，我们经常会把对象当 Map 映射使用，比如下边代码示例中定义了索引是任意数字的对象 LanguageRankMap 和索引是任意字符串的对象 LanguageMap。

```tsx
let LanguageRankMap = {
  1: 'TypeScript',
  2: 'JavaScript',
  ...
};
let LanguageMap = {
  TypeScript: 2012,
  JavaScript: 1995,
  ...
};
```

这个时候，我们需要使用索引签名来定义上边提到的对象映射结构，并通过 “[索引名: 类型]”的格式约束索引的类型。

索引名称的类型分为 string 和 number 两种，通过如下定义的 LanguageRankInterface 和 LanguageYearInterface 两个接口，我们可以用来描述索引是任意数字或任意字符串的对象。

```tsx
interface LanguageRankInterface {
  [rank: number]: string;
}
interface LanguageYearInterface {
  [name: string]: number;
}
{
  let LanguageRankMap: LanguageRankInterface = {
    1: 'TypeScript', // ok
    2: 'JavaScript', // ok
    'WrongINdex': '2012' // ts(2322) 不存在的属性名
  };
  let LanguageMap: LanguageYearInterface = {
    TypeScript: 2012, // ok
    JavaScript: 1995, // ok
    1: 1970 // ok
  };
}
```

**注意：在上述示例中，数字作为对象索引时，它的类型既可以与数字兼容，也可以与字符串兼容，这与 JavaScript 的行为一致。因此，使用 0 或 '0' 索引对象时，这两者等价。**

### 继承与实现

在 TypeScript 中，接口类型可以继承和被继承，比如我们可以使用如下所示的 extends 关键字实现接口的继承。

```tsx
interface ProgramLanguage{
    a: string;
}
interface DynamicLanguage extends ProgramLanguage {
    rank: number; // 定义新属性
}
interface TypeSafeLanguage extends ProgramLanguage {
    typeChecker: string; // 定义新属性
}
// 继承多个
interface TypeScritLanguage extends DynamicLanguage, TypeSafeLanguage {
    name: 'TypeScript' // 用原属性类型的兼容的类型(比如子集)重新定义属性
}
```

### Type 类型别名

接口类型的一个作用是将内联类型抽离出来，从而实现类型可复用。其实，我们也可以使用类型别名接收抽离出来的内联类型实现复用。

此时，我们可以通过如下所示“`type`别名名字 = 类型定义”的格式来定义类型别名。看代码。

```typescript
/** 类型别名 */
{
  type LanguageType = {
    /** 以下是接口属性 */
    /** 语言名称 */
    name: string;
    /** 使用年限 */
    age: () => number;
  }
}
```

在上述代码中，乍看上去有点像是在定义变量，只不过这里我们把 let 、const 、var 关键字换成了 type 罢了。

此外，针对接口类型无法覆盖的场景，比如组合类型、交叉类型，们只能使用类型别名来接收，如下代码所示：

```tsx
{
    // 联合类型
    type MixedType = string | number;
    // 交叉类型
    type intersectionType = { id: number; name: string } & { age: number; name: string }
    // 提取类型属性
    type AgeType = ProgramLanguage['age']
}
```

**注意：类型别名，诚如其名，即我们仅仅是给类型取了一个新的名字，并不是创建了一个新的类型。**

### Interface 与 Type 的区别

在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。比如，重复定义的接口类型，它的属性会叠加，这个特性使得我们可以极其方便地对全局变量、第三方库的类型做扩展，如下代码：

```typescript
{
    interface Language {
        id: number
    }
    interface Language {
        name: string
    }
    let lang: Language = {
        id: 2,
        name: 'name'
    }
}
```

在上述代码中，先后定义的两个 Language 接口属性被叠加在了一起，此时我们可以赋值给 lang 变量一个同时包含 id 和 name 属性的对象。

```typescript
{
    type Language = {
        id: number
    }
    // Duplicate identifier 'Language'.(2300) 重复的标志
    type Language = {
        name: string
    }
    let lang: Language = {
        id: 1,
        name: 'name'
    }
}
```

在上述代码中，我们重复定义了一个类型别名 Language ，此时就提示了一个错误。

### 联合类型和交叉类型

我们还需要通过组合/结合单一、原子类型构造更复杂的类型，以此描述更复杂的数据和结构。

#### 联合类型

联合类型（Unions）用来表示变量、参数的类型不是单一原子类型，而可能是多种不同的类型的组合。

我们主要通过“|”操作符分隔类型的语法来表示联合类型。

下面代码，我们一个函数的参数**可能是 number 或 string 的联合类型**

```typescript
function formatPX(size: number | string) {

}
formatPX(13); // ok
formatPX('13px'); // ok
formatPX(true);// rgument of type 'boolean' is not assignable to parameter of type 'string | number'.(2345)
formatPX(undefined)
```

我们定义了函数 `formatPX` 的参数 `size` 既可以是 `number` 类型也可以是 `string` 类型，所以传入数字 `13` 和字符串 `'13px'` 都正确，但是传入布尔类型的 `true` 或者 `undefined` 类型都会提示一个 `ts(2345)` 错误。

当然，我们可以组合任意个、任意类型来构造更满足我们诉求的类型。如下代码。

```typescript
function formatUnit(size: number | string, unit: 'px' | 'em' | 'rem' | '%') {
}
formatUnit('1px', 'rem');
formatUnit(2, 'em')
formatUnit('1px', 'bem')// Argument of type '"bem"' is not assignable to parameter of type '"px" | "em" | "rem" | "%"'.(2345)
```

我们定义了` formatPX` 函数的第二个参数 `unit`，如果我们传入一个不在类型集合中的字符串字面量 `'bem'` ，就会提示一个 `ts(2345)` 错误。

我们也可以使用类型别名抽离上边的联合类型，然后再将其进一步地联合，如下代码所示：

```typescript
type ModernUnit = 'vh' | 'vw';
type Unit = 'px' | 'em' | 'rem';
type MessedUp = ModernUnit | Unit; // 类型是 'vh' | 'vw' | 'px' | 'em' | 'rem'

```

我们也可以把接口类型联合起来表示更复杂的结构。（用下类型断言as）

```typescript
interface Bird {
    fly(): void;
    layEggs(): void
}
interface Fish {
    swim(): void;
    layEggs(): void
}
const getPet: () => Bird | Fish = () => {
    return {} as Bird | Fish
}

const Pet = getPet();
Pet.layEggs()
Pet.fly()// Property 'fly' does not exist on type 'Bird | Fish'.Property 'fly' does not exist on type 'Fish'.(2339)
```

在联合类型中，我们可以直接访问各个接口成员都拥有的属性、方法，且不会提示类型错误。但是，如果是个别成员特有的属性、方法，我们就需要区分对待了，此时又要引入类型守卫了。

只不过，在这种情况下，我们还需要使用基于 in 操作符判断的类型守卫，如下代码所示：

```typescript
if (typeof Pet.fly === 'function') { // ts(2339)
  Pet.fly(); // ts(2339)
}
if ('fly' in Pet) {
  Pet.fly(); // ok
}
```

#### 交叉类型

在 TypeScript 中，确实还存在一种类似逻辑与行为的类型——交叉类型（Intersection Type），它可以把多个类型合并成一个类型，合并后的类型将拥有所有成员类型的特性。

在 TypeScript 中，我们可以使用“&”操作符来声明交叉类型，如下代码所示：

```typescript
{
  type Useless = string & number;
}
```

很显然，如果我们仅仅把原始类型、字面量类型、函数类型等原子类型合并成交叉类型，是没有任何用处的，因为任何类型都不能满足同时属于多种原子类型，比如既是 `string` 类型又是 `number` 类型。因此，在上述的代码中，类型别名 `Useless` 的类型就是个 `never`。

#### 合并接口类型

联合类型真正的用武之地就是**将多个接口类型合并成一个类型**，从而实现等同接口继承的效果，也就是所谓的合并接口类型，如下代码

```typescript
type IntersectionType = { id: number; name: string; } & { age: number }

const mixed: IntersectionType = {
    id: 1,
    name: 'name',
    age: 18
}
```

在上述示例中，我们通过交叉类型，使得` IntersectionType` 同时拥有了 `id、name、age` 所有属性，这里我们可以试着将合并接口类型理解为求并集。

> 这里，我们来发散思考一下：如果合并的多个接口类型存在同名属性会是什么效果呢？

**解释一下**

比如上面示例中两个接口类型同名的 `name` 属性类型一个是 `number`，另一个是 `string`，合并后，`name` 属性的类型就是 `number` 和 `string` 两个原子类型的交叉类型，即 `never`。

```typescript
type IntersectionTypeConfict = { id: number; name: string; } 
& { age: number; name: number; };
const mixedConflict: IntersectionTypeConfict = {
    id: 1,
    name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
    age: 2
};
```

如果同名属性的类型兼容，比如一个是 `number`，另一个是 `number` 的子类型、数字字面量类型，合并后 `name` 属性的类型就是两者中的子类型。

如下所示示例中 `name` 属性的类型就是数字字面量类型 `2`，因此，我们不能把任何非 `2` 之外的值赋予 `name` 属性。

```typescript
type IntersectionTypeConfict = { id: number; name: 2; } 
& { age: number; name: number; };
let mixedConflict: IntersectionTypeConfict = {
    id: 1,
    name: 2, // ok
    age: 2
};
mixedConflict = {
    id: 1,
    name: 22, // '22' 类型不能赋给 '2' 类型
    age: 2
};
```

#### 合并联合类型

们可以合并联合类型为一个交叉类型，这个交叉类型需要同时满足不同的联合类型限制，也就是提取了所有联合类型的相同类型成员。这里，我们也可以将合并联合类型理解为求**交集**。

在如下示例中，两个联合类型交叉出来的类型 IntersectionUnion 其实等价于 'em' | 'rem'，所以我们只能把 'em' 或者 'rem' 字符串赋值给 IntersectionUnion 类型的变量。

```javascript
type UnionA = 'px' | 'em' | 'rem' | '%';
type UnionB = 'vh' | 'em' | 'rem' | 'pt';
type IntersectionUnion = UnionA & UnionB;
const intersectionA: IntersectionUnion = 'em'; // ok
const intersectionB: IntersectionUnion = 'rem'; // ok
// Type '"px"' is not assignable to type '"em" | "rem"'.(2322)
const intersectionC: IntersectionUnion = 'px';
const intersectionD: IntersectionUnion = 'pt'; // ts(2322)
```

既然是求交集，如果多个联合类型中没有相同的类型成员，交叉出来的类型自然就是 never 了，如下代码所示：

```typescript
type UnionC = 'em' | 'rem'
type UnionD = 'px' | 'pt'
type InterE = UnionC & UnionD
// Type 'any' is not assignable to type 'never'.(2322)
const interE: InterE = 'any' as any
```

因为 `UnionC`和 `UnionD` 没有交集，交叉出来的类型 `InterE` 就是 `never`，所以我们不能把任何类型的值赋予 `InterE`类型的变量。

#### 联合、交叉类型

在前面的示例中，我们把一些联合、交叉类型抽离成了类型别名，再把它作为原子类型进行进一步的联合、交叉。其实，联合、交叉类型本身就可以直接组合使用，这就涉及 |、& 操作符的优先级问题。实际上，联合、交叉运算符不仅在行为上表现一致，还在运算的优先级和 JavaScript 的逻辑或 ||、逻辑与 && 运算符上表现一致 。

**联合操作符 | 的优先级低于交叉操作符 &**，同样，我们可以通过使用小括弧 () 来调整操作符的优先级。

```javascript
  type UnionIntersectionA = { id: number; } & { name: string; } | { id: string; } & { name: number; }; // 交叉操作符优先级高于联合操作符

  type UnionIntersectionB = ('px' | 'em' | 'rem' | '%') | ('vh' | 'em' | 'rem' | 'pt'); // 调整优先级

```

#### 类型缩减

如果将 string 原始类型和“string字面量类型”组合成联合类型会是什么效果？效果就是类型缩减成 string 了。如下代码：

```typescript
type URStr = 'string' | string; // 类型是 string
type URNum = 2 | number; // 类型是 number
type URBoolen = true | boolean; // 类型是 boolean
enum EnumUR {
    ONE,
    TWO
}
type URE = EnumUR.ONE | EnumUR; // 类型是 EnumUR
```

TypeScript 对这样的场景做了缩减，它把字面量类型、枚举成员类型缩减掉，只保留原始类型、枚举类型等父类型，这是合理的“优化”。

```typescript
type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string; // 类型缩减成 string
const borderColor: BorderColor = '' // 这里IDE并没有做提示，会落化提示功能，所以下面有好的办法。

```

如下代码所示，我们只需要给父类型添加“& {}”即可。

```typescript
type BorderColor = 'black' | 'red' | 'green' | 'yellow' | 'blue' | string & {}; // 字面类型都被保留
const borderColor: BorderColor = 'r'

```

此时，其他字面量类型就不会被缩减掉了，在 IDE 中字符串字面量 black、red 等也就自然地可以自动提示出来了。

### 枚举类型

在 JavaScript 原生语言中并没有与枚举匹配的概念，而 TypeScript 中实现了枚举类型（Enums），这就意味着枚举也是 TypeScript 特有的语法。

在 TypeScript 中，我们可以使用枚举定义包含被命名的常量的集合，比如 TypeScript 支持数字、字符两种常量值的枚举类型。

我们也可以使用 enum 关键字定义枚举类型，**格式是 enum + 枚举名字 + 一对花括弧，花括弧里则是被命名了的常量成员**。

下面我们把表示星期的东西使用枚举类型实现一遍。

```typescript
enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
```

**注意：相对于其他类型，enum 也是一种比较特殊的类型，因为它兼具值和类型于一体，有点类似 class（在定义 class 结构时， 其实我们也自动定义了 class 实例的类型）。**

JavaScript 中其实并没有与枚举类型对应的原始实现，而 TypeScript 转译器会把枚举类型转译为一个属性为常量、命名值从 0 开始递增数字映射的对象，在功能层面达到与枚举一致的效果。

转义成javascript的结果：

```javascript
"use strict";
var Day;
(function (Day) {
    Day[Day["SUNDAY"] = 0] = "SUNDAY";
    Day[Day["MONDAY"] = 1] = "MONDAY";
    Day[Day["TUESDAY"] = 2] = "TUESDAY";
    Day[Day["WEDNESDAY"] = 3] = "WEDNESDAY";
    Day[Day["THURSDAY"] = 4] = "THURSDAY";
    Day[Day["FRIDAY"] = 5] = "FRIDAY";
    Day[Day["SATURDAY"] = 6] = "SATURDAY";
})(Day || (Day = {}));
```

在 TypeScript 中，我们可以通过“枚举名字.常量命名”的格式获取枚举集合里的成员，如下代码所示。

```tsx
switch (d) {
    case Day.SUNDAY:
    case Day.SATURDAY:
        return 'take a rest';
    case Day.MONDAY:
    case Day.TUESDAY:
    case Day.WEDNESDAY:
    case Day.THURSDAY:
    case Day.FRIDAY:
        return 'work hard';
	}
}
```

转义成javascript代码

```javascript
function work(d) {
    switch (d) {
        case Day.SUNDAY:
        case Day.SATURDAY:
            return 'take a rest';
        case Day.MONDAY:
        case Day.TUESDAY:
        case Day.WEDNESDAY:
        case Day.THURSDAY:
        case Day.FRIDAY:
            return 'work hard';
    }
}
```

这就意味着在 JavaScript 中调用 work 函数时，传递的参数无论是 enum 还是数值，逻辑上将没有区别，当然这也符合 TypeScript 静态类型检测规则，如下代码所示：

```tsx
  work(Day.SUNDAY); // ok
  work(0); // ok
```

#### 数字类型

在仅仅指定常量命名的情况下，我们定义的就是一个**默认从 0 开始递增的数字集合**，称之为数字枚举。

我们希望枚举值从其他值开始递增，则可以通过**“常量命名 = 数值”** 的格式显示指定枚举成员的初始值。如下代码所示：

```typescript
enum Day {
    SUNDAY=3,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}
```

在上述示例中，我们指定了从 3 开始递增。

 SUNDAY 指定任意类型（比如整数、负数、小数等）、任意起始的数字，其后未显示指定值的成员会递增加 1。上边的示例转译为 JavaScript 之后，则是一个属性值从 3

 开始递增的对象，如下代码所示：

```javascript
"use strict";
var Day;
(function (Day) {
    Day[Day["SUNDAY"] = 3] = "SUNDAY";
    Day[Day["MONDAY"] = 4] = "MONDAY";
    Day[Day["TUESDAY"] = 5] = "TUESDAY";
    Day[Day["WEDNESDAY"] = 6] = "WEDNESDAY";
    Day[Day["THURSDAY"] = 7] = "THURSDAY";
    Day[Day["FRIDAY"] = 8] = "FRIDAY";
    Day[Day["SATURDAY"] = 9] = "SATURDAY";
})(Day || (Day = {}));
```

这里 Day.SUNDAY 被赋予了 3作为值，Day.SATURDAY 则被赋予了 9 作为值。

当然我们也可以给任意位置的成员指定值，如下所示示例：

```tsx
  enum Day {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY = 5
  } 
```

这里我们给最后一个成员 SATURDAY 指定了初始值 5，但转译后的结果就比较尴尬了，如下代码所示：

```typescript
  ...
    Day[Day["FRIDAY"] = 5] = "FRIDAY";
	Day[Day["SATURDAY"] = 5] = "SATURDAY";
  ...
```



这里 `MyDay.FRIDAY` 和 `MyDay.SATURDAY` 的值都是数字 `5`，这就导致使用 `Day` 枚举作为 `switch` 分支条件的函数 `work`，在接收 `MyDay.SATURDAY` 作为入参时，也会进入 `MyDay.FRIDAY` 的分支，从而出现逻辑错误。

所以枚举默认的值自递增且完全无法保证稳定性，所以给部分数字类型的枚举成员显式指定数值或给函数传递数值而不是枚举类型作为入参都属于不明智的行为，如下代码所示：

```typescript
  enum Day {
    ...
    SATURDAY = 5 // bad
  } 
  work(5); // bad
```

此外，常量命名、结构顺序都一致的两个枚举，即便转译为 JavaScript 后，同名成员的值仍然一样（满足恒等 === ）。但在 TypeScript 看来，它们不相同、不满足恒等，如下代码所示：

```tsx
  enum MyDay {
    SUNDAY,
    ...
  } 
  Day.SUNDAY === MyDay.SUNDAY; // ts(2367) 两个枚举值恒不相等
  work(MyDay.SUNDAY); // ts(2345) 'MyDay.SUNDAY' 不能赋予 'Day'
```

这里的 MyDay 和上边的 Day 看似一样，但是如果我们拿 MyDay 和 Day 的成员进行比较，或者把 MyDay 传值给形参是 Day 类型的 work 函数，就会发现都会提示错误。

不仅仅是数字类型枚举，所有其他枚举都仅和自身兼容，这就消除了由于枚举不稳定性可能造成的风险，所以这是一种极其安全的设计。

不过，很多人认为两个结构完全一样的枚举类型如果互相兼容，则会更符合我们的预期。

#### 字符串类型

我们将定义值是字符串字面量的枚举称之为字符串枚举，字符串枚举转译为 JavaScript 之后也将保持这些值，如下代码所示。

```typescript
enum Day {
    SUNDAY = 'SUNDAY',
    MONDAY = 'MONDAY',
}
```

转义过后的js代码如下

```javascript
var Day;
(function (Day) {
    Day["SUNDAY"] = "SUNDAY";
    Day["MONDAY"] = "MONDAY";
})(Day || (Day = {}));
```

相比于没有明确意义的递增值的数字枚举，字符串枚举的成员在运行和调试阶段，更具备明确的含义和可读性，枚举成员的值就是我们显式指定的字符串字面量。

#### 异构类型

无使用场景

#### 常量成员和计算(值)成员

没啥用

#### 枚举成员类型和联合枚举

没啥用

#### 常量枚举

没啥用

#### 外部枚举

没啥用

### 泛型(如何约束类型变量)重点

- 题1如何使用 TypeScript 实现与 call（或者 apply） 功能类似的函数，重在考察候选人对泛型的应用
- 题2什么是泛型？泛型的作用是什么？

​        **泛型指的是类型参数化，即将原来某种具体的类型进行参数化。和定义函数参数一样，我们可以给泛型定义若干个类型参数，并在调用时给泛型传入明确的类型参数。**

#### 泛型类型参数

我们如何指定一个泛型类型呢，这里其实哦我们只要通过尖括号<>语法给函数定义一个泛型参数P，并指定param参数的类型为P，如下代码所示：

```typescript
function reflect<P>(param: P) {
    return param;
}
```

说明：**我们可以看到，尖括号中的P表示泛型参数的定义，param后的P表示参数的类型是泛型P(即类型受P约束)**。

我们也可以使用泛型显式地注解返回值的类型，虽然没有这个必要（因为返回值的类型可以基于上下文推断出来）。比如我们可以通过尖括号`<>`语法给泛型参数`P`显式的传入一个明确的值。

```typescript
function reflect<P>(param: P): P {
    return param
}
```

然后在调用函数时，我们也通过 `<>` 语法指定了如下所示的 `string、number` 类型入参，相应地，`reflectStr` 的类型是` string，reflectNum` 的类型是 `number`。如下代码所示。

```typescript
function reflect<P>(param: P): P{
    return param
}
const reflectStr = reflect<string>('string')// str类型式string
const reflectNum = reflect<number>(1); // num类型式number
```

另外，如果调用泛型函数时受泛型约束的参数有传值，泛型参数的入参可以从参数的类型中进行推断，而无须再显式指定类型（可缺省），因此上边的示例可以简写为如下示例：

```typescript
function reflect<P>(param: P): P{
    return param
}
const reflectStr = reflect('string')// str类型式string
const reflectNum = reflect(1); // num类型式number
```

泛型不仅可以约束函数整个参数的类型，还可以约束**参数属性、成员的类型**，比如参数的类型可以是数组、对象，如下示例：

```typescript
function reflectArray<P>(param: P[]) {
    return param
}
const reflectArr = reflectArray(['1', 1, true, Symbol(2)])// reflectArr 是 (string | number | boolean | symbol)[]
```

通过泛型，我们可以约束函数参数和返回值的类型关系。

注意：函数的泛型入参必须和参数/参数成员建立有效的约束关系才有实际意义比如在下面示例中，我们定义了一个<u>仅约束返回值类型的泛型，它是没有任何意义的</u>。

```typescript
function uselessGenerics<P>(): P {
    return void 0 as unknown as P;
}
```

我们可以给函数定义任何个数的泛型入参，如下代码所示：

```javascript
function reflectExtraParams<P, Q>(p1: P, p2: Q): [P, Q] {
    return [p1, p2];
}
```

在上述代码中，我们定义了一个拥有两个泛型入参（P 和 Q）的函数 reflectExtraParams，并通过 P 和 Q 约束函数参数 p1、p2 和返回值的类型。

#### 泛型类

在类的定义中，我们还可以使用泛型用来约束构造函数、属性、方法的类型，如下代码所示：

```typescript
class Memory<S> {
    store: S;
    constructor(store: S) {
        this.store = store
    }
    set(store: S) {
        this.store = store
    }
    get() {
        return this.store
    }
}
const numMemory = new Memory<number>(1); // <number>可以缺省
const getNumMemory = numMemory.get(); // 类型是number
numMemory.set(2); // 只能写入number类型
const strMemory = new Memory(''); // 缺省<string>
const getStrMemory = strMemory.get(); // 类型是string
strMemory.set('string'); // 只能写入string类型
```

首先，我们定义了一个支持读写的寄存器类 Memory，并使用泛型约束了 Memory 类的构造器函数、set 和 get 方法形参的类型，最后实例化了泛型入参分别是 number 和 string 类型的两种寄存器。

泛型类和泛型函数类似的地方在于，在创建类实例时，如果受泛型约束的参数传入了明确值，则泛型入参（确切地说是传入的类型）可缺省，如上面代码所示，`<number>`、`<string>` 泛型入参就是可以缺省的。

**如果有开发过`react`的朋友，提示下，函数式组件也是支持泛型的。**这里代码会难理解，记住好了。

```typescript
function GenericCom<P>(props: { prop1: string }) {
    return <></>
}
<GenericCom<{ name: string; }> prop1="1" ... />
```

在第 1 行~第 3 行，我们定义了一个泛型组件 GenericCom，它接收了一个类型入参 P。在第 4 行，通过 JSX 语法创建组件元素的同时，我们还显式指定了接口类型 { name: string } 作为入参。

#### 泛型类型

我们可以使用 Array<类型> 的语法来定义数组类型，这里的 Array 本身就是一种类型。

在 TypeScript 中，类型本身就可以被定义为拥有不明确的类型参数的泛型，并且可以接收明确类型作为入参，从而衍生出更具体的类型，如下代码所示：

```typescript
const reflectFn: <P>(param: P) => P = reflect // ok
```

这里我们为变量 reflectFn 显式添加了泛型类型注解，并将 reflect 函数作为值赋给了它。

我们也可以把 reflectFn 的类型注解提取为一个能被复用的类型别名或者接口，如下代码所示：

```typescript
type ReflectFunction = <P>(param: P) => P;
interface IReflectFunction {
    <P>(param: P): P
}
const reflectFn2: ReflectFunction = reflect
const reflectFn3: IReflectFunction = reflect
```

将类型入参的定义**移动到类型别名或接口名称后**，此时定义的一个接收具体**类型入参后返回一个新类型的类型**就是泛型类型。

```typescript
type GenericReflectFunction<P> = (param: P) => P;
interface IGenericReflectFunction<P> {
    (param: P): P
}
const refect1 = (param: string): string => param
const refect2 = (param: number): number => param
const reflectFn4: GenericReflectFunction<string> = refect1// 具象化泛型
const reflectFn5: IGenericReflectFunction<number> = refect2; // 具象化泛型
const reflectFn3Return = reflectFn4('string'); // 入参和返回值都必须是 string 类型
const reflectFn4Return = reflectFn5(1); //  入参和返回值都必须是 number 类型
```

在泛型定义中，我们甚至可以使用一些类型操作符进行运算表达，使得泛型可以根据入参的类型衍生出各异的类型，如下代码所示：

```typescript
type StringOrNumberArray<E> = E extends string | number ? E[]: E;
type StringArray = StringOrNumberArray<string>
type NumberArray = StringOrNumberArray<number>
type NeverGot = StringOrNumberArray<boolean>
```

这里我们定义了一个泛型，如果入参是 number | string 就会生成一个数组类型，否则就生成入参类型。而且，我们还使用了与 JavaScript 三元表达式完全一致的语法来表达类型运算的逻辑关。看下，上面有个继承的关系在上面。

**如果我们给上面这个泛型传入了一个 string | boolean 联合类型作为入参，将会得到什么类型呢？**

```typescript
type BooleanOrString = string | boolean;
type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 好像应该是 string | boolean ?
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean

```

你会发现显示的类型将是 boolean | string[]。原因是因为，示例中的 string | boolean 入参，先被拆解成 string 和 boolean 这两个独立类型，再分别判断是否是 string | number 类型的子集。**因为 string 是子集而 boolean 不是，所以最终我们得到的 WhatIsThis 的类型是 boolean | string[]。**

利用泛型，我们可以抽象封装出很多有用、复杂的类型约束。

**注意：枚举类型不支持泛型。**

### 泛型约束

泛型就像是类型的函数，它可以抽象、封装并接收（类型）入参，而泛型的入参也拥有类似函数入参的特性。因此，我们可以把泛型入参限定在一个相对更明确的集合内，以便对入参进行约束。

我们希望把接收参数的类型限定在几种原始类型的集合中，此时就可以使用“泛型入参名 extends 类型”语法达到这个目的，如下代码所示。

```typescript
function reflectSpecified<P extends number | string | boolean>(param: P): P{
    return param;
}
reflectSpecified(2);
reflectSpecified('字符串');
reflectSpecified(false);
reflectSpecified(null);// Argument of type 'null' is not assignable to parameter of type 'string | number | boolean'.(2345)
```

在上述示例中，我们限定了泛型入参只能是 `number | string | boolean` 的子集。

同样，我们也可以把接口泛型入参约束在特定的范围内，如下代码所示：

```typescript
interface ObjSetter {
    <O extends {}, K extends keyof O, V extends O[K]>(obj: O, key: K, value: V) : V
}

const setValueOfObj: ObjSetter = (obj, key, value) => (obj[key] = value);
setValueOfObj({ id: 1, name: 'name' }, 'id', 2); // ok
setValueOfObj({ id: 1, name: 'name' }, 'name', 'new name');// ok
setValueOfObj({ id: 1, name: 'name' }, 'num', 2);// argument of type '"num"' is not assignable to parameter of type '"id" | "name"'.(2345)
setValueOfObj({ id: 1, name: 'name' }, 'id', '2');//Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

在设置对象属性值的函数类型时，它拥有 3 个泛型入参：第 1 个是对象，第 2 个是第 1 个入参属性名集合的子集，第 3 个是指定属性类型的子类型。

另外，泛型入参与函数入参还有一个相似的地方在于，它也可以给泛型入参指定默认值（默认类型），且语法和指定函数默认参数完全一致，如下代码所示：

```typescript
interface ReduxModelSpecified2<State = { id: number; name: string }> {
  state: State
}
interface ReduxModelSpecified<State> {
  state: State
}
type ComputedReduxModel5 = ReduxModelSpecified2; // ok
type ComputedReduxModel6 = ReduxModelSpecified2<{ id: number; name: string; }>; // ok
type ComputedReduxModel7 = ReduxModelSpecified; //Generic type 'ReduxModelSpecified<State>' requires 1 type argument(s).(2314)
```

在上述示例中，我们定义了入参有默认类型的泛型 ReduxModelSpecified2，因此使用 ReduxModelSpecified2 时类型入参可缺省。而 ReduxModelSpecified 的入参没有默认值，所以缺省入参时会提示一个类型错误。

泛型入参的约束与默认值还可以组合使用，如下代码所示：

```typescript
// {} 和 object 是有区别的，{} 表示所有原始类型和非原始类型的集合，object 表示所有非原始类型的集合
interface ReduxModelMixed<State extends {} = { id: number; name: string }> {
    state: State
}
type computedRdux5 = ReduxModelMixed // ok
type computedRdux6 = ReduxModelMixed<{ id: number, name: string; }> // ok
type computedRdux7 = ReduxModelMixed<{ id: boolean }> // ok
```

这里我们限定了泛型 ReduxModelMixed 入参 State 必须是 {} 类型的子类型，同时也指定了入参缺省时的默认类型是接口类型 { id: number; name: string; }

## 类型守卫

如何有效的保障类型的安全性。

### 类型守卫

我们在写js的时候会出现这样子的一个问题，就是说此属性没有此方法，如下一个示例所示。

```javascript
{
  const convertToUpperCase = (strOrArray) => {
    if (typeof strOrArray === 'string') {
      return strOrArray.toUpperCase();
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map(item => item.toUpperCase());
    }
  }
}
```

我们分别使用了 typeof、Array.isArray 确保字符串和字符串数组类型的入参在运行时分别进入正确的分支，而不至于入参是数组类型时，调用数组类型并不存在的 toUpperCase 方法，从而抛出一个`“strOrArray.toUpperCase is not a function”`的错误。原因是`strOrArray`可能没有`toUpperCase()`属性。

但是如果我们将上边示例中的 `convertToUpperCase` 函数使用 TypeScript 实现，那么就需要显示地标明 `strOrArray` 的类型就是 `string` 和 `string[]` 类型组成的联合类型就会在写代码的时候就会觉察出这个问题，如下代码所示。

```typescript
{
  const convertToUpperCase = (strOrArray: string | string[]) => {
    if (typeof strOrArray === 'string') {
      return strOrArray.toUpperCase();
    } else if (Array.isArray(strOrArray)) {
      return strOrArray.map(item => item.toUpperCase());
    }
  }
}
```

在示例中，`convertToUpperCase` 函数的主体逻辑与 JavaScript 中的逻辑完全一致（除了添加的参数类型注解）。

从示例中，我们可以看到**类型守卫的作用在于触发类型缩小。实际上，它还可以用来区分类型集合中的不同成员。**也就是说在编译初期，咱们就直到是字符串或者是一个字符串的集合。

### 如何区分联合类型？

常用的类型守卫包括**switch、字面量恒等、typeof、instanceof、in和自定义守卫**这几种。

#### switch

往往会使用switch类型守卫来处理**联合类型中成员或者成员属性可枚举**的场景，即字面量的集合，如下所示：

```typescript
{
    const convert = (c: 'a' | 1) => {
        switch(c) {
            case 1:
                return c.toFixed(); // c is 1
            case 'a':
                return c.toLowerCase(); // c is 'a'
        }
    }
    const feat = (c: { animal: 'panda'; name: 'China' } | { feat: 'video';name: 'Japan' }) =>  {
        switch (c.name) {
            case 'China':
                return c.animal; // c is "{ animal: 'panda'; name: 'China' }"
            case 'Japan':
                return c.feat; // c is "{ feat: 'video'; name: 'Japan' }"
        }
    }
}
```

这里就是说上面的 `convert`函数的参数及`feat`函数参数的name属性都是一个可枚举的集合，所以我们可以使用`switch`来缩小类型。

比如上面的c的类型被缩小为数字`1`，`c`被缩小为字符串'a'，同样的`feat`函数`c`也同样缩小为相应的接口类型。因此，我们对参数`c`进行相关操作时候就不会提示类型错误了。

#### 字面量恒等

switch 适用的场景往往也可以直接使用字面量恒等比较进行替换，比如前边的 convert 函数可以改造成以下示例：

```typescript
const convert = (c: 'a' | 1) => {
    if(c === 1) {
        return c.toFixed(); // c is 1
    } else if(c === 'a') {
        return c.toLowerCase(); // c is 'a'
    }
    return
}
```

比如这里，类型都相应都缩小为了字面量 1 和 'a'。

**建议:  一般来说，如果可枚举的值和条件分支越多，那么使用switch就会让代码逻辑更加简洁、更清晰；反之，则推荐使用字面量恒等进行判断。**

#### typeof

当联合类型的成员不可枚举，比如说是字符串、数字等原子类型组成的集合，这个时候就需要使用 `typeof`。

```typescript
{
    const convert = (c: 'a' | 1) => {
        if(typeof c === 'number') {
            return c.toFixed(); // c is 1
        } else if(typeof c === 'string') {
            return c.toLowerCase(); // c is 'a';
        }
        return
    }
}
```

这边的示例中，因为 `typeof c` 表达式的返回值类型是字面量联合类型 `'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function'`，所以通过判断将 `typeof c`表达式值类型进行了缩小，进而将`c`的类型缩小为明确的`number、string`等原子类型。

#### instanceof

此外，联合类型的成员还可以是类。下面，我们使用了 `instanceof` 来判断 `param` 是 `Dog` 还是 `Cat` 类。

```typescript
{
    class Dog {
        dogSound = 'wangwang';
    }
    class Cat {
        catSound = 'miaomiao';
    }
    const getName = (animal: Dog | Cat) => {
        if(animal instanceof Dog) {
            return animal.dogSound
        } else if(animal instanceof Cat) {
            return animal.catSound
        }
        return
    }
}
```

上面代码中我们把类型缩小为`Dog、Cat`类型。

#### in

当联合类型的成员包含接口类型（对象），并且接口之间的属性不同，如下示例中的接口类型 `Dog、Cat`，我们不能直接通过“ . ”操作符获取 `param参数` 的 `wang`、miao` 属性，从而区分它是 `Dog` 还是 `Cat`。

```typescript
{
  interface Dog {
    wang: string;
  }
  interface Cat {
    miao: string;
  }
  const getName = (animal: Dog | Cat) => {
    if (typeof animal.wang == 'string') { // Property 'wang' does not exist on type 'Cat'.(2339)
      return animal.wang; // ts(2339)
    } else if (animal.miao) { // Property 'miao' does not exist on type 'Dog'.(2339)
      return animal.miao; // ts(2339)
    }
  }
}
```

这里我们看到，上面都提示了一个 `ts(2339) Dog | Cat` 联合类型没有 `wang、miao` 属性的错误。

所以，这个时候，我们就需要使用`in`操作符来改造下`getName`函数，这样子就不会提示类型错误了。如下代码所示。

```typescript
{
  interface Dog {
    wang: string;
  }
  interface Cat {
    miao: string;
  }
  const getName = (animal: Dog | Cat): any => {
    if ('wang' in animal) { // ok
      return animal.wang; // ok
    } else if ('miao' in animal) { // ok
      return animal.miao; // ok
    }
  }
}
```

这里可以看到，animal的类型也缩小成`Dog`和`Cat`了。

#### 自定义类型守卫

使用类型谓词`is`，比如封装一个`isDog`函数来区分`Dog`和`Cat`，如下代码。

```typescript
interface Dog {
    wang: string;
}
interface Cat {
    miao: string;
}
const isDog = function (animal: Dog | Cat): animal is Dog {
    return 'wang' in animal
}
const getName = (animal: Dog | Cat): any => {
    if(isDog(animal)) {
        return animal.wang
    }
}
```

上面的我们在 `getName`函数条件判断中使用了isDog将animal的类型缩小为Dog，这样子就可以直接获取wang属性了，就不会有`ts(2339)`的错误了。

#### 如何区别枚举类型？

**特性 1**：枚举和其他任何枚举、类型都不可比较，除了数字枚举可以与数字类型比较之外；

**特性 2**：数字枚举极其不稳定。

**我们永远不要拿枚举和除了自身之外的任何枚举、类型进行比较。**

```typescript
{
    enum A {
        one,
        two
    }
    enum B {
        one,
        two
    }
    /*
        这里我们将类型是枚举A的入参param和数字字面量1进行， 因为A是数字枚举，所以param可以和1进行比较，而不会提示ts(2367)条件判断恒为false的错误。
        但是，数字枚举不稳定，所以默认情况下A.two的是1，因此判断在入参为A.two的时候为真。但是，如果我们给枚举 A 的成员 one 指定初始值 1，条件判断在入参为 A.two 的时候就为否了，因为 A.two 值变成了 2，所以这不是一个安全的实践。
    */
    const cpWithNumber = (param: A): any => {
        if(param === 1) { // bad
            return param
        }
    }
    const cpWithOtherEnum = (param: A): any => {
        // 这里使用了双重类型断言将枚举类型 B 转换为 A，所以这同样也是一种不安全的实践。因为一旦 A 和 B 的结构出现了任何差异（比如给成员指定了不同的初始值、改变了成员的顺序或者个数），都会导致条件判断逻辑时真时否。
        if(param === B.two as unknown as A) { // bad
            return param
        }
    }
    
    const cpWithSelf = (param: A): any => {
        // 最安全的实践是使用区分枚举成员的判断方式。
        if(param === A.two) {// ok
            return param
        }
    }
}
```

**注意：你应该还记得字面量成员枚举可等价为字面量成员类型组成的联合类型，所以类型守卫可以让字面量成员枚举发生类型缩小。

## 增强类型系统

### 增强类型系统

TypeScript 相较于 JavaScript 而言，其一大特点就是类型。关于类型的定义方法，除了之前学习的内容之外，我们还可以通过以下方式扩展类型系统。

### 声明

我们要想在TypeScript中安全地使用JavaScript的库，关键在于使用TypeScript中的关键字`declare`;

通过使用 `declare` 关键字，我们可以**声明全局的变量、方法、类、对象**。下面我们先说一下如何声明全局的变量。

### declare变量

在运行时，前端代码 `<script>` 标签会引入一个全局的库，再导入全局变量。此时，如果你想安全地使用全局变量，那么就需要对变量的类型进行声明。

声明变量的语法： `declare (var|let|const)` 变量名称: 变量类型 ，具体示例如下：

```typescript
declare var val1: string;
declare let val2: number;
declare const val3: boolean;
val1 = '1';
val2 = 2;
val2 = '2';// Type 'string' is not assignable to type 'number'.(2322)
val3 = true;// Cannot assign to 'val3' because it is a constant.(2588)
```

在上面的代码示例中，我们分别使用 `var`、`let`、`const` 声明了 3 种不同类型的变量。其中，使用 `var、let` 声明的变量是可以更改变量赋值的，而使用 `const` 声明的变量则不可以。同时，对于变量类型不正确的错误，TypeScript 也可以正常检测出来。

当然， `declare` 关键字还可以用来声明**函数、类、枚举**类型，下面我们一起来看看。

#### 声明函数

声明函数的语法与声明变量类型的语法相同，不同的是 declare 关键字后需要跟 function 关键字，如下示例：

```typescript
declare function toString(x: number): string;
// 这里的toString方法已经在原生库实现过了，这里只需要调用即可
const x = toString(1);
```

需要注意：使用 declare**关键字时，我们不需要编写声明的变量、函数、类的具体实现（因为变量、函数、类在其他库中已经实现了），只需要声明其类型即可**，如下示例，我们强行再定义一次就会报错：

```typescript
/*
An implementation cannot be declared in ambient contexts.(1183)
ypeScript 的报错信息提示：
环境声明的上下文不需要实现。也就是说 declare 声明的所有类型只需要表明类型，不需要实现。
*/
declare function toString(x: number) {
  return String(x);
};
declare function toString(x: number): string;
// 这里的toString方法已经在原生库实现过了，这里只需要调用即可
const x = toString(1)
```

#### 声明类

声明类时，我们只需要声明类的属性、方法的类型即可。

另外，关于类的可见性修饰符我们也可以在此进行声明，下面看一个具体的示例：

```typescript
declare class Person {
    public name: string;
    private age: number;
    constructor(name: string);
    getAge(): number;
}
const person = new Person('Hansen');
person.name; // string
person.age; // Property 'age' is private and only accessible within class 'Person'.(2341)
person.getAge(); // number
```

我们声明了公共属性 `name` 以及私有属性 `age`，此时我们看到无法访问私有属性 `age`（私有属性只能被内部使用）。另外，我们还声明了方法 `getAge` ，并且 `getAge` 的返回值是 `number` 类型，所以 `Person` 实例调用后返回的类型也是 `number` 类型。

#### 声明枚举

声明枚举只需要定义枚举的类型，并不需要定义枚举的值，如下示。

```typescript
declare enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
}
const dorections = [
    Direction.UP,
    Direction.RIGHT,
    Direction.DOWN,
    Direction.LEFT
]
```

我们声明了在其他地方定义的枚举 `Direction` 类型结构，然后在就可以直接访问枚举的成员了。

**注意：声明枚举仅用于编译时的检查，编译完成后，声明文件中的内容在编译结果中会被删除，**相当于仅剩下面使用的语句:

```typescript
const directions = [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
```

这里的 `Direction `表示引入的全局变量。

#### declare模块

通过使用 module 关键字，我们就可以声明一个内部模块。但是由于 ES6 后来也使用了 module 关键字，为了兼容 ES6，所以 TypeScript 使用 namespace 替代了原来的 module，并更名为命名空间。

**需要注意：目前，任何使用**`module`关键字声明一个内部模块的地方，我们都应该使用`namespace`关键字进行替换。

TypeScript 与 ES6 一样，任何包含顶级 import 或 export 的文件都会被当作一个模块。我们可以通过声明模块类型，为缺少 TypeScript 类型定义的三方库或者文件补齐类型定义，如下示例：

```typescript
// lodash.d.ts
declare module 'lodash' {
  export function first<T extends unknown>(array: T[]): T;
}
// index.ts
import { first } from 'lodash';
first([1, 2, 3]); // => number;
```

在上面的例子中，lodash.d.ts 声明了模块 lodash 导出的 first 方法，然后在 TypeScript 文件中使用了模块 lodash 中的 first 方法。

**声明模块的语法**： `declare module '模块名'{}`。

在模块声明的内部，我们只需要使用 export 导出对应库的类、函数即可。

#### declare文件

在使用 TypeScript 开发前端应用时，我们可以通过 import 关键字导入文件，比如先使用 import 导入图片文件，再通过 webpack 等工具处理导入的文件。

但是，因为 TypeScript 并不知道我们通过 import 导入的文件是什么类型，所以需要使用 declare 声明导入的文件类型，下面看一个具体的示例：

```typescript
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.png' {
  const src: string;
  export default src;
}
```

这里标记的图片文件的默认导出的类型是 string ，通过 import 使用图片资源时，TypeScript 会将导入的图片识别为 string 类型，因此也就可以把 import 的图片赋值给 的 src 属性，因为它们的类型都是 string，是匹配的。

#### declare namespace

不同于声明模块，命名空间一般用来表示具有很多子属性或者方法的全局对象变量。

我们可以将声明命名空间简单看作是声明一个更复杂的变量，如下示例：

```typescript
declare namespace $ {
  const version: number;
  function ajax(settings?: any): void;
}
$.version; // => number
$.ajax();
```

在上面的例子中，因为我们声明了全局导入的 jQuery 变量 $，所以可以直接使用 $ 变量的 version 属性以及 ajax 方法。

在 TypeScript 中，我们还可以编写以 .d.ts 为后缀的声明文件来增强（补齐）类型系统。

#### 声明文件 ///

安装 TypeScript 依赖后，一般我们会顺带安装一个 lib.d.ts 声明文件，这个文件包含了 JavaScript 运行时以及 DOM 中各种全局变量的声明，如下示例：

```typescript
// typescript/lib/lib.d.ts
/// <reference no-default-lib="true"/>
/// <reference lib="es5" />
/// <reference lib="dom" />
/// <reference lib="webworker.importscripts" />
/// <reference lib="scripthost" />
```

这其实就是 lib.d.ts 文件的内容。

其中，/// 是 TypeScript 中三斜线指令，后面的内容类似于 XML 标签的语法，用来指代引用其他的声明文件。通过三斜线指令，我们可以更好地复用和拆分类型声明。no-default-lib="true" 表示这个文件是一个默认库。而最后 4 行的lib="..." 表示引用内部的库类型声明。

#### @type

有些JavaScript是没有对应的type依赖文件的，所以我们要额外的添加一些typescript来维持javascript的运行。

具体操作：首先，

[点击这里的链接搜索]: https://www.typescriptlang.org/dt/search?search=&amp;fileGuid=xxQTRXtVcqtHK6j8

你想要导入的类库的类型声明，如果有社区维护的声明文件。然后，我们只需要安装 @types/xxx 就可以在 TypeScript 中直接使用它了。

### 合并接口

最简单、常见的声明合并是接口合并，如下代码。

```typescript
interface Person {
  name: string;
}
interface Person {
  age: number;
}
// 相当于
interface Person {
  name: string;
  age: number;
}
```

**注意的是接口的非函数成员类型必须完全一样**，如下示例：

```typescript
interface Person {
  age: string;
}
interface Person {
  // TS2717: Subsequent property declarations must have the same type.
  // Property 'age' must be of type 'string', but here has type 'number'.
  age: number;
}
```

**需要注意的是后面声明的接口具有更高的优先级**，如下代码：

对于函数成员而言，**每个同名的函数**声明都会被当作这个函数的重载。

**需要注意的是后面声明的接口具有更高的优先级**，下面看一个具体的示例：

```typescript
interface Obj {
    identity(val: any): any;
}
interface Obj {
    identity(val: number): number;
}
interface Obj {
    identity(val: boolean): boolean;
}
// 相当于
interface Obj {
  identity(val: boolean): boolean;
  identity(val: number): number;
  identity(val: any): any;
}
const obj: Obj = {
    identity(val: any) {
        return val;
    }
};
const t1 = obj.identity(1); // => number
const t2 = obj.identity(true); // => boolean
const t3 = obj.identity("t3"); // => any
```

在上面的代码中，Obj 类型的 identity 函数成员有 3 个重载，与函数重载的顺序相同，声明在前面的重载类型会匹配。

接下来我们更改一下顺序，再看看结果。

```typescript
interface Obj {
  identity(val: boolean): boolean;
}
interface Obj {
  identity(val: number): number;
}
interface Obj {
  identity(val: any): any;
}
// 相当于
interface Obj {
  identity(val: any): any;
  identity(val: number): number;
  identity(val: boolean): boolean;
}
const obj: Obj = {
  identity(val: any) {
      return val;
  }
};
const t1 = obj.identity(1); // => any
const t2 = obj.identity(true); // => any
const t3 = obj.identity("t3"); // => any
```

在上面的代码中，`identity` 函数参数为 `any` 的重载在第一位，因此 `t1、t2、t3` 的返回值类型都被重载成了 `any`。

### 合并 namespace

合并 namespace 与合并接口类似，命名空间的合并也会合并其导出成员的属性。不同的是，非导出成员仅在原命名空间内可见。

```typescript
namespace Person {
  const age = 18;
  export function getAge() {
    return age;
  }
}
namespace Person {
  export function getMyAge() {
    return age; // Cannot find name 'age'.(2304)
  }
}
```

在上面的例子，同名的命名空间 `Person` 中，有一个非导出的属性 `age`，在第二个命名空间 `Person` 中没有 `age` 属性却引用了 `age`，所以 TypeScript 报出了找不到 `age` 的错误。这是因为非导出成员仅在合并前的命名空间中可见在上面的例子，同名的命名空间 `Person` 中，有一个非导出的属性 `age`，在第二个命名空间 `Person` 中没有 `age` 属性却引用了 `age`，所以 TypeScript 报出了找不到 `age` 的错误。这是因为非导出成员仅在合并前的命名空间中可见。

### 扩充模块

JavaScript 是一门动态类型的语言，通过 prototype 我们可以很容易地扩展原来的对象。

但是，如果我们直接扩展导入对象的原型链属性，TypeScript 会提示没有该属性的错误，因此我们就需要扩展原模块的属性。

```typescript
// person.ts
export class Person {}
// index.ts
import { Person } from './person';
declare module './person' {
  interface Person {
    greet: () => void;
  }
}
Person.prototype.greet = () => {
  console.log('Hi!');
};
```

在上面的例子中，我们声明了导入模块 `person` 中 `Person` 的属性，TypeScript 会与原模块的类型合并，通过这种方式我们可以扩展导入模块的类型。

### 扩充全局

全局模块指的是不需要通过 import 导入即可使用的模块，如全局的 window、document 等。

对全局对象的扩充与对模块的扩充是一样的，下面看一个具体示例：

在上面的例子中，因为我们声明了全局的 Array 对象有一个 getLen 方法，所以为 Array 对象实现 getLen 方法时，TypeScript 不会报错。

```typescript
declare global {
  interface Array<T extends unknown> {
    getLen(): number;
  }
}
Array.prototype.getLen = function () {
  return this.length;
};
```

## TypeScript 官方工具类型

在 TypeScript 中提供了许多自带的工具类型，因为这些类型都是全局可用的，所以无须导入即可直接使用。

### 操作接口类型

#### Partial

Partial 工具类型可以将一个类型的所有属性变为可选的，且该工具类型返回的类型是给定类型的所有子集，看如下代码。

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
interface Person {
  name: string;
  age?: number;
  weight?: number;
}
type PartialPerson = Partial<Person>;
// 相当于
interface PartialPerson {
  name?: string;
  age?: number;
  weight?: number;
}
```

在上述示例中，我们使用映射类型取出了传入类型的所有键值，并将其值设定为可选的。

#### Required

与 Partial 工具类型相反，Required 工具类型可以将给定类型的所有属性变为必填的。

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};
type RequiredPerson = Required<Person>;
interface Person {
  name: string;
  age?: number;
  weight?: number;
}
// 相当于
interface RequiredPerson {
  name: string;
  age: number;
  weight: number;
}
```

在上述示例中，映射类型在键值的后面使用了一个 `-` 符号，`- 与 ?` 组合起来表示去除类型的可选属性，因此给定类型的所有属性都变为了必填。

#### Readonly

Readonly 工具类型可以将给定类型的所有属性设为只读，这意味着给定类型的属性不可以被重新赋值，如下代码。

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
type ReadonlyPerson = Readonly<Person>;
// 相当于
interface ReadonlyPerson {
  readonly name: string;
  readonly age?: number;
  readonly weight?: number;
}
```

在上述示例中，经过 Readonly 处理后，ReadonlyPerson 的 `name、age、weight` 等属性都变成了 `readonly` 只读。

#### Pick

Pick 工具类型可以从给定的类型中选取出指定的键值，然后组成一个新的类型，下面我们看一个具体的示例。

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type NewPerson = Pick<Person, 'name' | 'age'>;
// 相当于
interface NewPerson {
  name: string;
  age?: number;
}
```

在上述示例中，Pick工具类型接收了两个泛型参数，第一个 T 为给定的参数类型，而第二个参数为需要提取的键值 key。有了参数类型和需要提取的键值 key（也就是说提取自己想要的key）。

#### Omit

与 Pick 类型相反，Omit 工具类型的功能是返回去除指定的键值之后返回的新类型，下面我们看一个具体的示例：

```typescript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
type NewPerson = Omit<Person, 'weight'>;
// 相当于
interface NewPerson {
  name: string;
  age?: number;
}
```

在上述示例中，`Omit` 类型的实现使用了前面介绍的 `Pick` 类型。我们知道 `Pick` 类型的作用是选取给定类型的指定属性，那么这里的 `Omit` 的作用应该是选取除了指定属性之外的属性，而 `Exclude` 工具类型的作用就是从入参 `T` 属性的联合类型中排除入参 `K` 指定的若干属性。

### 联合类型

在`Omit` 类型的实现中，我们使用了 `Exclude` 类型。通过使用 `Exclude` 类型，我们从接口的所有属性中去除了指定属性，因此，`Exclude` 的作用就是从联合类型中去除指定的类型。

#### Exclude

在介绍 Omit 类型的实现中，我们使用了 Exclude 类型。通过使用 Exclude 类型，我们从接口的所有属性中去除了指定属性，因此，Exclude 的作用就是从联合类型中去除指定的类型。

看如下代码。

```typescript
interface Person {
  name: string;
  age?: number;
  weight?: number;
}
// Exclude 的实现使用了条件类型。如果类型 T 可被分配给类型 U ，则不返回类型 T，否则返回此类型 T ，这样我们就从联合类型中去除了指定的类型。
type Exclude<T, U> = T extends U ? never : T;
// 排除a
type T = Exclude<'a' | 'b' | 'c', 'a'>; // => 'b' | 'c'
// 相当于从Person里面除去weight
type NewPerson = Omit<Person, 'weight'>;
// 相当于利用了Exclude去Person里面排除了weight，并通过Pick去保留
type NewPerson = Pick<Person, Exclude<keyof Person, 'weight'>>;
// 其中
type ExcludeKeys = Exclude<keyof Person, 'weight'>; // => 'name' | 'age'
```

#### Extract

Extract 类型的作用与 Exclude 正好相反，Extract 主要用来从联合类型中提取指定的类型，类似于操作接口类型中的 Pick 类型。

看下面代码。

```typescript
type Extract<T, U> = T extends U ? T: never;
type TA = Extract<'a' | 'b' | 'c' | 'd', 'd'>;
```

通过上述示例，我们发现 Extract 类型相当于取出两个联合类型的交集。

此外，我们还可以基于 Extract 实现一个获取接口类型交集的工具类型，如下示例：

```typescript
type Intersect<T, U> = {
  [K in Extract<keyof T, keyof U>]: T[K];
};
interface Person {
  name: string;
  age?: number;
  weight?: number;
}
interface NewPerson {
  name: string;
  age?: number;
}
type T = Intersect<Person, NewPerson>;
// 相当于
type T = {
  name: string;
  age?: number;
};
```

我们使用了 `Extract` 类型来提取两个接口类型属性的交集，并使用映射类型生成了一个新的类型。

#### NonNullable

`NonNullable` 的作用是从联合类型中去除 `null` 或者 `undefined` 的类型。

```typescript
type NonNullable<T> = T extends null | undefined ? never : T;
// 等同于使用 Exclude
type NonNullable<T> = Exclude<T, null | undefined>;
type T = NonNullable<string | number | undefined | null>; // => string | number
```

也就是说，如果 NonNullable 传入的类型可以被分配给 null 或是 undefined ，则不返回该类型，否则返回其具体类型。

#### Record

Record 的作用是生成接口类型，然后我们使用传入的泛型参数分别作为接口类型的属性和值。

如下代码所示：

```typescript
// 这里的实现限定了第一个泛型参数继承自keyof any
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
type MenuKey = 'home' | 'about' | 'more';
interface Menu {
  label: string;
  hidden?: boolean;
}
const menus: Record<MenuKey, Menu> = {
  // 这里的key值一定要是MenuKey的子集
  about: { label: '关于' },
  home: { label: '主页' },
  more: { label: '更多', hidden: true },
};
```

在上述示例中，Record 类型接收了两个泛型参数：第一个参数作为接口类型的属性，第二个参数作为接口类型的属性值。

在 TypeScript 中，`keyof any` 指代可以作为对象键的属性，如下示例：

```typescript
type T = keyof any; // => string | number | symbol
```

**说明**：目前，JavaScript 仅支持`string`、`number`、`symbol`作为对象的键值。

### 函数类型

#### ConstructorParameters

可以用来获取构造函数的构造参数，而 `ConstructorParameters` 类型的实现则需要使用 `infer` 关键字推断构造参数的类型。

关于 `infer` 关键字，我们可以把它当成简单的模式匹配来看待。如果真实的参数类型和 `infer` 匹配的一致，那么就返回匹配到的这个类型。

```typescript
type ConstructorParameters<T extends new (...args: any) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never;
class Person {
  constructor(name: string, age?: number) {}
}
// type T = [name: string, age?: number | undefined]
type T = ConstructorParameters<typeof Person>;
```

在上述示例中，ConstructorParameters 泛型接收了一个参数，并且限制了这个参数需要实现构造函数。于是，我们通过 infer 关键字匹配了构造函数内的构造参数，并返回了这些参数

#### Parameters

`Parameters` 的作用与 `ConstructorParameters` 类似，`Parameters` 可以用来获取函数的参数并返回序对，如下示例：

```typescript
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type T0 = Parameters<() => void>;// type T0 = []
type T1 = Parameters<(x: number, y?: string) => void>;// type T1 = [x: number, y?: string | undefined]
```

`Parameters` 的泛型参数限制了传入的类型需要满足函数类型。

#### ReturnType

`ReturnType` 的作用是用来获取函数的返回类型。

```typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
type T0 = ReturnType<() => void>; // type T0 = void
type T1 = ReturnType<() => string>; // type T1 = string
```

在上述示例中，ReturnType的泛型参数限制了传入的类型需要满足函数类型。

#### ThisParameterType

`ThisParameterType` 可以用来获取函数的 `this` 参数类型。

```typescript
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown;
type T = ThisParameterType<(this: Number, x: number) => void>; // Number
```

因为函数类型的第一个参数声明的是 `this` 参数类型，所以我们可以直接使用 `infer` 关键字进行匹配并获取 `this` 参数类型。类型别名 `T` 得到的类型就是 `Number`。

### 字符串类型

TypeScript 也提供了 `Uppercase`、`Lowercase`、`Capitalize`、`Uncapitalize`这 4 种内置的操作字符串的类型。

```typescript
type T0 = Uppercase<'Hello'>; // => 'HELLO'
type T1 = Lowercase<T0>; // => 'hello'
type T2 = Capitalize<T1>; // => 'Hello'
type T3 = Uncapitalize<T2>; // => 'hello'
```

## 工具类型

### 用泛型判断变量类型

我们就需要把确切的类型抽离为入参，然后封装成一个可复用的泛型。看如下代码，

```typescript
type isSubTyping<Child, Par> = Child extends Par ? true : false;
type isXX2 = isSubTyping<1, number>; // true
type isYY2 = isSubTyping<'string', string>; // true
type isZZ2 = isSubTyping<true, boolean>; // true
```

示例中的工具泛型其实是工具类型 `isSubTyping`，如果类型入参 `Child` 是 `Par` 的子类型，则返回布尔字面量类型 `true`，否则返回 `false`。这样，我们就可以使用 `isSubTyping` 判断其他任意两个类型之间的子类型关系了。

### 条件类型

TypeScript 支持使用三元运算的条件类型，它可以根据 `？`前面的条件判断返回不同的类型。同时，三元运算还支持嵌套。

```typescript
type isSubTyping<Child, Par> = Child extends Par ? true : false;
type isAssertable<T, S> = T extends S ? true :  S extends T ? true : false;
type isNumAssertable = isAssertable<1, number>; // true
type isStrAssertable = isAssertable<string, 'string'>; // true
type isNotAssertable = isAssertable<1, boolean>; // false
```

### 分配条件类型

在条件类型中，如果入参是联合类型，则会被拆解为一个个独立的（原子）类型（成员），然后再进行类型运算，看如下代码。

```typescript
type BooleanOrString = string | boolean | number;
type StringOrNumberArray<E> = E extends string | number ? E[] : E;
type WhatIsThis = StringOrNumberArray<BooleanOrString>; // boolean | string[] | number[]
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | number | boolean
```

`string` 和 `boolean`和`number` 组成的联合类型 `BooleanOrString` 作为泛型 `StringOrNumberArray` 入参的时候，则会被拆解成 `string` 和 `boolean` 和`number`这三个独立的类型，再通过 `extends` 关键字判断是否是 `string | number` 类型的子类型。

因为 `string`和`number` 是子集，而 `boolean` 不是，所以最终我们得到的 `WhatIsThis` 的类型是 `boolean | string[]`|`number[]`。

同样，通过某些手段强制`类型入参被当成一个整体，也可以解除类型分配，如下示例：

```typescript
type StringOrNumberArray<E> = [E] extends [string | number] ? E[] : E;
type WhatIsThis = StringOrNumberArray<string | boolean>; // string | boolean
```

在示例中，我们使用 [] 将入参 E 包起来，即便入参是联合类型 `string | boolean`，也会被当成**一个整体**对待，所以下面返回的是 `string | boolean`。

**注意：包含条件类型的泛型接收 never 作为泛型入参时，存在一定“陷阱”，如下示例：**

```typescript
type GetSNums = never extends number ? number[] : never extends string ? string[] : never; // number[];
type GetNever = StringOrNumberArray<never>; // never
```

因为 `never` 是所有类型的子类型，自然也是 `number` 的子类型，所以返回的是 `number` 类型的数组；所以传入 `never` 作为入参来实例化前面定义的泛型 `StringOrNumberArray` 时，返回的类型却是 `never`，而不是 `number[]`。



