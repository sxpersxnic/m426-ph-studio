import Image from "next/image";
import { formatDateToLocal } from "src/lib/utils";
import { PostView } from "@/lib/definitions";
import Link from "next/link";

export default async function Post({ post }: { post: PostView }) {
  const dateStr = post.date + '';

  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6 border rounded-md">
        
          <div
            className="flex flex-row items-center justify-between py-4"
          >
            <div className="flex flex-col items-start justify-center w-full">
              <div className="flex flex-row items-center justify-between w-full mb-6 text-base py-4 border-b">
                <Link href={`/profile/${post.author_id}`} className="flex flex-row items-center justify-center">
                  <Image
                    src={post.image_url}
                    alt={`${post.username}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                    />
                  <p className="truncate font-semibold md:text-based">
                    {post.username}
                  </p>
                </Link>
                <div className="flex flex-row items-center justify-center">
                  <p className="text-sm text-gray-500">{formatDateToLocal(dateStr)}</p>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row items-center justify-start mb-2">
                  <h1 className="truncate text-xl font-medium">
                    {post.title}
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <p className="truncate text-sm font-medium text-wrap">
                    {post.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}