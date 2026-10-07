# Module 02 · Ngày 6

## Custom hooks & Context đúng cách

### 📚 Lý thuyết

#### Custom hooks

Cách trừu tượng hoá logic stateful tái sử dụng. Hook chỉ là hàm bắt đầu bằng use và gọi hook khác. Tách logic (fetch, form, media query, debounce-state) ra hook giúp component sạch và testable. Quy tắc hooks (gọi ở top level, không trong điều kiện/vòng lặp) bắt nguồn từ việc React dựa vào thứ tự gọi để gán state.

#### Context

Dùng để truyền dữ liệu xuyên nhiều tầng mà không "khoan props". Nhưng có bẫy re-render: mọi consumer re-render khi value của Provider đổi tham chiếu — kể cả khi chỉ một phần dữ liệu đổi. Các cách giảm thiểu: tách context theo mối quan tâm (state context vs dispatch context), memo hoá value, hoặc dùng thư viện state khi context bị lạm dụng làm global store.

#### Khi nào Context, khi nào không

Context hợp với dữ liệu "ít đổi, nhiều nơi cần" (theme, user, locale). Không hợp làm nơi chứa state đổi liên tục — đó là việc của state management (Module 03).

### 🛠️ Thực hành

- Viết useFetch<T>(url) (dùng AbortController từ Module 01) trả về AsyncState<T>.
- Viết useDebouncedValue<T>(value, delay).
- Dựng một ThemeContext, quan sát toàn bộ consumer re-render khi value đổi; tách value/dispatch và memo hoá để giảm.

### 🚀 Đóng góp vào DevBlog

Thay logic fetch trong PostList bằng custom hook usePosts(). Thêm ThemeContext (sáng/tối) cho toàn app, áp dụng kỹ thuật chống re-render thừa.

### ✅ Kết quả đạt được

- Viết được custom hook gói logic fetch + huỷ request.
- Giải thích quy tắc hooks dựa trên thứ tự gọi.
- Chỉ ra và giảm được bẫy re-render của Context.
- DevBlog dùng usePosts() và có theme context tối ưu.

### 🔗 Tham khảo

- [React — Reusing logic with Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [React — Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React — Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
