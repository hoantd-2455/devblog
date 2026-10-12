"use client";

import { use } from "react";
import type { Post } from "../../../types";
import PostList from "../../components/post-list";

type Props = {
  postsPromise: Promise<Post[]>;
};

export default function SuspenseDemo({ postsPromise }: Props) {
  const posts = use(postsPromise);

  return <PostList initialPosts={posts} />;
}
