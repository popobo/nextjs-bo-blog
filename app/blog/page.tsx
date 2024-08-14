import Link from "next/link";

// This is a mock data, we'll replace it with real data later
const posts = [
  { id: 1, title: "My First Blog Post", slug: "my-first-blog-post" },
  { id: 2, title: "Another Blog Post", slug: "another-blog-post" },
];

export default function BlogList() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-2">
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
