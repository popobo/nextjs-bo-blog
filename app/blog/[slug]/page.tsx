export default function BlogPost({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog Post: {params.slug}</h1>
      <p>This is where the content of the blog post will go.</p>
    </div>
  );
}
