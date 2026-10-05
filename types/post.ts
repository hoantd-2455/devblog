import type { Author } from "./author.ts";
import type { Comment } from "./comment.ts";

export interface Post {
  id: number;
  title: string;
  body: string;
  author: Author;
  comments: Comment[];
}
