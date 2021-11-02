// 对象转为formdata

function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => {
        formData.append(key + `[${i}]`, subValue);
      });
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
}

let req = {
  file: 'xxx',
  userId: 1,
  phone: '1234567',
};
console.log(getFormData(req));
