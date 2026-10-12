# Module 02 · Ngày 7

## Concurrent React 19.2: Suspense, transitions, use, Actions

### 📚 Lý thuyết

#### Suspense

Cho phép khai báo trạng thái "đang chờ" ở mức cây component: bọc phần đang tải bằng <Suspense fallback={...}>. Component bên trong "treo" (suspend) cho tới khi dữ liệu sẵn sàng. Đây là nền tảng cho streaming ở Next (Module 04).

#### useTransition & useDeferredValue

Đánh dấu một cập nhật là "không khẩn cấp" để UI không bị giật khi xử lý nặng (ví dụ lọc danh sách lớn trong lúc gõ). React ưu tiên cập nhật khẩn (gõ phím) và hoãn cập nhật nặng.

#### API use

API đọc giá trị từ Promise hoặc Context, có thể gọi có điều kiện — khác các hook khác. Vẫn phải gọi trong component hoặc custom hook, và không gọi trong try/catch. Kết hợp với Suspense để đọc dữ liệu trực tiếp.

#### Actions & useActionState/useOptimistic

React 19 chuẩn hoá xử lý mutation bất đồng bộ: useActionState cung cấp state kết quả và pending của một action; lỗi dự kiến cần được bắt và trả về trong state; useOptimistic cập nhật UI lạc quan trước khi server xác nhận. Đây là cầu nối thẳng tới Server Actions của Next (Module 04).

#### Điểm mới 19.2

useEffectEvent (tách logic không-phản-ứng khỏi effect, giải quyết gọn nhiều ca dependency rối), Activity (giữ state của UI ẩn), ViewTransition của React hỗ trợ animation khi UI đổi nhưng còn thuộc Canary, chưa có trong React 19.2 stable. Không nhầm với View Transition API của trình duyệt. Biết để dùng khi phù hợp.

### 🛠️ Thực hành

- Dùng <Suspense> + một component đọc Promise bằng use để hiện skeleton khi tải.
- Tạo danh sách lớn lọc theo từ khoá; bọc cập nhật lọc bằng useTransition, so sánh độ mượt khi gõ.
- Viết một form dùng useActionState + useOptimistic (mô phỏng submit có độ trễ).

### 🚀 Đóng góp vào DevBlog

Bọc PostList bằng Suspense + skeleton. Thêm nút "Like" dùng useOptimistic để số like tăng ngay, rollback nếu lỗi. Lọc bài theo tag bằng useTransition.

### ✅ Kết quả đạt được

- Dùng được Suspense + use cho trạng thái tải.
- Phân biệt cập nhật khẩn/không khẩn và áp dụng useTransition.
- Dựng được optimistic UI với useOptimistic.
- DevBlog có skeleton loading, like lạc quan, lọc tag mượt.

### 🔗 Tham khảo

