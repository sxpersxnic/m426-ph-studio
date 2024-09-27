'use client';

import { HomeIcon, MagnifyingGlassIcon, PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from 'clsx';
import Link from "next/link";

const id = '11111111-1111-4111-b111-111111111111'

const links = [
  { name: 'Home',     href: '/blog',         icon: HomeIcon            },
  { name: 'Profile',  href: `/profile/${id}`, icon: UserIcon            },
  { name: 'Create',   href: '/blog/create',  icon: PlusIcon            },
  { name: 'Search',   href: '/blog/search',  icon: MagnifyingGlassIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-black text-white p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-gray-800': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}