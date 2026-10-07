import { useState, useEffect } from "react";

import type { AsyncState } from "../../types";

export function useFetch<T>(url: string): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    status: "loading",
  });

  const [previousUrl, setPreviousUrl] = useState(url);

  if (previousUrl !== url) {
    setPreviousUrl(url);
    setState({ status: "loading" });
  }

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: T = await response.json();

        if (controller.signal.aborted) return;
        setState({ status: "success", data });
      } catch (error) {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    }

    void load();
    return () => controller.abort();
  }, [url]);

  return state;
}
