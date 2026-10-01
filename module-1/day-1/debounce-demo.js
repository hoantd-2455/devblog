const debounce = require("./utils/debounce");

const save = debounce((text) => console.log("Saved:", text), 300);

save("a");
save("ab");
save("abc");
