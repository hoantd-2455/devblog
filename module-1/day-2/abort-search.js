function fakeSearch(query, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Đã hủy", "AbortError"));
      return;
    }

    const timerId = setTimeout(() => {
      resolve(`Kết quả cho: ${query}`);
    }, 500);

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timerId);
        reject(new DOMException("Đã hủy", "AbortError"));
      },
      { once: true },
    );
  });
}

let currentController = null;

async function search(query) {
  currentController?.abort();
  const controller = new AbortController(); // Đây là nền tảng để dọn dẹp request
  // khi component unmount hoặc khi người dùng gõ search liên tục

  currentController = controller;
  try {
    const result = await fakeSearch(query, controller.signal);
    console.log(result);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    console.error(error);
  }
}

search("n");
setTimeout(() => search("ne"), 100);
setTimeout(() => search("next"), 200);
