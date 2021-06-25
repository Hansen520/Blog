class BeeKeeper {
  hasMask: boolean
}

class LigonKeeper {
  nametag: string
}

class Animal {
  numLengs: number
}

class Bee extends Animal {
  keeper: BeeKeeper
}

class Lion extends Animal {
  kepper: LigonKeeper
}

function createInstance<T extends Animal>(c: new() => T): T {
  return new c()
}

createInstance(Lion).kepper.nametag
createInstance(Bee).keeper.hasMask