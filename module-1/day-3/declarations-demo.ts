import { formatTitle } from "./legacy-formatter.js";
import type { RequestContext } from "./third-party.ts";

const context: RequestContext = { requestId: "request-1", userId: "user-1" };

console.log(formatTitle("  hello devblog  "));
console.log(context.requestId, context.userId);
