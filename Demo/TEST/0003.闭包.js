/*
 * @Author: hansen
 * @Date: 2022-11-28 09:19:23
 * @LastEditors: hansen
 * @LastEditTime: 2022-11-28 09:46:52
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\0003.闭包.js
 */
let cache = {};
let mult = function() {
    let args = Array.prototype.join.call(arguments, ',');
    if (cache[args]) {
        return cache[args];
    }
    var a = 1;
    for (let i = 0, l = arguments.length; i < l; i++) {
        a = a * arguments[i];
    }
    return cache[args] = a;

};

console.log(mult(1,2,3,4)); // cache 为 { '1,2,3,4': 24 }


// 写法2
const mult2 = (function() {
    let cache = {}; // {}
    console.log(arguments, 28);
    return function() {
        console.log(arguments, 30);// { '0': 1, '1': 2, '2': 3 }
        let args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        var a = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return cache[args] = a;
    }
})();
console.log(mult2(1,2,3));

// 写法3
const mult3 = (function(){
    let cache = {};
    let calculate = function() {
        let a = 1;
        for (let i = 0, l = arguments.length; i < l; i++) {
            a = a * arguments[i];
        }
        return a;
    }
    return function () {
        let args = Array.prototype.join.call(arguments, ',');
        if (cache[args]) {
            return cache[args];
        }
        return cache[args] = calculate.apply(null, arguments);
    }

})();
console.log(mult3(2,3,4), 62);