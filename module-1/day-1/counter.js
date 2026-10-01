function createCounter(initialValue = 0) {
  let value = initialValue;

  return {
    increment() {
      return (value += 1);
    },
    getValue() {
      return value;
    },
  };
}

const first = createCounter();
const second = createCounter(10);

console.log(first.increment()); // 1
console.log(first.increment()); // 2
console.log(second.getValue()); // 10
console.log(first.getValue()); // 2
