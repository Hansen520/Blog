let oSet = new Set([+0, -0, 3, undefined, NaN])
oSet.add('hello')
oSet.add(undefined)
oSet.add(-0)
oSet.add(+0)
oSet.add(NaN)
console.log(oSet)
console.log(oSet.keys())
console.log(oSet.values())
console.log(oSet.entries())
oSet.forEach(item => {
  console.log(item)
})
console.log('-----------')
for (const iterator of oSet) {
  console.log(iterator)
}
