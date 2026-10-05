type ErrorInput = string | Error | { detail: string };

function describeError(input: ErrorInput): string {
  if (typeof input === "string") {
    return input;
  }
  if (input instanceof Error) {
    return input.message;
  }
  if ("detail" in input) {
    return input.detail;
  }

  const exhaustive: never = input;
  return exhaustive;
}

console.log(describeError("Lỗi văn bản"));
console.log(describeError(new Error("Lỗi từ Error")));
console.log(describeError({ detail: "Lỗi từ object" }));
