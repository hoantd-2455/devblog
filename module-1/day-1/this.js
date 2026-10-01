"use strict";

function getThis() {
  return this;
}

const alice = { name: "Alice", getThis };
const bob = { name: "Bob" };

console.log(alice.getThis()); // alice

console.log(getThis()); // undefined

console.log(getThis.call(bob)); // { name: 'Bob' }

const fn = alice.getThis;

console.log(fn()); // undefined
// - JavaScript xác định this của hàm thường tại lúc gọi,
// dựa vào phần đứng trước dấu . trong lời gọi;
// nó không nhớ object mà bạn đã lấy hàm từ đó.

console.log(fn.call(alice));

console.log(fn.bind(alice).call()); // call = gọi ngay;
// bind = tạo hàm để gọi sau.

function makeGetter() {
  return () => this;
}

const arrow = makeGetter.call(alice); // this bên trong makeGetter là alice.
// Arrow function được tạo ngay lúc đó
// và giữ this từ phạm vi bao quanh ấy

console.log(arrow() === alice); // true
console.log(arrow.call(bob) === bob);
// false - arrow.call(bob) vẫn gọi arrow function,
// nhưng không thể thay this mà nó đã lấy

// -> Quy tắc ngắn gọn:
// hàm thường nhận this lúc được gọi;
// arrow function lấy this lúc được tạo.
