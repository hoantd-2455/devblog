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
