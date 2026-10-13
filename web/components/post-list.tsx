"use client";
import { useCallback } from "react";
import { useIsMutating, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types";
import { postsKey } from "../lib/posts-query";
import {
  postsMutationKey,
  useUpdatePostTitle,
} from "../hooks/use-post-mutations";
import { usePosts } from "../hooks/use-posts";
import { useFilteredPosts } from "../hooks/use-filtered-posts";
import PostCard from "./post-card";
import PostFilters from "./post-filters";
import PostListSkeleton from "./post-list-skeleton";
export default function PostList({ initialPosts }: { initialPosts?: Post[] }) {
  usePosts(initialPosts); // Cache danh sách đầy đủ cho các bài cũ và tổng số.
  const postsQuery = useFilteredPosts();
  const client = useQueryClient();
  const { mutate: updateTitle, error: updateError } = useUpdatePostTitle();
  const isWriting = useIsMutating({ mutationKey: postsMutationKey }) > 0;
  const updatePostTitle = useCallback(
    (id: number) => {
      const post = client
        .getQueriesData<Post[]>({ queryKey: postsKey })
        .flatMap(([, data]) => data ?? [])
        .find((item) => item.id === id);
      if (post) updateTitle({ id, title: post.title + "!" });
    },
    [client, updateTitle],
  );
  return (
    <>
      <PostFilters />
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
      {postsQuery.isSuccess && postsQuery.data.length === 0 && (
        <p>Không có bài phù hợp.</p>
      )}
      {postsQuery.data?.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onUpdate={updatePostTitle}
          disabled={isWriting || post.id < 0}
        />
      ))}
    </>
  );
}
