// 第一种---------------------------------------
let person = [
  { id: 0, name: '小明' },
  { id: 1, name: '小张' },
  { id: 1, name: '小李' },
  { id: 2, name: '小孙' },
];
let obj = {};
let peon = person.reduce((cur, next) => {
  if (!obj[next.id]) {
    cur.push(next);
    obj[next.id] = true;
  }
  return cur;
}, []);
console.log(peon);
// 第二种------------------------------------------------
let person1 = [
  { id: 0, name: '小明' },
  { id: 1, name: '小张' },
  { id: 1, name: '小李' },
  { id: 2, name: '小孙' },
  { id: 2, name: '小白' },
  { id: 2, name: '小金' },
];
let newPerson1 = [];
let newPerson2 = [];
for (let i = 0; i < person1.length; i++) {
  if (newPerson1.indexOf(person1[i].id) == -1) {
    newPerson1.push(person1[i].id);
    newPerson2.push(person1[i]);
  }
}
console.log(newPerson2);
// 第三种-----------------------------------------------
let map = new Map();
for (let item of person1) {
  if (!map.has(item.id)) {
    map.set(item.id, item);
  }
}
console.log([...map.values()]);
