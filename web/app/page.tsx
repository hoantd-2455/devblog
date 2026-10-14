import Link from "next/link";
import { getServerPosts } from "../lib/server-posts";
import ServerPostCard from "../components/server-post-card";
import styles from "./page.module.css";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ fail?: string }>;
}) {
  const params = await searchParams;
  const posts = await getServerPosts({ shouldFail: params.fail === "1" });
  return (
    <main className={styles.main}>
      <h1>DevBlog</h1>
      <p>Feed được đọc và render bằng React Server Components.</p>
      <nav>
        <Link href="/day-10" prefetch={false}>
          Bài học Day 10
        </Link>
        <Link href="/?fail=1" prefetch={false}>
          Thử lỗi feed
        </Link>
        <Link href="/day-9">Bài học trước</Link>
      </nav>
      {posts.map((post) => (
        <ServerPostCard key={post.id} post={post} />
      ))}
    </main>
  );
}
