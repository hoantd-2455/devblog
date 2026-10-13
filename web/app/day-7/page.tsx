import { Suspense } from "react";
import { fetchPosts } from "../../../api/client";
import PostListSkeleton from "../../components/post-list-skeleton";
import SuspenseDemo from "./suspense-demo";
import TransitionDemo from "./transition-demo";
import ActionFormDemo from "./action-form-demo";
import OptimisticLikeDemo from "./optimistic-like-demo";
import React192Demo from "./react-192-demo";
import "./day-7.css";

// Tải mỗi request để bài học luôn quan sát được skeleton, không prerender data.
export const dynamic = "force-dynamic";

async function loadPosts() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return fetchPosts();
}

export default function Day7Page() {
  // Không await ở đây: Suspense có thể stream fallback trước dữ liệu.
  const postsPromise = loadPosts();
  return (
    <main className="day-7">
      <h1>Day 7: Concurrent React</h1>
      <section>
        <h2>1. Suspense + use: DevBlog</h2>
        <p>
          Skeleton khi tải; lọc tag bằng transition; like cập nhật ngay và
          rollback khi lỗi.
        </p>
        <Suspense fallback={<PostListSkeleton />}>
          <SuspenseDemo postsPromise={postsPromise} />
        </Suspense>
      </section>
      <section>
        <h2>2. Lọc danh sách lớn</h2>
        <TransitionDemo />
      </section>
      <section>
        <h2>3. Form Actions + optimistic UI</h2>
        <ActionFormDemo />
        <h3>Like cục bộ với useOptimistic (Day 7)</h3>
        <OptimisticLikeDemo postId={1} />
      </section>
      <section>
        <h2>4. React 19.2: Effect Event và Activity</h2>
        <React192Demo />
      </section>
    </main>
  );
}
