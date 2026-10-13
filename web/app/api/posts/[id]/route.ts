import { updatePost } from "../../../../../api/client";
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const postId = Number(id);
  const input: unknown = await request.json().catch(() => null);
  if (
    !Number.isInteger(postId) ||
    postId < 1 ||
    !input ||
    typeof input !== "object" ||
    !("title" in input) ||
    typeof input.title !== "string" ||
    !input.title.trim()
  )
    return Response.json(
      { error: "ID hoặc tiêu đề không hợp lệ" },
      { status: 400 },
    );
  try {
    return Response.json(
      await updatePost(postId, { title: input.title.trim() }, request.signal),
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Lỗi cập nhật" },
      { status: 500 },
    );
  }
}
