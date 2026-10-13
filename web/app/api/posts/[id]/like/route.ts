import { updatePost } from "../../../../../../api/client";
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId < 1)
    return Response.json({ error: "ID không hợp lệ" }, { status: 400 });
  const input = await request.json().catch(() => ({}));
  try {
    return Response.json(
      await updatePost(
        postId,
        { like: true, shouldFail: input?.shouldFail === true },
        request.signal,
      ),
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Lỗi like" },
      { status: 500 },
    );
  }
}
