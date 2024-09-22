import Image from "next/image";
import clsx from 'clsx';
import { formatDateToLocal } from "src/lib/utils";
import { fetchLatestPosts } from "@/lib/data";
import Link from "next/link";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  const path = (id: string) => {
    return `/blog/${id}/post`;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6 border rounded-md">
          {latestPosts.map((post, i) => {
            const dateStr = post.date + '';
            return (
              <Link
                href={path(post.id)}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
                >
                <div className="flex flex-col items-start justify-center w-full">
                  <div className="flex flex-row items-center justify-between w-full mb-6">
                    <div className="flex flex-row items-center justify-center">
                      <Image
                        src={post.image_url}
                        alt={`${post.username}'s profile picture`}
                        className="mr-4 rounded-full"
                        width={32}
                        height={32}
                        />
                      <p className="truncate text-sm font-semibold md:text-based">
                        {post.username}
                      </p>
                    </div>
                    <div className="flex flex-row items-center justify-center">
                      <p className="text-sm text-gray-500">{formatDateToLocal(dateStr)}</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-start">
                    <h1 className="truncate text-xl font-medium md:text-base">
                      {post.title}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}