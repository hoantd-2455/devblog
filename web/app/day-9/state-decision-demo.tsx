"use client";
import { useState } from "react";
const examples = [
  {
    state: "Modal chỉ dùng trong một component",
    home: "useState",
    why: "State cục bộ, không cần chia sẻ.",
  },
  {
    state: "Theme toàn app",
    home: "Context",
    why: "Nhiều nơi cần nhưng thay đổi ít; đã tách state/dispatch ở Day 6.",
  },
  {
    state: "Tag và từ khóa giữa toolbar, sidebar, danh sách",
    home: "Zustand",
    why: "Client state dùng chung; selector đăng ký đúng phần cần đọc.",
  },
  {
    state: "Posts và like đã xác nhận",
    home: "TanStack Query",
    why: "Server sở hữu dữ liệu; client cần cache, refetch và mutation.",
  },
  {
    state: "Editor nhiều bước, undo/redo, quy tắc cập nhật phức tạp",
    home: "Cân nhắc Redux Toolkit",
    why: "Cần chuẩn hóa action, middleware và theo dõi thay đổi; undo/redo vẫn cần tự thiết kế.",
  },
];
export default function StateDecisionDemo() {
  const [revealed, setRevealed] = useState(false);
  return (
    <>
      <p>Đoán nơi giữ state trước khi mở đáp án.</p>
      <button onClick={() => setRevealed((value) => !value)}>
        {revealed ? "Ẩn đáp án" : "Hiện đáp án"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Ví dụ</th>
            <th>Nơi giữ state</th>
            <th>Lý do</th>
          </tr>
        </thead>
        <tbody>
          {examples.map((example) => (
            <tr key={example.state}>
              <td>{example.state}</td>
              <td>{revealed ? example.home : "?"}</td>
              <td>{revealed ? example.why : "Hãy tự phân loại"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <pre>{`Dữ liệu do server sở hữu? → TanStack Query
Không → Chỉ một component cần? → useState
Không → Ít đổi, truyền xuyên tầng? → Context
Không → Client state chia sẻ? → Zustand
Luồng cập nhật/debug/team phức tạp? → Cân nhắc Redux Toolkit`}</pre>
      <p>
        Redux vẫn phù hợp khi cần luồng action có quy ước, middleware và debug
        lịch sử. Không phải cứ app lớn là phải dùng Redux.
      </p>
    </>
  );
}
