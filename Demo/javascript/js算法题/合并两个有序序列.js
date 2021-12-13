function he(num1, m, num2, n) {
  num1.splice(m);
  num2.splice(n);
  num1.push(...num2);
  num1.sort((a, b) => a - b);
  return num1;
}
// 将nums1和nums2合并成一个有序的序列
let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
let m = 3;
let n = 3;
const result = he(nums1, m, nums2, n);
console.log(result);
