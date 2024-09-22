import Link from "next/link";
import NavLinks from "./nav-links";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Logo from "../logo";
// import { logout } from "@/lib/authentication/auth";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <Logo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-white md:block"></div>
        <form
          // action={
          //   async () => {
          //     'use server';
          //     await logout();
          //   }
          // }
        >
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-black text-white p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
            <ArrowRightStartOnRectangleIcon className="w-6" />
            <div className="hidden md:block">Log Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}