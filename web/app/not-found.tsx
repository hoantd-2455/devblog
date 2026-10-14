import Link from "next/link";
export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Không tìm thấy trang</h1>
      <Link href="/">Về DevBlog</Link>
    </main>
  );
}
