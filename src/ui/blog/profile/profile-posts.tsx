import { fetchProfilePosts } from "@/lib/data";
import { UsersTable } from "@/lib/definitions";
import { formatDateToLocal } from "@/lib/utils";
import clsx from "clsx";
import Link from "next/link";
import Breadcrumbs from "../../navigation/breadcrumbs";

export default async function ProfilePosts({ id }: {id: string}) {

  const profilePosts = await fetchProfilePosts(id);
  const path = (id: string) => {
    return `/blog/${id}/post`;
  }
  
  return (      
    <div>
      <div>
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          <div className="bg-white px-6 border rounded-md">
            {profilePosts.map((post, i) => {
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
                  <p className="truncate text-sm font-semibold md:text-based">
                    {post.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDateToLocal(dateStr)}
                  </p>                    
                </div>                  
              </div>
            </Link>
          );
          })}
          </div>
        </div>
      </div>
    </div>    
  );
}