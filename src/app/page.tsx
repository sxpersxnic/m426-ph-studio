import Link from "next/link";
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-14 w-full shrink-0 items-center rounded-lg solide border-2 bg-black border-black p-2 md:p-4 md:h-14">
        
        {/* Replace <h1> with <Logo /> once its added*/}
        <h1>M426 - PH-Studio Blog</h1>
      
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-black px-6 py-10 md:w-2/5 md:px-20">
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>

        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          <Image 
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Placeholder hero image desktop"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Placeholder hero image mobile"
          />
        </div>
      </div>
    </main>
  );
}
