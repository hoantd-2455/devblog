// hạn chế spam click, chỉ chạy sau delay time
function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    // Hủy lịch chạy cũ, nếu có.
    // Tạo lịch chạy mới sau `delay` ms.
    // Khi đến giờ, gọi fn với args của lần gọi mới nhất.

    if (timerId !== undefined) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

module.exports = debounce;
