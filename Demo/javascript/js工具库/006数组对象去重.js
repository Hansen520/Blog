/*
 * @Date: 2025-06-16 10:31:03
 * @Description: description
 */
const arr = [
    { a: 1, b: 2 },
    { a: 1, b: 2 },
    { a: 1, b: 2, c: { a: 1, b: 2 } },
    { b: 2, a: 1, c: { b: 2, a: 1 } },
    { a: 1, b: 2, c: { a: 1, b: 2, c: { a: 1, b: 2 } } },
    { a: 1, b: 2, c: { a: 1, b: 2, c: { a: 1, b: 2 } } },
];

const isObject = (val) => typeof val === 'object' && val !== null;

function equal(val1, val2) {
    if (!isObject(val1) || !isObject(val2)) {
        return Object.is(val1, val2); // 判断两个值是否为相同值
    }
    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key)) {
            return false;
        }
        if (!equal(val1[key], val2[key])) {
            return false;
        }
    }
    return true;
};


const result = [];

for (const item of arr) {
    let isFind = false;
    for (const r of result) {
        if (equal(item, r)) {
            isFind = true;
            break;
        }
    }
    if (!isFind) {
        result.push(item);
    }
}

console.log(result);
