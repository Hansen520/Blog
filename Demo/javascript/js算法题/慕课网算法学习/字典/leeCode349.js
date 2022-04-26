/*
    两个数组的交集
*/
/*
    思路
    求nums1和nums2都有的值
    用字典建立一个映射关系，记录nums1里有的值
    遍历nums2, 找出nums1里也有的值
*/

/*
    步骤
    新建一个字典，遍历nums1,填充字典
    遍历nums2, 遇到字典里的值就选出，并从字典中删除
*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
 var intersection = function(nums1, nums2) {
    const map = new Map();
    nums1.forEach((n) => {
        // 这里不会存储重复的值
        map.set(n, true);
    });
    const res = [];
    nums2.forEach((n) => {
        if(map.has(n)) {
            res.push(n);
            // 要及时删除，避免重复的情况
            map.delete(n);
        }
    });
    return res;
};