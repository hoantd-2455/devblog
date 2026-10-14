import { getServerPosts } from "../../../lib/server-posts";
import ServerPostCard from "../../../components/server-post-card";
import WideClientCard from "../wide-client-card";
import InteractiveShell from "../interactive-shell";
export default async function BoundaryPage() {
  const [post] = await getServerPosts();
  if (!post)
    return (
      <main>
        <p>Chưa có bài để minh họa.</p>
      </main>
    );
  return (
    <main>
      <h2>Thu nhỏ client boundary</h2>
      <section>
        <h3>Trước: toàn card là client</h3>
        <WideClientCard post={post} />
      </section>
      <section>
        <h3>Sau: card ở server, chỉ nút Like ở client</h3>
        <ServerPostCard post={post} />
      </section>
      <section>
        <h3>Server content truyền qua children</h3>
        <p>
          InteractiveShell không import ServerPostCard; trang server tạo card
          rồi truyền children.
        </p>
        <InteractiveShell>
          <ServerPostCard post={post} />
        </InteractiveShell>
      </section>
      <p>
        Nút Like cục bộ chỉ minh họa boundary; nút Like trong server card ghi
        API mock.
      </p>
    </main>
  );
}
