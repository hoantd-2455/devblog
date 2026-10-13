"use client";

import { useCallback, useState, useTransition } from "react";
import { useIsMutating, useQueryClient } from "@tanstack/react-query";
import { postsKey } from "../lib/posts-query";
import {
  postsMutationKey,
  useUpdatePostTitle,
} from "../hooks/use-post-mutations";
import type { Post } from "../../types";
import { useDebouncedValue } from "../hooks/use-debounced-value";
import { usePosts } from "../hooks/use-posts";
import PostCard from "./post-card";
import PostListSkeleton from "./post-list-skeleton";

export default function PostList({ initialPosts }: { initialPosts?: Post[] }) {
  const postsQuery = usePosts(initialPosts);
  const client = useQueryClient();
  const { mutate: updateTitle, error: updateError } = useUpdatePostTitle();
  const isWriting = useIsMutating({ mutationKey: postsMutationKey }) > 0;
  const updatePostTitle = useCallback(
    (id: number) => {
      const post = client
        .getQueryData<Post[]>(postsKey)
        ?.find((item) => item.id === id);
      if (post) updateTitle({ id, title: post.title + "!" });
    },
    [client, updateTitle],
  );
  const [query, setQuery] = useState("");
  const appliedQuery = useDebouncedValue(query, 300);
  const [selectedTag, setSelectedTag] = useState("all");
  const [filterTag, setFilterTag] = useState("all");
  const [isPending, startTransition] = useTransition();

  const posts = postsQuery.data ?? [];
  const keyword = appliedQuery.trim().toLowerCase();
  const tags = [...new Set(posts.flatMap((post) => post.tags ?? []))];
  const visiblePosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(keyword) &&
      (filterTag === "all" || post.tags?.includes(filterTag)),
  );

  return (
    <>
      <button
        disabled={isWriting || postsQuery.isFetching}
        onClick={() => void postsQuery.refetch()}
      >
        Tải lại bài viết
      </button>
      {postsQuery.isPending && <PostListSkeleton />}
      {postsQuery.isError && (
        <p role="alert">Lỗi: {postsQuery.error.message}</p>
      )}
      {postsQuery.isFetching && !postsQuery.isPending && (
        <p role="status">Đang đồng bộ bài viết...</p>
      )}
      {updateError && <p role="alert">{updateError.message}</p>}
      <label>
        Lọc tag
        <select
          value={selectedTag}
          onChange={(event) => {
            const tag = event.target.value;
            setSelectedTag(tag); // Cập nhật lựa chọn ngay.
            startTransition(() => setFilterTag(tag)); // Danh sách ưu tiên thấp.
          }}
        >
          <option value="all">Tất cả</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      {isPending && <p role="status">Đang lọc tag...</p>}
      {postsQuery.isSuccess && visiblePosts.length === 0 && (
        <p>Không có bài phù hợp.</p>
      )}
      {visiblePosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onUpdate={updatePostTitle}
          disabled={isWriting || post.id < 0}
        />
      ))}
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm theo tiêu đề"
      />
    </>
  );
}
