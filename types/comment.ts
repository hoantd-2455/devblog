import type { Author } from "./author.ts";

export interface Comment {
  id: number;
  postId: number;
  author: Author;
  body: string;
}