- [React — <Suspense>](https://react.dev/reference/react/Suspense)
- [React — useTransition](https://react.dev/reference/react/useTransition)
- [React — use](https://react.dev/reference/react/use)
- [React — useOptimistic](https://react.dev/reference/react/useOptimistic)
- [React 19.2 announcement](https://react.dev/blog/2025/10/01/react-19-2)

### Đọc lại code và kiểm tra

Mở `/day-7`. Các mutation trong bài này mô phỏng bằng timer, chưa ghi database hoặc dùng Server Actions; reload sẽ đặt lại số like và nội dung form. Tag được bổ sung vào mock posts. Các ví dụ Post cũ vẫn hợp lệ vì trường `tags` là optional.

#### 1. Suspense + use

- Đọc `web/app/day-7/page.tsx`, `suspense-demo.tsx`, `web/components/post-list-skeleton.tsx`, rồi `web/components/post-list.tsx`.
- Page là Server Component: tạo Promise, không await trước khi trả JSX. Client Component đọc Promise prop bằng `use`, nên Suspense hiển thị skeleton trong lúc pending. Promise từ server giữ ổn định qua render lại của client; không viết `use(fetch(...))` trực tiếp trong client render.
- `dynamic = "force-dynamic"` giúp bài demo tải theo request để dễ quan sát skeleton. Reload `/day-7`: skeleton xuất hiện khoảng 1,8 giây trước hai bài viết.
- Suspense không tự bắt fetch trong useEffect. Với nút tải lại của `usePosts`, vẫn dùng state loading để render cùng skeleton. Promise bị reject được xử lý bởi `day-7/error.tsx`, không phải fallback của Suspense.

#### 2. Cập nhật khẩn và không khẩn

- Đọc `transition-demo.tsx`: input dùng `query` cập nhật ngay; danh sách dùng `filterQuery` cập nhật trong transition. `SlowList` có memo để render input không kéo theo công việc nặng khi query của danh sách chưa đổi.
- Đổi giữa ba chế độ, nhập nhanh `React`, `Next.js`, `JavaScript`. Với `useTransition`, `isPending` báo render nền; với `useDeferredValue`, so sánh query hiện tại và query được hoãn để biết nội dung đang cũ.
- Độ mượt phụ thuộc thiết bị. Có thể dùng CPU throttling trong DevTools để so sánh; không kết luận hiệu năng từ chỉ hai mock posts. Công việc nặng được chia thành các component hàng để React có điểm nhường xử lý.
- Transition không phải debounce với thời gian cố định, không làm CPU chạy song song và không làm đoạn JavaScript đồng bộ dài có thể bị ngắt giữa chừng. Controlled input không dùng state cập nhật trong transition làm value.
- Trong PostList, lựa chọn tag cập nhật ngay; giá trị dùng để lọc được cập nhật qua `startTransition`. Thử tag react, nextjs và Tất cả, kết hợp query tìm kiếm.

#### 3. Actions + optimistic UI

- Đọc `action-form-demo.tsx`, `web/components/like-button.tsx` và `web/lib/day-7-actions.ts`.
- `useActionState` trả `[result, action, isPending]`. Truyền action vào `<form action={action}>` để React chạy trong Action context; input có `name` được đọc qua FormData.
- `useOptimistic` lấy dữ liệu đã xác nhận làm base. Khi Action bắt đầu, thêm thay đổi tạm ngay; sau khoảng 1,2 giây thành công mới cập nhật base. Nếu lỗi, giữ nguyên base; kết thúc Action sẽ tự rollback thay đổi tạm.
- State cập nhật sau await được bọc thêm `startTransition`. Bắt lỗi dự kiến và trả thông báo lỗi; không để promise rejection làm mất cả UI. Tắt nút trong pending để mỗi form có một mutation đang chạy.
- Like thành công: tăng ngay và giữ số mới sau khi lưu. Bật Giả lập lỗi like: tăng tạm, sau đó trở về số cũ và hiện lỗi. Nút sửa tiêu đề không làm mất số like nếu card vẫn mounted.
- Form thành công: nội dung xuất hiện ngay với Đang gửi..., sau đó thành Đã lưu. Bật Giả lập lỗi submit: dòng tạm biến mất, dữ liệu đã lưu trước đó vẫn còn.
- Like hiện là state cục bộ của card; lọc làm card unmount sẽ đặt lại like khi card xuất hiện lại. Đây là mô phỏng mutation, không phải số like lưu trên server.

#### 4. React 19.2

- Đọc `react-192-demo.tsx`: Effect Event đọc tên mới nhất từ interval mà không tạo lại timer khi tên đổi. Effect Event chỉ được gọi từ logic của effect, không dùng thay event handler hoặc để bỏ dependency cần thiết.
- Tăng State được giữ, ẩn Activity rồi hiện lại: số vẫn giữ. Effect của panel cleanup khi ẩn, chạy lại khi hiện. Strict Mode có thể làm log lặp trong môi trường dev.
- ViewTransition của React vẫn thuộc Canary, nên không import API đó trong dự án stable này. Phân biệt với API cùng chủ đề của trình duyệt.

Code chạy được chưa đồng nghĩa đã hiểu bài. Khi đọc lại, hãy tự giải thích: vì sao chỉ bọc hook fetch cũ bằng Suspense chưa đủ; vì sao input cần cập nhật khẩn; và dữ liệu nào quyết định số like sau rollback.
