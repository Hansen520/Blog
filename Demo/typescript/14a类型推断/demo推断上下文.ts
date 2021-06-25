class Animal1 {
  numLegs: number
}
class Bee1 extends Animal1 { }
class Lion1 extends Animal1 { }

function createZoo(): Animal1[] {
  return [new Bee1(), new Lion1()]
}