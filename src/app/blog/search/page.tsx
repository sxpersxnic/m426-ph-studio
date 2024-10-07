import { fetchPostsPages } from "@/lib/data";
import Search from "@/ui/search";
import { Suspense } from "react";
import Loading from "./loading";
import Pagination from "@/ui/navigation/pagination";
import PostsTable from "@/ui/blog/table";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchPostsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl">Search</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search posts..." />
      </div>
      <Suspense key={query + currentPage} fallback={<Loading/>}>
      <PostsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}