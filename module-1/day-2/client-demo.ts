import { fetchPosts, fetchPost } from "../../api/client.ts";

async function main() {
  console.log(await fetchPosts()); // Hoàn thành bình thường
  console.log(await fetchPost(1)); // Hoàn thành bình thường

  try {
    console.log(await fetchPost(999)); // K thấy
  } catch (error) {
    console.log(error);
  }

  const controller = new AbortController();
  const pending = fetchPost(2, controller.signal);
  setTimeout(() => controller.abort(), 100);

  try {
    await pending;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.log("Đã hủy request");
    } else {
      throw error;
    }
  }
}

main();
