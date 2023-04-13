let len; // 因为声明的多个函数都需要数据长度，所以把len设置成为全局变量

function buildMaxHeap(arr) {// 建立大顶堆
    len = arr.length; // 15
    // 7
    for(let i = Math.floor(len / 2); i >= 0; i--) {
        heapify(arr, i); // i = 7 6 5 4 3 2 1;
    }

}

function heapify(arr, i) { // 堆调整
    console.log(i, 14)
    let left = 2 * i + 1, // 15
    right = 2 * i + 2, // 16
    largest = i; // 7

    if(left < len && arr[left] > arr[largest]) {
        largest = left;
    }
    if(right < len && arr[right] > arr[largest]) {
        largest = right;
    }
    // 索引不等则进行交换
    if(largest != i) {
        swap(arr, i, largest);
        heapify(arr, largest);
    }
    
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
};


function heapSort(arr) {
    buildMaxHeap(arr);

    for (var i = arr.length - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0);
    }
    return arr;
}

console.log(heapSort([91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31,77, 81, 22]));
// console.log(heapSort[91, 60, 96, 13, 35, 65, 46, 65, 10, 30, 20, 31,77, 81, 22]);