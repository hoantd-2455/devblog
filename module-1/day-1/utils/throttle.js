/**
 * throttle.
 * Nếu một hàm bị gọi liên tục,
 * throttle cho nó chạy tối đa một lần trong mỗi khoảng thời gian.
 * Ta sẽ làm bản đơn giản: chạy ngay lần đầu,
 * bỏ qua các lần gọi trong lúc chờ.
 *
 * Ex:
 * Thời điểm gọi:  0ms   100ms   200ms   350ms
 * Có chạy không:   có    không   không     có
 */

function throttle(fn, interval) {
  let waiting = false;

  return function (...args) {
    // Nếu đang chờ, bỏ qua lần gọi này.
    // Nếu không, đánh dấu đang chờ và gọi fn ngay.
    // Sau interval ms, cho phép gọi lại.
    if (waiting) return;

    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, interval);
    fn.apply(this, args);
  };
}

module.exports = throttle;
