/*
    寻找路径下的某个值
 */
const json = {
    a: { b: { c: 1 }},
    d: { e: 2 }
};

// 比如说 下面的 'd' 'e' 那么对应的路径的值应该是2
const path = ['d', 'e'];

let p = json;
path.forEach((k) => {
    p = p[k];
})

console.log(p)
