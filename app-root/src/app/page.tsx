import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Logo from "@/ui/logo";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-14 w-full shrink-0 items-center rounded-lg solide border-2 border-black p-2 md:p-4 md:h-14">
        <Logo />
      </div>
      <div className="mt-4 flex grow justify-end gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 md:w-2/5 md:px-20 ">
          <Link
            href="/blog"
            className="flex items-center gap-5 self-start rounded-lg border-2 border-black text-black px-6 py-3 text-sm font-medium transition-colors md:text-base"
          >
            <span>Blog</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
          {/* <Link
            href="/auth/signin"
            className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors md:text-base"
          >
            <span>Sign in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link> */}
        </div>
      </div>
    </main>
  );
}
