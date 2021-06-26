// ES5
console.log(/foo.bar/.test('foo\nbar')) // false
console.log(/foo[^]bar/.test('foo\nbar')) // true
// ES6 dolall
console.log(/foo.bar/s.test('foo\nbar')) // true
console.log(/foo.bar/s.test('foo\rbar')) // true
