import { fetchPost, fetchPosts } from "../../api/client.ts";
import type { Post } from "../../types/index.ts";

// Mapped types: đi qua các key của T và giữ lại kiểu giá trị tương ứng.
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };
type MyPartial<T> = { [P in keyof T]?: T[P] };

// Conditional type + infer: lấy kiểu bên trong Promise, kể cả Promise lồng nhau.
type MyAwaited<T> = T extends Promise<infer Value> ? MyAwaited<Value> : T;

type PostPreview = MyPick<Post, "id" | "title">;
const preview: PostPreview = { id: 1, title: "Post 1" };
const patch: MyPartial<Post> = { title: "Tiêu đề mới" };

// Đối chiếu với các utility type có sẵn của TypeScript.
const builtInPreview: Pick<Post, "id" | "title"> = preview;
const builtInPatch: Partial<Post> = patch;
type PostWithoutComments = Omit<Post, "comments">;
type PostList = Awaited<ReturnType<typeof fetchPosts>>;
type SinglePost = MyAwaited<ReturnType<typeof fetchPost>>;
type NestedValue = MyAwaited<Promise<Promise<string>>>;

const titlesById: Record<number, string> = { [preview.id]: preview.title };
const postId: SinglePost["id"] = 1;
const postCount: PostList["length"] = 0;
const authorName: PostWithoutComments["author"]["name"] = "Hoan";
const nestedValue: NestedValue = "đã mở Promise lồng nhau";

console.log(builtInPreview, builtInPatch, titlesById);
console.log(postId, postCount, authorName, nestedValue);
