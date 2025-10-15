function bubbleSort(arr) {
    if (arr.length <= 1) return arr;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }

        }
    }
    return arr;
}

const result = bubbleSort([1, 3, 2, 5, 4, 6, 7, 8, 9, 10]);
console.log(result, 16);