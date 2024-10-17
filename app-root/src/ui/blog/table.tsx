import { fetchFilteredPosts } from "@/lib/data";
import { formatDateToLocal } from "@/lib/utils";
import Image from 'next/image';
import Link from "next/link";

export default async function PostsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const posts = await fetchFilteredPosts(query, currentPage);

  return (
    <div className="mt-6 flow-root w-full">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {posts?.map((post) => (
              <div 
                key={post.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4 w-full">
                  <div className="mb-2 flex items-center gap-2 justify-between w-full">
                    <Link href={`/profile/${post.author_id}`} className="flex flex-row items-center">
                      <Image 
                        src={post.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${post.username}'s profile picture`}
                      />
                      <p>{post.username}</p>
                    </Link>
                    <p className="text-sm text-gray-500">{formatDateToLocal(post.date)}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <Link href={`/blog/${post.id}/post`} className="text-xl text-gray-800 font-medium">{post.title}</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <tbody className="bg-white">
              {posts?.map((post) => (
                <tr
                  key={post.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link href={`/profile/${post.author_id}`} className="flex items-center gap-3">
                      <Image
                        src={post.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${post.username}'s profile picture`}
                      />
                      <p>{post.username}</p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link href={`/blog/${post.id}/post`} className="flex items-center gap-3">                  
                      <p>{post.title}</p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{formatDateToLocal(post.date)}</p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}