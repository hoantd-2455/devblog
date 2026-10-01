function formatDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new TypeError("date phải là một Date hợp lệ");
  }
  const formatter = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return formatter.format(date);
}

module.exports = formatDate;
