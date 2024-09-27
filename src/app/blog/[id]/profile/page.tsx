import Breadcrumbs from "@/ui/navigation/breadcrumbs";
import ProfilePosts from "@/ui/blog/profile/profile-posts";
import ProfileUser from "@/ui/blog/profile/profile-user";
import Loading from "./loading";
import { Suspense } from "react";
import { fetchUserById } from "@/lib/data";

export default async function Page({ params }: { params: { id: string } }) {

  const id = params.id;
  const user = await fetchUserById(id);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/blog' },
          {
            label: `${user.username}`,
            href: `/blog/${user.id}/profile`,
            active: true,
          },
        ]}
      />
      <div className="mt-6 grid grid-cols-1 gap-6">
        <Suspense fallback={<Loading />}>
          <ProfileUser id={id}/>
        </Suspense> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <Suspense fallback={<Loading />}>
          <ProfilePosts id={id} />
        </Suspense> 
      </div>
    </main>
  );
}