# Module 03 · Ngày 8

## Server state với TanStack Query v5

### 📚 Lý thuyết

#### Client state vs server state

Đây là phân biệt nền tảng:

- Client state — dữ liệu chỉ tồn tại trên client, ta sở hữu hoàn toàn: theme, trạng thái modal, nội dung form đang gõ.
- Server state — dữ liệu thuộc về server, ta chỉ mượn bản sao: danh sách bài viết, thông tin user. Nó có thể cũ (stale), cần đồng bộ, caching, retry, refetch. Quản lý server state bằng useState/useEffect thủ công là nơi sinh ra "useEffect spaghetti".

#### TanStack Query giải bài toán server state

Các khái niệm cốt lõi:

- queryKey — định danh cache cho một query.
- staleTime vs gcTime — thời gian dữ liệu được coi là tươi và thời gian giữ cache sau khi query inactive. Hết staleTime không tự tạo request ngay; remount, focus, reconnect hoặc invalidate có thể kích hoạt refetch. Refetch thủ công vẫn có thể chạy khi dữ liệu còn fresh.
- isPending / isError / data — trạng thái query. Trong v5, isPending tương ứng status pending; isLoading vẫn tồn tại và bằng isPending && isFetching. isFetching cũng true khi refetch nền dù đã có data.
- invalidateQueries — đánh dấu cache cũ để refetch sau khi mutate.

#### Mutation & optimistic update

useMutation cho thao tác ghi (POST/PUT/DELETE). Optimistic update: cập nhật cache ngay, rollback nếu lỗi — nối tiếp tinh thần useOptimistic ở Module 02 nhưng ở tầng cache.

#### useSuspenseQuery

Phiên bản tích hợp Suspense: data không bao giờ undefined ở mức type, phối hợp với <Suspense> của Module 02.

### 🛠️ Thực hành

- Setup QueryClient + QueryClientProvider, bật React Query Devtools.
- Viết useQuery lấy danh sách; quan sát caching khi rời và quay lại trang (không refetch nếu còn tươi).
- Chỉnh staleTime/gcTime và quan sát hành vi refetch.
- Viết useMutation thêm item với optimistic update + rollback.

### 🚀 Đóng góp vào DevBlog

Thay custom hook usePosts() (Module 02) bằng TanStack Query: useQuery({ queryKey: ['posts'], ... }). Chuyển nút "Like" sang useMutation với optimistic update ở tầng cache + invalidateQueries sau khi thành công. Bật Devtools để quan sát.

### ✅ Kết quả đạt được

- Phân biệt dứt khoát client state vs server state.
- Giải thích queryKey, staleTime, gcTime, invalidateQueries.
- Viết được mutation có optimistic update + rollback.
- DevBlog dùng TanStack Query cho posts & like.

### 🔗 Tham khảo

