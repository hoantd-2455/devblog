"use client";
import { Suspense, useState } from "react";
import {
  useSuspenseQuery,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { getPosts } from "../../lib/posts-query";
import PostListSkeleton from "../../components/post-list-skeleton";
import QueryErrorBoundary from "./query-error-boundary";
function SuspensePosts() {
  const { data } = useSuspenseQuery({
    queryKey: ["posts", "suspense-demo"],
    queryFn: () => getPosts(),
    retry: false,
  });
  // data được đảm bảo ở mức type, không cần data?.map.
  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
export default function SuspenseDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <button onClick={() => setVisible((value) => !value)}>
        {visible ? "Đóng Suspense demo" : "Mở Suspense demo"}
      </button>
      {visible && (
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <QueryErrorBoundary onReset={reset}>
              <Suspense fallback={<PostListSkeleton />}>
                <SuspensePosts />
              </Suspense>
            </QueryErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      )}
    </>
  );
}
