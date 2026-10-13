"use client";
import { Component, type ReactNode } from "react";
export default class QueryErrorBoundary extends Component<
  { children: ReactNode; onReset: () => void },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error)
      return (
        <div role="alert">
          <p>{this.state.error.message}</p>
          <button
            onClick={() => {
              this.props.onReset();
              this.setState({ error: null });
            }}
          >
            Thử lại Suspense
          </button>
        </div>
      );
    return this.props.children;
  }
}
