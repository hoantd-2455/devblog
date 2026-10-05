import "./third-party.ts";

// Module augmentation bổ sung field vào interface đã có trong module.
declare module "./third-party.ts" {
  interface RequestContext {
    userId?: string;
  }
}
