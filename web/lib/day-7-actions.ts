// Mô phỏng mutation có độ trễ; chưa ghi vào server/database.
export async function simulateMutation(shouldFail: boolean) {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  if (shouldFail)
    throw new Error("Không thể lưu. Thay đổi tạm đã được hoàn tác.");
}
