"use client";

import { Activity, useEffect, useEffectEvent, useState } from "react";

function ActivityPanel() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Activity: effect được bật");
    return () => console.log("Activity: effect được cleanup");
  }, []);
  return (
    <button onClick={() => setCount((previous) => previous + 1)}>
      State được giữ: {count}
    </button>
  );
}

export default function React192Demo() {
  const [name, setName] = useState("Hoan");
  const [visible, setVisible] = useState(true);
  const onTick = useEffectEvent(() => {
    console.log("Effect Event đọc tên mới nhất:", name);
  });
  useEffect(() => {
    const timer = setInterval(() => onTick(), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <label>
        Tên cho Effect Event{" "}
        <input value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <p>
        Console đọc tên mới nhất mỗi 3 giây, không tạo lại interval khi tên đổi.
      </p>
      <button onClick={() => setVisible((previous) => !previous)}>
        {visible ? "Ẩn Activity" : "Hiện Activity"}
      </button>
      <Activity mode={visible ? "visible" : "hidden"}>
        <ActivityPanel />
      </Activity>
      <p>
        Activity giữ state khi ẩn, nhưng cleanup effect. ViewTransition của
        React còn thuộc Canary; bài này không bật API đó trên React 19.2 stable.
      </p>
    </>
  );
}
