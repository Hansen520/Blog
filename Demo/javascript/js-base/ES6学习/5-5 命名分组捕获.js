const p = '2020-01-10'.match(/(\d{4})-(\d{2})-(\d{2})/)
console.log(p)
console.log(p[0])
console.log(p[1])
console.log(p[2])
// 但是上面如果多的时候去访问就会遇见麻烦，所以我们给他一个名字

const t = '2020-01-10'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/)
// 访问
console.log(t)
console.log(t.groups.year)
console.log(t.groups.month)
console.log(t.groups.day)
