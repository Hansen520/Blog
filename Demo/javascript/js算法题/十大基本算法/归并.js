const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return merge(mergeSort(left), mergeSort(right)); // 一直拆分，直到拆到只剩一个值
}

const merge = (left, right) => {
    const result = [];
    while (left.length && right.length) { // 在必须有值的情况下
        if (left[0] <= right[0]) {
            result.push(left.shift());

        } else {
            result.push(right.shift());
        }
    }

    return [...result, ...left, ...right] // 合，后续默认有序

}

const result = mergeSort([3, 1, 4, 2, 5]);
console.log(result);

