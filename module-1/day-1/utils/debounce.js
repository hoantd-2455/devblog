// hạn chế spam click, chỉ chạy sau delay time
function debounce(fn, delay, timerRef = { current: null }) {
  return function (...args) {
    // Hủy lịch chạy cũ, nếu có.
    // Tạo lịch chạy mới sau `delay` ms.
    // Khi đến giờ, gọi fn với args của lần gọi mới nhất.

    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      fn.apply(this, args);
    }, delay);
  };
}

module.exports = debounce;
