import type { Author, Post } from "../types/index.ts";

const author: Author = { id: 1, name: "Hoan" };
const commenter: Author = { id: 2, name: "An" };

const mockPosts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    body: "Hôm nay trời đẹp",
    author,
    comments: [{ id: 1, postId: 1, author: commenter, body: "Bài viết hay!" }],
  },
  {
    id: 2,
    title: "Post 2",
    body: "Thứ 6 auto tắc đường",
    author,
    comments: [],
  },
];

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Đã hủy", "AbortError"));
      return;
    }

    const timerId = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    signal?.addEventListener("abort", onAbort, { once: true });

    function onAbort() {
      clearTimeout(timerId);
      reject(new DOMException("Đã hủy", "AbortError"));
    }
  });
}

export async function fetchPosts(signal?: AbortSignal): Promise<Post[]> {
  await wait(300, signal);
  return mockPosts;
}

export async function fetchPost(
  id: number,
  signal?: AbortSignal,
): Promise<Post> {
  await wait(300, signal);

  const post = mockPosts.find((item) => item.id === id);
  if (post === undefined) {
    throw new Error(`Không tìm thấy bài viết ${id}`);
  }
  return post;
}
