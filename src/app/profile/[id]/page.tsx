import ProfilePosts from "@/ui/blog/profile/profile-posts";
import ProfileUser from "@/ui/blog/profile/profile-user";
import Loading from "./loading";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <main>      
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