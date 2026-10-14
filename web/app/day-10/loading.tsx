import PostListSkeleton from "../../components/post-list-skeleton";
export default function Day10Loading() {
  return (
    <main>
      <h2>Đang đọc dữ liệu trên server...</h2>
      <PostListSkeleton />
    </main>
  );
}
