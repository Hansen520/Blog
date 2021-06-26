let arr = [1, 2, 3]
function * gen () {
  while (1) {
    yield arr.shift()
  }
}
console.log(gen())
