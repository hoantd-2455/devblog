# DevBlog

Dự án luyện tập JavaScript nâng cao và Next.js thông qua các bài thực hành theo ngày.

## Cấu trúc

- `docs/`: yêu cầu và kiến thức cần nắm cho từng ngày.
- `module-1/day-1/`: bài tập về event loop, closure, prototype, `this` và các hàm tiện ích JavaScript.
- `module-1/day-2/`: bài tập về Promise, `async`/`await`, hủy request và module system.
- `module-1/day-3/`: bài tập về generic, narrowing, utility types, `satisfies` và declaration files.
- `api/`: API client dùng dữ liệu giả cho DevBlog.
- `types/`: domain types dùng chung cho bài viết, tác giả, bình luận và trạng thái bất đồng bộ.

## Chạy bài ngày 1

Cần cài Node.js. Chạy từng file từ thư mục gốc, ví dụ:

```sh
node module-1/day-1/event-loop.js
node module-1/day-1/debounce-demo.js
node module-1/day-1/throttle-demo.js
node module-1/day-1/format-date-demo.js
```

Xem [yêu cầu ngày 1](docs/module-1/day-1.md) để biết nội dung chi tiết.

## Chạy bài ngày 2

```sh
node module-1/day-2/promise-combinators.js
node module-1/day-2/abort-search.js
node module-1/day-2/parallel-vs-sequential.js
node module-1/day-2/module-demo.mjs
node module-1/day-2/client-demo.ts
```

Xem [yêu cầu ngày 2](docs/module-1/day-2.md) để biết nội dung chi tiết.

## Chạy bài ngày 3

Kiểm tra kiểu TypeScript trước khi chạy các ví dụ:

```sh
npx --yes --package typescript@5.9.3 tsc -p tsconfig.json
node module-1/day-3/generics.ts
node module-1/day-3/result.ts
node module-1/day-3/narrowing.ts
node module-1/day-3/utility-types.ts
node module-1/day-3/satisfies.ts
node module-1/day-3/async-state-demo.ts
node module-1/day-3/declarations-demo.ts
```

`legacy-formatter.d.ts` mô tả API JavaScript không có type; `third-party-augmentation.d.ts` mở rộng interface của một module giả lập. Xem [yêu cầu ngày 3](docs/module-1/day-3.md) để biết nội dung chi tiết.
