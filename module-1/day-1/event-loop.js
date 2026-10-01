console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

async function main() {
  console.log("D");
  await Promise.resolve();
  console.log("E");
}

main();
console.log("F");

// My mind: A B C D E F
