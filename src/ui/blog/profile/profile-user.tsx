import { fetchUserById } from "@/lib/data";
import Image from "next/image";

export default async function ProfileUser({ id }: { id: string  }) {

  const user = await fetchUserById(id);

  return (
    <div className="flex flex-row items-center justify-center">
      <Image
        src={user.image_url}
        alt={`${user.username}'s profile picture`}
        className="mr-4 rounded-full"
        width={32}
        height={32}
        />
      <p className="truncate text-sm font-semibold md:text-based">
        {user.username}
      </p>
    </div>
  );
}