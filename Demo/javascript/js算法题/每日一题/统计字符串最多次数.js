let str = 'asdfssaaasasasasaa';
const json = {};
for (let i = 0; i < str.length; i++) {
  // console.log(str[i]);
  if (!json.hasOwnProperty(str[i])) {
    json[str[i]] = 1;
  } else {
    json[str[i]]++;
  }
}
console.log(json);
let maxNum = 0;
for (let val of Object.values(json)) {
  // console.log(val);
  if (val > maxNum) {
    maxNum = val;
  }
}
console.log(maxNum);
