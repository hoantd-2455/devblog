import Link from "next/link";
import { getServerPosts, getServerFacts } from "../../lib/server-posts";
import ServerPostCard from "../../components/server-post-card";
export default async function Day10Page({
  searchParams,
}: {
  searchParams: Promise<{ fail?: string }>;
}) {
  const { fail } = await searchParams;
  const [posts, facts] = await Promise.all([
    getServerPosts({ shouldFail: fail === "1" }),
    getServerFacts(),
  ]);
  return (
    <main>
      <h2>App Router và React Server Components</h2>
      <p>
        Dự án hiện có Next {facts.nextVersion}. Version được đọc bằng node:fs
        trên server.
      </p>
      <p>
        Trang async đọc dữ liệu trực tiếp, không dùng useEffect. Nút Like là
        Client Component nhỏ.
      </p>
      <nav>
        <Link href="/day-10?fail=1" prefetch={false}>
          Giả lập lỗi tải
        </Link>
        <Link href="/day-10/posts/999999" prefetch={false}>
          Thử not-found
        </Link>
      </nav>
      {posts.map((post) => (
        <ServerPostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
