import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types";
import { postsKey, readResponse } from "../lib/posts-query";
export const postsMutationKey = ["posts", "write"] as const;
export function useAddPost() {
  const client = useQueryClient();
  return useMutation({
    mutationKey: postsMutationKey,
    mutationFn: async (input: { title: string; shouldFail: boolean }) =>
      readResponse<Post>(
        await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
      ),
    onMutate: async (input) => {
      await client.cancelQueries({ queryKey: postsKey });
      const previous = client.getQueryData<Post[]>(postsKey);
      const temporaryId = -Date.now();
      const temporary: Post = {
        id: temporaryId,
        title: input.title,
        body: "Đang lưu...",
        author: { id: 1, name: "Hoan" },
        comments: [],
        tags: ["react"],
        likes: 0,
      };
      client.setQueryData<Post[]>(postsKey, (old = []) => [...old, temporary]);
      return { previous, temporaryId };
    },
    onError: (_error, _input, context) => {
      if (context) client.setQueryData(postsKey, context.previous ?? []);
    },
    onSuccess: (post, _input, context) => {
      client.setQueryData<Post[]>(postsKey, (old = []) =>
        old.map((item) => (item.id === context.temporaryId ? post : item)),
      );
      // Trả Promise để pending kéo dài đến khi refetch hoàn thành.
      return client.invalidateQueries({ queryKey: postsKey });
    },
  });
}
export function useLikePost() {
  const client = useQueryClient();
  return useMutation({
    mutationKey: postsMutationKey,
    mutationFn: async (input: { id: number; shouldFail: boolean }) =>
      readResponse<Post>(
        await fetch(`/api/posts/${input.id}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
      ),
    onMutate: async (input) => {
      await client.cancelQueries({ queryKey: postsKey });
      const previous = client.getQueryData<Post[]>(postsKey);
      client.setQueryData<Post[]>(postsKey, (old = []) =>
        old.map((post) =>
          post.id === input.id
            ? { ...post, likes: (post.likes ?? 0) + 1 }
            : post,
        ),
      );
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context) client.setQueryData(postsKey, context.previous ?? []);
    },
    onSuccess: (updated) => {
      client.setQueryData<Post[]>(postsKey, (old = []) =>
        old.map((post) => (post.id === updated.id ? updated : post)),
      );
      return client.invalidateQueries({ queryKey: postsKey });
    },
  });
}
export function useUpdatePostTitle() {
  const client = useQueryClient();
  return useMutation({
    mutationKey: postsMutationKey,
    mutationFn: async (input: { id: number; title: string }) =>
      readResponse<Post>(
        await fetch(`/api/posts/${input.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: input.title }),
        }),
      ),
    onSuccess: () => client.invalidateQueries({ queryKey: postsKey }),
  });
}
