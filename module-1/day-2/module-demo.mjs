import { posts, findPost } from "./posts.mjs";

console.log("Số bài viết:", posts.length);
console.log("Bài viết ID 1:", findPost(1)?.title);
