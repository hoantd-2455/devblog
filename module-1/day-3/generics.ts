export function first<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  return items[0];
}

export function findById<T extends { id: string }>(
  items: T[],
  id: string,
): T | undefined {
  return items.find((item) => item.id === id);
}

console.log(first([1, 2, 3]));
console.log(first<number>([]));
const user = findById([{ id: "u1", name: "An" }], "u1");
console.log(user?.name);
