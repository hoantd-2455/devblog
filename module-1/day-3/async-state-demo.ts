import type { AsyncState, Post } from "../../types/index.ts";

function describeState(state: AsyncState<Post[]>): string {
  switch (state.status) {
    case "loading":
      return "Đang tải bài viết";
    case "success":
      return `Đã tải ${state.data.length} bài viết`;
    case "error":
      return `Tải thất bại: ${state.error.message}`;
    default: {
      const exhaustive: never = state;
      return exhaustive;
    }
  }
}

console.log(describeState({ status: "loading" }));
console.log(describeState({ status: "success", data: [] }));
console.log(
  describeState({ status: "error", error: new Error("Mất kết nối") }),
);
