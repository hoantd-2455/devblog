import Link from "next/link";
export default function AwayPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Trang khác</h1>
      <p>Provider ở root layout vẫn giữ cache khi điều hướng bằng Link.</p>
      <Link href="/day-8">← Quay lại Day 8</Link>
    </main>
  );
}
