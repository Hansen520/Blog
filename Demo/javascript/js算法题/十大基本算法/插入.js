const insertSort = (arr) => {
    if (arr.length <= 1) return arr;
    // 98
    for (let i = 1; i < arr.length - 1; i++) {
        let current = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = current;
    }
    return arr;
}

const result = insertSort([1, 3, 2, 5, 4, 6, 7, 8, 9, 10]);
console.log(result);