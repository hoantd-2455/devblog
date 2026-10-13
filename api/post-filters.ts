import type { Post } from "../types/post.ts";
export type PostFilters = { tag: string; query: string };
export function normalizeFilters(filters: PostFilters): PostFilters {
  return {
    tag: filters.tag.trim().toLowerCase() || "all",
    query: filters.query.trim().toLowerCase(),
  };
}
export function matchesPostFilters(post: Post, filters: PostFilters): boolean {
  const normalized = normalizeFilters(filters);
  return (
    post.title.toLowerCase().includes(normalized.query) &&
    (normalized.tag === "all" || (post.tags ?? []).includes(normalized.tag))
  );
}
