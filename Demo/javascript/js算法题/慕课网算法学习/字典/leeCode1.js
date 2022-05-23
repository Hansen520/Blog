/*
    求两数之和
*/

/*
    解题步骤
    1. 新建一个字典作为婚姻介绍所
    2. nums里的值，逐个来介绍所找对象，没有合适的就先登记着，有合适的就牵手成功
*/

var twoSum = function(nums, target) {
    const map = new Map();
    for(let i = 0; i < nums.length; i += 1) {
        const n = nums[i];
        const n2 = target - n;
        if(map.has(n2)) {
            return [map.get(n2), i];
        } else {
            map.set(n, i);
        }
    }
}