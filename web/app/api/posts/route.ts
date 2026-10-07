import { fetchPosts } from "../../../../api/client";

export async function GET(request: Request) {
  const posts = await fetchPosts(request.signal);
  return Response.json(posts);
}
