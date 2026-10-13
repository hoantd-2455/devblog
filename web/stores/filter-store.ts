"use client";
import { create } from "zustand";
export type FilterState = {
  tag: string;
  query: string;
  setTag: (tag: string) => void;
  setQuery: (query: string) => void;
  resetFilters: () => void;
};
// Chỉ actions từ sự kiện client sửa store. Không đọc/ghi store trong Server Components.
// Store giữ client state, không giữ posts hoặc likes của server.
export const useFilterStore = create<FilterState>()((set) => ({
  tag: "all",
  query: "",
  setTag: (tag) => set({ tag }),
  setQuery: (query) => set({ query }),
  resetFilters: () => set({ tag: "all", query: "" }),
}));
