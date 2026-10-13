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
    tags: ["react", "javascript"],
    likes: 0,
  },
  {
    id: 2,
    title: "Post 2",
    body: "Thứ 6 auto tắc đường",
    author,
    comments: [],
    tags: ["nextjs"],
    likes: 0,
  },
];

// Store học tập trong bộ nhớ của process, không dùng cho production.
const runtime = globalThis as typeof globalThis & { __devblogPosts?: Post[] };
const postsStore = (runtime.__devblogPosts ??= structuredClone(mockPosts));

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
  return structuredClone(postsStore);
}

export async function fetchPost(
  id: number,
  signal?: AbortSignal,
): Promise<Post> {
  await wait(300, signal);

  const post = postsStore.find((item) => item.id === id);
  if (post === undefined) {
    throw new Error(`Không tìm thấy bài viết ${id}`);
  }
  return structuredClone(post);
}

export async function createPost(
  input: { title: string; shouldFail?: boolean },
  signal?: AbortSignal,
): Promise<Post> {
  await wait(1200, signal);
  if (input.shouldFail) throw new Error("Giả lập lỗi thêm bài");
  const post: Post = {
    id: Math.max(0, ...postsStore.map((item) => item.id)) + 1,
    title: input.title,
    body: "Bài được thêm trong bài học TanStack Query.",
    author,
    comments: [],
    tags: ["react"],
    likes: 0,
  };
  postsStore.push(post);
  return structuredClone(post);
}
export async function updatePost(
  id: number,
  input: { like?: boolean; shouldFail?: boolean; title?: string },
  signal?: AbortSignal,
): Promise<Post> {
  await wait(1200, signal);
  if (input.shouldFail) throw new Error("Giả lập lỗi cập nhật bài");
  const post = postsStore.find((item) => item.id === id);
  if (!post) throw new Error("Không tìm thấy bài viết");
  if (input.like) post.likes = (post.likes ?? 0) + 1;
  if (input.title !== undefined) post.title = input.title;
  return structuredClone(post);
}
