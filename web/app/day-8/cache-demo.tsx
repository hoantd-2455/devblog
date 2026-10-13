"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../lib/posts-query";
const profiles = {
  fresh: { staleTime: 30_000, gcTime: 60_000 },
  stale: { staleTime: 0, gcTime: 60_000 },
  short: { staleTime: 30_000, gcTime: 5_000 },
};
type Profile = keyof typeof profiles;
function CachePanel({ profile }: { profile: Profile }) {
  const query = useQuery({
    queryKey: ["posts", "cache-demo", profile],
    queryFn: ({ signal }) => getPosts(signal),
    ...profiles[profile],
    retry: false,
    refetchOnWindowFocus: false,
  });
  return (
    <div>
      <p>queryKey: {JSON.stringify(["posts", "cache-demo", profile])}</p>
      <p>
        staleTime: {profiles[profile].staleTime} ms · gcTime:{" "}
        {profiles[profile].gcTime} ms
      </p>
      <p role="status">
        {query.isPending
          ? "Chưa có dữ liệu"
          : query.isFetching
            ? "Có cache, đang refetch nền"
            : "Đã có dữ liệu"}{" "}
        · {query.isStale ? "stale" : "fresh"}
      </p>
      {query.error && <p role="alert">{query.error.message}</p>}
      {query.data && (
        <p>
          {query.data.length} bài · dataUpdatedAt: {query.dataUpdatedAt}
        </p>
      )}
      <button onClick={() => void query.refetch()}>Refetch thủ công</button>
    </div>
  );
}
export default function CacheDemo() {
  const [profile, setProfile] = useState<Profile>("fresh");
  const [visible, setVisible] = useState(true);
  return (
    <>
      <label>
        Cấu hình cache{" "}
        <select
          value={profile}
          onChange={(event) => setProfile(event.target.value as Profile)}
        >
          <option value="fresh">Fresh 30 giây / GC 60 giây</option>
          <option value="stale">Stale ngay / GC 60 giây</option>
          <option value="short">Fresh 30 giây / GC 5 giây</option>
        </select>
      </label>
      <button onClick={() => setVisible((value) => !value)}>
        {visible ? "Ẩn query" : "Hiện query"}
      </button>
      <p>
        Ẩn panel để query inactive, sau đó hiện lại. GC chỉ bắt đầu đếm khi
        không còn observer.
      </p>
      {visible && <CachePanel profile={profile} />}
    </>
  );
}
