const selectSort = (arr) => {
    if (arr.length <= 1) return arr;

    for (let i = 0; i < arr.length - 1; i++) {
        let min = i; // 设置基准
        for (let j = i + 1; j < arr.length - 1; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr;
}

const result = selectSort([1, 3, 2, 5, 4, 6, 7, 8, 9, 10]);
console.log(result);