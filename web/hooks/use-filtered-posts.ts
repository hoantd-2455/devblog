import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "../stores/filter-store";
import { useDebouncedValue } from "./use-debounced-value";
import { filteredPostsOptions } from "../lib/posts-query";
export function useFilteredPosts() {
  const tag = useFilterStore((state) => state.tag);
  const query = useFilterStore((state) => state.query);
  const debouncedQuery = useDebouncedValue(query, 300);
  // Query key và URL đều dùng cùng giá trị chuẩn hóa.
  return useQuery(filteredPostsOptions({ tag, query: debouncedQuery }));
}
