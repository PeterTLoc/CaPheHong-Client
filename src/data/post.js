const posts = [
  {
    id: 4,
    title: "My First Post",
    content: "This is the content of my post",
    author: { id: 26, name: "Jack" },
    created_at: "2025-07-20T16:47:28.092736+07:00",
    updated_at: "2025-07-20T16:47:20.893739+07:00",
    upvotes: 0,
    downvotes: 0,
    score: 0,
    comments: [],
    comment_count: 0
  },
  {
    id: 3,
    title: "ZED",
    content: "ZED",
    author: { id: 26, name: "Jack" },
    created_at: "2025-07-20T16:29:23+07:00",
    updated_at: "2025-07-20T16:29:34.831781+07:00",
    upvotes: 0,
    downvotes: 0,
    score: 0,
    comments: [
      {
        id: 2,
        content: "This is a reply comment",
        author: { id: 26, name: "Jack" },
        created_at: "2025-07-20T16:36:26.765554+07:00",
        updated_at: "2025-07-20T18:24:19.611612+07:00",
        upvotes: 0,
        downvotes: 0,
        score: 0,
        replies: []
      }
    ],
    comment_count: 1
  }
];

export default posts; 