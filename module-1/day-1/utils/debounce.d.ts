declare function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
  timerRef?: {
    current: ReturnType<typeof setTimeout> | null;
  },
): (...args: Args) => void;

export = debounce;
