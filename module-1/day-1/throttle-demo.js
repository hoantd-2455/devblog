const throttle = require("./utils/throttle");

const save = throttle((text) => console.log("Saved:", text), 300);

save("a");
save("ab");
save("abc");
setTimeout(() => {
  save("12");
}, 350);
