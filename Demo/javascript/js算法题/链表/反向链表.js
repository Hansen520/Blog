// 反转链表
const a = { val: 'a' };
const b = { val: 'b' };
const c = { val: 'c' };
const d = { val: 'd' };
a.next = b;
b.next = c;
c.next = d;

function reserve(head) {
  let p1 = head;
  let p2 = null;
  while (p1) {
    const tmp = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = tmp;
  }
  return p2;
}
console.log(reserve(a));
