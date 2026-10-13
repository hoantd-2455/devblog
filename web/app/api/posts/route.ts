import { createPost, fetchPosts } from "../../../../api/client";
export async function GET(request: Request) {
  return Response.json(await fetchPosts(request.signal));
}
export async function POST(request: Request) {
  const input: unknown = await request.json().catch(() => null);
  if (
    !input ||
    typeof input !== "object" ||
    !("title" in input) ||
    typeof input.title !== "string" ||
    !input.title.trim()
  )
    return Response.json(
      { error: "Tiêu đề không được để trống" },
      { status: 400 },
    );
  try {
    return Response.json(
      await createPost(
        {
          title: input.title.trim(),
          shouldFail: "shouldFail" in input && input.shouldFail === true,
        },
        request.signal,
      ),
      { status: 201 },
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Lỗi thêm bài" },
      { status: 500 },
    );
  }
}
