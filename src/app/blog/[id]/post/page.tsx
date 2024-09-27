import { fetchPostById } from "@/lib/data";
import Post from "@/ui/blog/post";
import Breadcrumbs from "@/ui/navigation/breadcrumbs";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const post = await fetchPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <div>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Posts', href: '/blog' },
            { label: `${post.title}`, href: `/blog/${id}/post`, active: true },
          ]}
        />
      </div>
      <div> 
        <Post post={post} />
      </div>
    </main>
  );
}