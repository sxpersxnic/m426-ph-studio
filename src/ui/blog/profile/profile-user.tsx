import { fetchUserById } from "@/lib/data";
import Image from "next/image";

export default async function ProfileUser({ id }: { id: string  }) {

  //TODO: Remove when description can be added to profile.
  const description = "Qui duis aute sunt Qui duis aute sunt Qui duis aute sunt Qui duis aute aute aute aute aute aute aute aute Qui duis aute aute aute Qui duis aute aute aute Qui duis aute aute aute Qui duis aute aute aute Qui duis aute aute aute"
  
  const user = await fetchUserById(id);

  return (
    <div className="flex flex-col justify-center items-start w-full h-full overflow-x-hidden md:px-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-start w-full h-20 items-center">
        <div className="mr-4">
          <Image
            src={user.image_url}
            alt={`${user.username}'s profile picture`}
            className="rounded-full border-2 border-gray-100 hover:border-gray-200 transition-colors"
            width={64}
            height={64}
            quality={100}
            placeholder="data:image/user/default-32x32.png"
          />
        </div>
        <p className="truncate text-lg font-semibold md:text-lg">
          {user.username}
        </p>
      </div>
      <div className="w-full h-auto px-12 md:px-0">
        <p className="font-extralight text-xs text-center text-balance text-gray-800 md:text-start pb-2 md:pb-2 border-b border-gray-200">{description}</p>
      </div>
    </div>
  );
}