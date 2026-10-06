Module 02 · Ngày 4
Render, reconciliation & vì sao component re-render

📚 Lý thuyết
Render là gì
"Render" trong React là việc gọi function component để tạo ra mô tả UI (React element), không phải việc cập nhật DOM. Cập nhật DOM là bước "commit" sau đó. Tách bạch hai khái niệm này là chìa khoá để hiểu hiệu năng.

Khi nào component re-render
Một component re-render khi: (1) state của chính nó đổi, (2) component cha re-render, (3) Context nó đang dùng đổi giá trị. Hiểu lầm phổ biến: "props không đổi thì không re-render" — sai, cha render là con render theo, trừ khi được memo.

Reconciliation & key
React so sánh cây element cũ và mới để quyết định cập nhật tối thiểu. key giúp React nhận diện phần tử trong list giữa các lần render. Dùng index làm key gây bug khi list thay đổi thứ tự — cần hiểu tại sao.

Immutability
React phát hiện thay đổi bằng so sánh tham chiếu (Object.is). Mutate trực tiếp state object/array khiến React không thấy thay đổi. Đây là lý do luôn tạo bản sao mới.

🛠️ Thực hành
Đặt console.log trong vài component lồng nhau, bấm nút đổi state ở cha, quan sát con nào render. Bọc thử memo và xem khác biệt.
Tạo list có thể sắp xếp lại; dùng index làm key rồi đổi sang id, quan sát bug về input state khi reorder.
Viết một bug mutate state (push vào array) và sửa bằng cách tạo array mới.

🚀 Đóng góp vào DevBlog
Dựng PostList và PostCard (Client Component tạm dùng dữ liệu giả từ api/client). Đảm bảo list dùng id làm key. Đặt log để xác nhận chỉ card cần thiết mới render khi state đổi.

✅ Kết quả đạt được
Phân biệt render vs commit.
Liệt kê chính xác 3 nguyên nhân re-render.
Giải thích bug index-as-key bằng ví dụ thật.
DevBlog có PostList/PostCard render đúng, key chuẩn.

🔗 Tham khảo
React — Render and Commit: https://react.dev/learn/render-and-commit
React — Rendering Lists & keys: https://react.dev/learn/rendering-lists
React — Updating Objects in State: https://react.dev/learn/updating-objects-in-state
