import type { QueryClient, QueryKey } from "@tanstack/react-query";
import type { Post } from "../../types";
import { matchesPostFilters, type PostFilters } from "../../api/post-filters";
import { postsKey } from "./posts-query";
export type PostsSnapshot = [QueryKey, Post[] | undefined][];
export function snapshotPosts(client: QueryClient): PostsSnapshot {
  return client.getQueriesData<Post[]>({ queryKey: postsKey });
}
export function restorePosts(client: QueryClient, snapshot: PostsSnapshot) {
  for (const [key, data] of snapshot)
    if (data !== undefined) client.setQueryData(key, data);
}
export function belongsToQuery(post: Post, key: QueryKey): boolean {
  if (key[1] !== "list") return true;
  return matchesPostFilters(post, key[2] as PostFilters);
}
export function appendOptimisticPost(client: QueryClient, post: Post) {
  for (const [key, data] of snapshotPosts(client)) {
    if (data && belongsToQuery(post, key))
      client.setQueryData(key, [...data, post]);
  }
}
export function updateCachedPost(
  client: QueryClient,
  id: number,
  update: (post: Post) => Post,
) {
  client.setQueriesData<Post[]>({ queryKey: postsKey }, (old) =>
    old?.map((post) => (post.id === id ? update(post) : post)),
  );
}
