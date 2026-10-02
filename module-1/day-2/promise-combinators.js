function request(name, delay, shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`${name} finished`);

      if (shouldFail) {
        reject(new Error(`${name} failed`));
        return;
      }

      resolve(`${name} data`);
    }, delay);
  });
}

function makeRequests() {
  return [
    request("posts", 100),
    request("comments", 200, true),
    request("users", 300),
  ];
}

function makeRequests2() {
  return [
    request("posts", 200),
    request("comments", 100, true),
    request("users", 300),
  ];
}

async function main() {
  // Promise.all — fail nhanh, một cái lỗi là cả cụm reject.
  try {
    const values = await Promise.all(makeRequests());
    console.log("all:", values);
  } catch (error) {
    console.log("all error:", error.message);
  }

  // Promise.allSettled — chờ tất cả, trả về trạng thái từng cái
  // (rất hợp khi không muốn một lỗi làm hỏng cả lô).
  const results = await Promise.allSettled(makeRequests());
  console.log("allSettled:", results);

  // Promise.race — cái nào xong/lỗi trước thắng. -> comment failed trc nên lấy
  try {
    const racePromise = await Promise.race(makeRequests2());
    console.log("racePromise:", racePromise);
  } catch (error) {
    console.log("racePromise error:", error.message);
  }

  // Promise.any —
  // cái thành công đầu tiên thắng, chỉ reject khi tất cả fail.
  // Post thành công nên bỏ qua lỗi của comment và lấy nó
  try {
    const anyPromise = await Promise.any(makeRequests2());
    console.log("anyPromise:", anyPromise);
  } catch (error) {
    console.log("anyPromise error:", error.message);
  }
}

main();
