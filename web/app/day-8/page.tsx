import Link from "next/link";
import PostList from "../../components/post-list";
import CacheDemo from "./cache-demo";
import AddPostDemo from "./add-post-demo";
import PostsSummary from "./posts-summary";
import SuspenseDemo from "./suspense-demo";
import "./day-8.css";
export default function Day8Page() {
  return (
    <main className="day-8">
      <h1>Day 8: TanStack Query v5</h1>
      <p>
        Client state: query tìm kiếm, tag đang chọn, nội dung form. Server
        state: posts và số like.
      </p>
      <Link href="/day-8/away">Rời trang để kiểm tra cache →</Link>
      <section>
        <h2>1. DevBlog: cache posts và mutation</h2>
        <AddPostDemo />
        <PostsSummary />
        <PostList />
      </section>
      <section>
        <h2>2. staleTime và gcTime</h2>
        <CacheDemo />
      </section>
      <section>
        <h2>3. useSuspenseQuery</h2>
        <SuspenseDemo />
      </section>
      <p>Mở React Query Devtools ở góc màn hình để xem query và mutation.</p>
    </main>
  );
}
