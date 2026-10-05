type DevBlogConfig = {
  theme: "light" | "dark";
  pageSize: number;
  features: Record<"search" | "comments", boolean>;
};

export const config = {
  theme: "dark",
  pageSize: 10,
  features: { search: true, comments: false },
} satisfies DevBlogConfig;

// `satisfies` kiểm tra cấu trúc nhưng vẫn giữ literal "dark" để editor gợi ý chính xác.
const selectedTheme: "dark" = config.theme;
console.log(selectedTheme, config.features.search);
