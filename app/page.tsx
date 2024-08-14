import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to My Blog</h1>
      <p className="mb-4">This is where I share my thoughts and ideas.</p>
      <Link href="/blog" className="text-blue-500 hover:underline">
        Read my blog posts
      </Link>
    </div>
  );
}
