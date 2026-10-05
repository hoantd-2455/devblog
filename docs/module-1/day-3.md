# Module 01 · Ngày 3

## TypeScript: hệ thống type chuyên sâu

### 📚 Lý thuyết

#### Generics

Viết hàm/type tái sử dụng giữ nguyên thông tin kiểu: `function first<T>(arr: T[]): T | undefined`. Ràng buộc generic bằng `extends` (`<T extends { id: string }>`). Đây là chìa khoá để type chặt mà không lặp code.

#### Union, narrowing và discriminated union

Union (`A | B`) cần "thu hẹp" (narrowing) trước khi dùng — qua `typeof`, `in`, `instanceof`, hoặc trường phân biệt (`type: "success" | "error"`). Discriminated union là cách mô hình hoá state an toàn (ví dụ trạng thái request: `loading | success | error`), trình biên dịch tự ép bạn xử lý đủ nhánh.

#### Utility types và tự viết

`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`, `Awaited`... và quan trọng hơn: hiểu chúng được dựng từ mapped types và conditional types (`T extends U ? X : Y`) để tự viết utility riêng khi cần.

#### `satisfies`

Toán tử kiểm tra một giá trị thoả type mà không làm mất kiểu cụ thể của nó — rất hữu ích cho config object.

#### Declaration files và module augmentation

`.d.ts` là gì, khi nào cần; cách mở rộng type của thư viện bên thứ ba (ví dụ thêm field vào type của TanStack Query — đã thấy ở phần Tham khảo Module 03).

### 🛠️ Thực hành

- Viết một generic `Result<T, E>` (discriminated union) mô hình hoá thành công/thất bại, và hàm dùng nó.
- Tự viết lại `Pick` và `Partial` bằng mapped type để hiểu cơ chế.
- Dùng conditional type viết Awaited-style: rút type bên trong một `Promise<T>`.
- Dùng `satisfies` cho một object config và quan sát autocomplete vẫn giữ nguyên.

### 🚀 Đóng góp vào DevBlog

Định nghĩa domain types cho DevBlog trong `types/`: `Post`, `Author`, `Comment`, và `AsyncState<T>` (discriminated union `loading`/`success`/`error`). Refactor `api/client` ở Ngày 2 để dùng các type này — không còn `any`.

### ✅ Kết quả đạt được

- Viết được generic có ràng buộc.
- Mô hình hoá state bằng discriminated union và để compiler ép xử lý đủ nhánh.
- Tự viết được một utility type bằng mapped/conditional type.
- DevBlog có tầng `types/` chặt chẽ, `api/client` không còn `any`.

### 🔗 Tham khảo

- [TypeScript Handbook — Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript Handbook — Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Handbook — Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- [TypeScript Handbook — Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)
- [TypeScript Handbook — Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
