import "server-only";
import { connection } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fetchPosts } from "../../api/client";

export async function getServerPosts({ shouldFail = false, delay = 900 } = {}) {
  // Dữ liệu mock thay đổi theo process; đọc theo request thay vì prerender.
  await connection();
  await new Promise((resolve) => setTimeout(resolve, delay));
  if (shouldFail) throw new Error("Lỗi tải feed được giả lập cho Day 10");
  console.log("[RSC] Đọc posts trực tiếp trên server");
  return fetchPosts();
}
export async function getServerFacts() {
  // Browser không thể import fs. Chỉ thông tin công khai được trả về UI.
  const source = await readFile(
    path.join(process.cwd(), "package.json"),
    "utf8",
  );
  const config = JSON.parse(source) as { dependencies: { next: string } };
  return { nextVersion: config.dependencies.next };
}
