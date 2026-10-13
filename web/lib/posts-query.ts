import { normalizeFilters, type PostFilters } from "../../api/post-filters";
import { queryOptions } from "@tanstack/react-query";
import type { Post } from "../../types";
export const postsKey = ["posts"] as const;
export async function readResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? `HTTP ${response.status}`);
  }
  return response.json();
}
export async function getPosts(signal?: AbortSignal): Promise<Post[]> {
  return readResponse<Post[]>(await fetch("/api/posts", { signal }));
}
export const postsOptions = queryOptions({
  queryKey: postsKey,
  queryFn: ({ signal }) => getPosts(signal),
  staleTime: 30_000,
});

export function filteredPostsOptions(input: PostFilters) {
  const filters = normalizeFilters(input);
  return queryOptions({
    queryKey: [...postsKey, "list", filters] as const,
    queryFn: ({ signal }) => getFilteredPosts(filters, signal),
    staleTime: 30_000,
  });
}
async function getFilteredPosts(
  filters: PostFilters,
  signal?: AbortSignal,
): Promise<Post[]> {
  const params = new URLSearchParams(filters);
  return readResponse<Post[]>(await fetch(`/api/posts?${params}`, { signal }));
}
