function deepClone(obj) {
  if (!obj && typeof obj !== Object) {
    return obj;
  }
  let result = null;
  if (Array.isArray(obj)) {
    result = [];
  } else {
    result = {};
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
