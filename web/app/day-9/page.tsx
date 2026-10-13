import Link from "next/link";
import PostList from "../../components/post-list";
import AddPostDemo from "../day-8/add-post-demo";
import PostsSummary from "../day-8/posts-summary";
import SelectorDemo from "./selector-demo";
import FilterSummary from "./filter-summary";
import StateDecisionDemo from "./state-decision-demo";
import "./day-9.css";
export default function Day9Page() {
  return (
    <main className="day-9">
      <h1>Day 9: Client state với Zustand</h1>
      <p>
        Filter ở Zustand; posts và likes ở TanStack Query; theme giữ ở Context.
      </p>
      <Link href="/day-8">Qua Day 8: bộ lọc vẫn giữ trong phiên client →</Link>
      <section>
        <h2>1. DevBlog: filter → queryKey → API</h2>
        <FilterSummary />
        <AddPostDemo />
        <PostsSummary />
        <PostList />
      </section>
      <section>
        <h2>2. Selector và render</h2>
        <SelectorDemo />
      </section>
      <section>
        <h2>3. Chọn nơi giữ state</h2>
        <StateDecisionDemo />
      </section>
    </main>
  );
}
