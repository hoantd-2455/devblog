# Module 01 · Ngày 1

## Cơ chế thực thi JavaScript: Event loop, closure, prototype, this

### 📚 Lý thuyết

#### Event loop và mô hình bất đồng bộ

JavaScript chạy đơn luồng nhưng không bị "kẹt" nhờ event loop. Cần phân biệt rõ:

- **Call stack** — nơi hàm được thực thi tuần tự.
- **Macrotask queue** — `setTimeout`, `setInterval`, sự kiện I/O.
- **Microtask queue** — `Promise.then`, `queueMicrotask`, `await`. Microtask luôn được xử lý hết trước khi sang macrotask kế tiếp.

Hiểu thứ tự này giải thích vì sao `Promise.resolve().then(...)` chạy trước `setTimeout(..., 0)`, và vì sao một vòng lặp tạo quá nhiều microtask có thể làm "đói" render.

#### Closure

Hàm "nhớ" được scope nơi nó được định nghĩa, kể cả khi scope đó đã kết thúc. Đây là nền tảng của module pattern, của `useState` trong React (mỗi render là một closure riêng), và là nguồn gốc của bug "stale closure" mà ta sẽ gặp lại ở Module 02.

#### Prototype chain

Mọi object có một liên kết ẩn `[[Prototype]]`. Khi truy cập thuộc tính không tồn tại trên object, JS đi ngược lên chuỗi prototype. `class` chỉ là cú pháp đường (syntactic sugar) phủ lên cơ chế này.

#### `this`

Giá trị `this` được quyết định lúc gọi hàm, không phải lúc định nghĩa. Bốn quy tắc: gọi thường (`undefined` ở strict mode), gọi như method (object bên trái dấu chấm), `call`/`apply`/`bind`, và arrow function (kế thừa `this` từ scope ngoài — đây là lý do arrow function rất hợp làm callback).

### 🛠️ Thực hành

- Dự đoán thứ tự in ra của một đoạn trộn `console.log` đồng bộ + `setTimeout(0)` + `Promise.then` + `await`; chạy thử để kiểm chứng.
- Viết một counter dùng closure (không dùng `class`, không biến global).
- Tạo object kế thừa qua prototype thủ công bằng `Object.create`, rồi viết lại bằng `class` và so sánh.
- Tạo 3 ví dụ khiến `this` cho ra 3 giá trị khác nhau, giải thích từng cái.

### 🚀 Đóng góp vào DevBlog

Khởi tạo repo `devblog/`, dựng cấu trúc thư mục ban đầu. Viết một module tiện ích `utils/` thuần JS: `debounce`, `throttle` (dùng closure), `formatDate` — đây là các hàm sẽ dùng lại xuyên suốt.

### ✅ Kết quả đạt được

- Giải thích được thứ tự thực thi micro/macrotask trên một ví dụ bất kỳ.
- Tự tin nói được closure là gì và chỉ ra nó trong code thật.
- Xác định đúng giá trị `this` trong 4 ngữ cảnh.
- Có `utils/` với `debounce`/`throttle` viết bằng closure.
