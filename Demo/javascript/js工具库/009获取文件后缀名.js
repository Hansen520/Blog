function getExt(filename) {
  if (typeof filename === 'string') {
    return filename.split('.').pop().toLocaleLowerCase();
  } else {
    throw new Error('filename must be a string type');
  }
}

// 使用
console.log(getExt('1.mp4'));
console.log(getExt('2.jpg'));
console.log(getExt('3.jpg.png'));
