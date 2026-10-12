export default function PostListSkeleton() {
  return (
    <div role="status" aria-label="Đang tải bài viết" className="post-skeleton">
      {[1, 2].map((id) => (
        <div key={id} aria-hidden="true" className="skeleton-card">
          <div className="skeleton-line skeleton-title" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      ))}
      <span>Đang tải bài viết...</span>
    </div>
  );
}
