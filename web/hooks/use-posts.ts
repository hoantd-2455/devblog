import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../types";
import { postsOptions } from "../lib/posts-query";
export function usePosts(initialPosts?: Post[]) {
  // Các component dùng cùng queryKey sẽ đọc chung cache.
  return useQuery({ ...postsOptions, initialData: initialPosts });
}
