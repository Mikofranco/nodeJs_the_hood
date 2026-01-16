import { createServer } from "http";

const PORT = process.env.PORT;

const posts = [
  { id: 1, title: "post one" },
  { id: 2, title: "post two" },
  { id: 3, title: "post three" },
  { id: 4, title: "post four" },
];

const server = createServer((req, res) => {
  if (req.url === "/api/posts" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(posts));
    return;
  }

  // GET /api/posts/3 → return single post by id
  const singlePostMatch = req.url.match(/^\/api\/posts\/(\d+)$/);

  if (singlePostMatch && req.method === "GET") {
    const id = Number(singlePostMatch[1]); // convert string → number
    const post = posts.find((p) => p.id === id);

    res.setHeader("Content-Type", "application/json");

    if (post) {
      res.statusCode = 200;
      res.end(JSON.stringify(post));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Post not found" }));
    }
    return;
  }

  // Everything else → 404
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ message: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
