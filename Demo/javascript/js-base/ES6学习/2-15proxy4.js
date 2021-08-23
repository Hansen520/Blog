let validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    obj[prop] = value;
    return true;
  },
};

let person = new Proxy({}, validator);

person.age = 100;

person.age;
person.age = 'young';
person.age = 300;
