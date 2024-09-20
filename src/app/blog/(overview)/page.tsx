import LatestPosts from "src/ui/blog/latest-posts";
import Loading from "./loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">
        Posts
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-6">
        <Suspense fallback={<Loading />}>
          <LatestPosts />
        </Suspense> 
      </div>
    </main>
  );
}