# Module 02 · Ngày 5

## Memo hoá đúng chỗ: memo, useMemo, useCallback, useRef

### 📚 Lý thuyết

#### memo

Bọc component để bỏ qua re-render khi props không đổi (so sánh nông). Nhưng memo vô dụng nếu props là object/hàm tạo mới mỗi lần render — đây là lúc cần useMemo/useCallback.

#### useMemo vs useCallback

useMemo ghi nhớ giá trị tính toán nặng; useCallback ghi nhớ hàm để giữ nguyên tham chiếu (thường để truyền xuống component đã memo hoặc làm dependency của effect). Cả hai chỉ là tối ưu — code phải chạy đúng kể cả khi bỏ chúng đi.

#### Khi nào KHÔNG nên dùng

Memo hoá có chi phí (bộ nhớ + so sánh). Lạm dụng làm code rối và đôi khi chậm hơn. Nguyên tắc: chỉ memo khi có vấn đề đo được (render nặng, re-render thừa nhiều), không memo "phòng xa". (Lưu ý: React Compiler đang dần tự động hoá phần này — biết để không tối ưu thủ công quá tay.)

#### useRef

Hai công dụng: tham chiếu tới DOM node, và giữ một giá trị biến đổi mà không gây re-render (ví dụ lưu id timer, giá trị trước đó). Khác biệt cốt lõi với state: đổi ref.current không trigger render.

#### Stale closure

Bug kinh điển: effect/callback "bắt" giá trị state của lần render cũ. Hiểu gốc rễ từ closure (Module 01) và cách dependency array + useRef giải quyết.

### 🛠️ Thực hành

- Tạo một component con đã memo nhưng vẫn render vì nhận hàm tạo mới; sửa bằng useCallback.
- Viết một tính toán nặng (giả lập) và bọc useMemo; bật/tắt để cảm nhận khác biệt.
- Tái hiện một stale closure trong setInterval và sửa bằng useRef.
- Dùng useRef để focus một input.

### 🚀 Đóng góp vào DevBlog

Tối ưu PostList: PostCard bọc memo, handler truyền xuống dùng useCallback. Thêm ô search lọc bài viết dùng debounce (từ utils/ Module 01) lưu timer bằng useRef.

### ✅ Kết quả đạt được

- Giải thích memo cần useCallback/useMemo đi kèm khi nào.
- Nêu được trường hợp KHÔNG nên memo.
- Sửa được một stale closure.
- DevBlog có search debounce và list được tối ưu render.

### 🔗 Tham khảo

- [React — memo](https://react.dev/reference/react/memo)
- [React — useMemo](https://react.dev/reference/react/useMemo)
- [React — useCallback](https://react.dev/reference/react/useCallback)
- [React — useRef](https://react.dev/reference/react/useRef)
