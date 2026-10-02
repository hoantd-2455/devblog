# Module 01 · Ngày 2

## Bất đồng bộ nâng cao và module system

### 📚 Lý thuyết

#### Promise combinators

Nắm rõ khác biệt:

- `Promise.all` — fail nhanh, một cái lỗi là cả cụm reject.
- `Promise.allSettled` — chờ tất cả, trả về trạng thái từng cái (rất hợp khi không muốn một lỗi làm hỏng cả lô).
- `Promise.race` — cái nào xong/lỗi trước thắng.
- `Promise.any` — cái thành công đầu tiên thắng, chỉ reject khi tất cả fail.

#### `async`/`await` và xử lý lỗi

`await` thực chất là đường cú pháp trên `.then`. Cần biết: lỗi trong async function trở thành promise rejected; `try`/`catch` quanh `await`; và bẫy phổ biến là `await` tuần tự trong vòng lặp khi thực ra có thể chạy song song.

#### AbortController

Cách huỷ một request đang chạy (`fetch` nhận `signal`). Đây là nền tảng để dọn dẹp request khi component unmount hoặc khi người dùng gõ search liên tục — sẽ dùng lại ở Module 02 và 03.

#### Module system

ES Modules (`import`/`export`) vs CommonJS (`require`/`module.exports`): khác biệt về thời điểm phân giải (static vs runtime), tree-shaking, và vì sao bundler/Next ưu tiên ESM. Hiểu `import type` để tách import chỉ dùng cho type.

### 🛠️ Thực hành

- Viết hàm tải song song 3 endpoint bằng `Promise.all`, rồi đổi sang `Promise.allSettled` và quan sát khác biệt khi một endpoint lỗi.
- Viết một search có huỷ request cũ bằng `AbortController` khi người dùng gõ tiếp.
- Refactor một đoạn `await` tuần tự trong vòng lặp thành chạy song song; đo thời gian.

### 🚀 Đóng góp vào DevBlog

Viết lớp `api/client.ts` (tạm dùng dữ liệu giả): hàm `fetchPosts()`, `fetchPost(id)` trả Promise, có hỗ trợ `AbortSignal`. Bọc xử lý lỗi gọn gàng, trả về kiểu dữ liệu rõ ràng.

### ✅ Kết quả đạt được

- Chọn đúng combinator cho từng tình huống.
- Huỷ được request bằng `AbortController`.
- Phân biệt ESM vs CommonJS và biết khi nào dùng `import type`.
- DevBlog có lớp `api/client` bất đồng bộ, có huỷ request.

### 🔗 Tham khảo

- [MDN — Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN — Promise (`all`/`allSettled`/`race`/`any`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [MDN — AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [MDN — JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
