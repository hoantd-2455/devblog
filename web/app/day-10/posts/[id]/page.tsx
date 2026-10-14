import { notFound } from "next/navigation";
import { getServerPosts } from "../../../../lib/server-posts";
import ServerPostCard from "../../../../components/server-post-card";
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) notFound();
  const posts = await getServerPosts();
  const post = posts.find((item) => item.id === numericId);
  if (!post) notFound();
  return (
    <main>
      <h2>Chi tiết bài {post.id}</h2>
      <ServerPostCard post={post} />
    </main>
  );
}
