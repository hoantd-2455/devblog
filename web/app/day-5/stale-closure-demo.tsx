"use client";

import { useState, useEffect, useRef } from "react";

export default function StaleClosureDemo() {
  const [count, setCount] = useState(0);

  const countRef = useRef(count);

  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("Interval count:", countRef.current);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Count+</button>
    </>
  );
}
