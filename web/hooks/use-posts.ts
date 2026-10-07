import { useCallback, useEffect, useRef, useState } from "react";
import type { AsyncState, Post } from "../../types";

export function usePosts() {
  const [state, setState] = useState<AsyncState<Post[]>>({
    status: "success",
    data: [],
  });
  const controllerRef = useRef<AbortController | null>(null);

  const loadPosts = useCallback(async () => {
    // Mỗi lần tải mới sẽ hủy request trước đó.
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setState({ status: "loading" });

    try {
      const response = await fetch("/api/posts", {
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const posts: Post[] = await response.json();
      if (controller.signal.aborted) return;
      setState({ status: "success", data: posts });
    } catch (error) {
      // Hủy request là hành vi chủ động, không phải lỗi cần hiển thị.
      if (controller.signal.aborted) return;
      setState({
        status: "error",
        error: error instanceof Error ? error : new Error(String(error)),
      });
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  const updatePostTitle = useCallback((id: number) => {
    setState((previous) => {
      if (previous.status !== "success") return previous;

      return {
        status: "success",
        data: previous.data.map((post) =>
          post.id === id ? { ...post, title: post.title + "!" } : post,
        ),
      };
    });
  }, []);

  return { state, loadPosts, updatePostTitle };
}
