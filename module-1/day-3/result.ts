export type Result<T, E> =
  { type: "success"; value: T } | { type: "error"; error: E };

export function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { type: "error", error: "Không thể chia cho 0" };
  }
  return { type: "success", value: a / b };
}

export function describeDivision(result: Result<number, string>): string {
  switch (result.type) {
    case "success":
      return `Kết quả: ${result.value}`;
    case "error":
      return `Lỗi: ${result.error}`;
    default: {
      // Thêm biến thể mới vào Result sẽ khiến compiler báo lỗi tại đây.
      const exhaustive: never = result;
      return exhaustive;
    }
  }
}

console.log(describeDivision(divide(10, 2)));
console.log(describeDivision(divide(10, 0)));