- [TanStack Query — Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
- [TanStack Query — Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
- [TanStack Query — Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
- [TanStack Query — Optimistic Updates](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
- [Migrating to v5 — các thay đổi trạng thái query](https://tanstack.com/query/latest/docs/framework/react/guides/migrating-to-v5)

### Đọc code theo thứ tự

1. `web/components/query-provider.tsx` và `web/app/layout.tsx`: một QueryClient ổn định ở root; cache được giữ khi điều hướng bằng Next Link. Defaults học tập: staleTime 30 giây, gcTime 5 phút, query retry 1 lần; mutation không retry. Devtools chỉ dùng trong môi trường dev theo cơ chế mặc định của package.
2. `web/lib/posts-query.ts`: key `['posts']`, queryFn và hàm kiểm tra HTTP. QueryFn nhận signal do TanStack Query cung cấp để hủy fetch. Kiểu Post chỉ là khai báo TypeScript, không tự validate JSON.
3. `web/hooks/use-posts.ts`: dùng useQuery thay quản lý AsyncState thủ công. InitialData từ Day 7 chỉ dùng khởi tạo nếu cache chưa có dữ liệu; không truyền mặc định mảng rỗng vì có thể khiến dữ liệu rỗng được coi là fresh.
4. `web/components/post-list.tsx`: pending hiện skeleton, error hiện lỗi, refetch nền giữ data cũ và hiện trạng thái đồng bộ. Query tìm kiếm/tag đang chọn vẫn là client state.
5. `web/app/day-8/posts-summary.tsx`: gọi cùng usePosts nhưng dùng chung cache với PostList. Tăng like hoặc thêm bài khiến cả tổng số và danh sách cập nhật.
6. `web/app/day-8/cache-demo.tsx`: mỗi cấu hình có key riêng để so sánh fresh, stale và GC ngắn mà không thay đổi cấu hình posts chính.
7. `web/hooks/use-post-mutations.ts`: thêm bài và like qua mutationFn → onMutate (hủy query, snapshot, cập nhật cache) → onError (khôi phục snapshot) hoặc onSuccess (dữ liệu server, invalidate). Return Promise từ invalidate để mutation còn pending đến khi đồng bộ xong.
8. `web/app/day-8/add-post-demo.tsx` và `web/components/like-button.tsx`: form gọi mutate; số like nằm trong cache Post, không còn state cục bộ trong card. Lọc ẩn/hiện card không làm mất like đã xác nhận.
9. `web/app/day-8/suspense-demo.tsx` và `query-error-boundary.tsx`: useSuspenseQuery đảm bảo data có giá trị khi render thành công; Suspense cho pending, Error Boundary cho lỗi. QueryErrorResetBoundary cho phép retry. useSuspenseQuery không hỗ trợ cancellation như useQuery; ví dụ này không truyền signal.
10. `api/client.ts` và các route `web/app/api/posts/`: API thực sự đọc/ghi một store mock trong bộ nhớ process. Thêm bài trả ID server; ID âm trong cache là bài tạm. Likes là optional trong type để tương thích bài cũ.

Hook thủ công Day 6 được giữ tại `web/app/day-6/use-posts-manual.ts` để so sánh. Ví dụ like bằng useOptimistic của Day 7 được giữ tại `web/app/day-7/optimistic-like-demo.tsx` và hiển thị riêng trên trang Day 7. Shared PostList/PostCard hiện dùng TanStack Query.

### Thử trên `/day-8`

#### Query và cache

- Lần đầu thấy skeleton rồi posts. Mở React Query Devtools, tìm `['posts']`; nhiều consumer có cùng key vẫn dùng cùng một entry.
- Bấm link Rời trang, quay lại trong 30 giây: dùng cache, không refetch tự động nếu dữ liệu còn fresh. Không reload trình duyệt trong phép thử này vì reload tạo QueryClient mới.
- Trong demo cache, chọn Fresh 30 giây, ẩn rồi hiện ngay: giữ nguyên dataUpdatedAt, không có fetch mới.
- Chọn Stale ngay: ẩn rồi hiện sẽ thấy cache cũ ngay cùng refetch nền; dataUpdatedAt đổi sau request. Demo tắt focus refetch để thao tác với Devtools không gây nhiễu.
- Chọn GC 5 giây, tải xong rồi ẩn trên 5 giây; entry bị dọn dù dữ liệu còn fresh trước đó. Hiện lại sẽ tải mới. GC chỉ đếm khi observer cuối cùng unmount.
- staleTime là tuổi dữ liệu kể từ cập nhật; gcTime là tuổi query inactive. Hai đồng hồ độc lập. Invalidate đánh dấu stale và thường refetch các query đang active; query inactive sẽ refetch khi cần dùng lại.
- Bấm Refetch thủ công để thấy nó hoạt động cả khi dữ liệu còn fresh. Thử lỗi mạng để quan sát isError/retry, khôi phục mạng rồi tải lại.

#### Mutation + optimistic cache

- Nhập tiêu đề, bấm Thêm bài: bài có ID tạm/body Đang lưu... xuất hiện ngay trong PostList; tổng số bài cũng tăng ngay. Sau khoảng 1,2 giây server trả bài thật, rồi invalidate/refetch xác nhận.
- Bật Giả lập lỗi thêm bài: bài tạm xuất hiện rồi biến mất; danh sách trước đó và số like được khôi phục. Tiêu đề trong form được giữ để thử lại.
- Like thành công: số ở card và tổng like tăng ngay, sau đó giữ đúng khi refetch. Bật giả lập lỗi: tăng tạm rồi trở về số cũ.
- Bấm tải lại hoặc điều hướng đi/quay lại để thấy server vẫn có dữ liệu đã ghi. Sửa tiêu đề cũng được chuyển thành PATCH để refetch không làm mất thay đổi.
- UI chỉ cho một thao tác ghi posts đang pending, kể cả qua nhiều component, dùng useIsMutating với key chung. Cách snapshot toàn danh sách trong bài học này dựa vào giới hạn đó; app cho nhiều mutation đồng thời cần rollback theo item hoặc chiến lược concurrency khác.
- Bấm Mở Suspense demo để thử useSuspenseQuery. Key demo riêng nên lần đầu có skeleton, lần sau có thể đọc cache; không nhầm key này với cache posts chính.

### Giới hạn và kiến thức cần chốt

- Store server là mô phỏng một process, không phải database bền vững. Restart server mất dữ liệu; deployment nhiều process có thể có store khác nhau. Query cache cũng là bộ nhớ, chưa persist localStorage.
- Theme/modal/query đang gõ thuộc client state. Posts/like đã xác nhận thuộc server state. Optimistic update là bản sao dự đoán trong cache, không tự ghi lên server.
- Dùng useQuery để đọc; useMutation để ghi; invalidate để đồng bộ bản sao sau thao tác ghi. Đây là optimistic update ở tầng cache, khác state cục bộ useOptimistic của Day 7.
- Sau khi đọc, hãy giải thích được vì sao staleTime hết hạn chưa chắc có request ngay, vì sao gcTime không đếm khi query còn active, và tại sao onMutate cần cancelQueries trước khi cập nhật cache.
