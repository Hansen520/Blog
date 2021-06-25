// 1
let x = [0, '1', null]
// 2
class Animal {
  numLegs: number
}
class Bee extends Animal { }
class Lion extends Animal { }
let zoo = [new Bee(), new Lion()]//  new() => T