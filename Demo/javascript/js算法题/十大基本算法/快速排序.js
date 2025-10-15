const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    const p = arr[0]; // 找一个基准值
    const left = [];
    const right = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > p) {
            right.push(arr[i]);
        } else {
            left.push(arr[i]);
        }
    }
    
    return [...quickSort(left), p, ...quickSort(right)];
}

const result = quickSort([8, 3, 2, 1]);
console.log(result);

