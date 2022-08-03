function sortRadom(arr = []) {
  return arr.sort(() => {
    return Math.random() - 0.5;
  });
}

console.log(sortRadom([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
