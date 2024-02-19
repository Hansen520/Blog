/*
 * @Date: 2024-02-19 17:51:00
 * @Description: description
 * 
 * 
 */
const pipe = (()=> {
    return (value) => {
        const funcStack = [];
        const oProxy = new Proxy({}, {
            get(pipeObject, fnName) {
                console.log(fnName, value, window[fnName], 12);
                if (fnName === 'get') {
                    // fn 为存入栈的函数， val为最终值
                    return funcStack.reduce((val, fn) => fn(val), value);
                }
                // 先存入
                funcStack.push(window[fnName]);
                return oProxy;
            }
        });
        return oProxy;
    }
})();


var double = n => n * 2;
var pow    = n => n * n;
var reverseInt = n => n.toString().split("").reverse().join("") | 0;

const val = pipe(3).double.pow.reverseInt.get; // 63
console.log(val);