import PostListSkeleton from "../components/post-list-skeleton";
export default function FeedLoading() {
  return (
    <main style={{ padding: 24 }}>
      <h1>DevBlog</h1>
      <PostListSkeleton />
    </main>
  );
}
