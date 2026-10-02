const posts = [
  { id: 1, title: "Hôm nay trời đẹp quá!" },
  { id: 2, title: "Buổi học tiếng Anh thật thú vị!" },
];

function findPost(id) {
  return posts.find((post) => post.id === id) ?? null;
}

export { posts, findPost };
