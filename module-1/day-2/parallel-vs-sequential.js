function loadPost(postId) {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      console.log(`finish ${postId}`);
      resolve(postId);
    }, 200);
  });
}

async function main() {
  const ids = [1, 2, 3];

  const sequentialStart = performance.now();
  for (const id of ids) {
    await loadPost(id); // tạo và chờ từng cái một xong,
    // dẫn đến mất nhiều thời gian
  }

  const sequentialTime = performance.now() - sequentialStart;

  const parallelStart = performance.now();
  await Promise.all(ids.map(loadPost)); // tạo các request đồng thời và thực hiện luôn
  // -> giúp rút ngắn thời gian chờ.
  const parallelTime = performance.now() - parallelStart;

  console.log(`Sequential: ${sequentialTime.toFixed(0)} ms`);
  console.log(`Parallel: ${parallelTime.toFixed(0)} ms`);
}

main();
