/*
 * @Author: hansen
 * @Date: 2022-12-07 09:28:09
 * @LastEditors: hansen
 * @LastEditTime: 2022-12-07 09:45:21
 * @FilePath: \user-endd:\project\Blog\Demo\TEST\0007.高阶函数.js
 */
let cost = (function() {
    let args = [];
    return function() {
        // 只有最后一次才会走到这边来
        if (arguments.length === 0) {
            let money = 0;
            for (let i = 0 , l = args.length; i < l; i++) {
                money += args[i];
            }
            return money;
        } else {
            [].push.apply(args, arguments);
        }
    }
})();
cost(100);
cost(200);
cost(300);
console.log(cost());

function aaa() {
    console.log(arguments.callee); // 能打印函数本身
}
aaa();