function debounce(func, wait) {
    let timeout;
    return function(...args) {
        // 每次执行先清理一遍定时器
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, wait)
    }
}