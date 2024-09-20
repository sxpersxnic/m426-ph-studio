import { fetchLatestPosts } from "src/lib/data";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import clsx from 'clsx';
import { formatDateToLocal } from "src/lib/utils";

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();

  return (
    <div className="flex w-full flex-col">
      <h2 className="mb-4 text-xl md:text-2xl">
        Most Recents
      </h2>

      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        
        <div className="bg-white px-6">
          {latestPosts.map((post, i) => {
            return (
              <div
                key={post.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
                >
                <div className="flex flex-col items-center justify-center">
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
                    <div className="flex flex-row items-center justify-center pb-2 pt-6">
                      <small className="text-sm text-gray-500">{formatDateToLocal(post.date + '')}</small>
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-end">

                    <p className="truncate text-sm font-medium md:text-base">
                      {post.title}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}