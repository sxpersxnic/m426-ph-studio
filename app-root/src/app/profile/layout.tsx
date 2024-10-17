import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
export const experimental_ppr = true;

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col p-6 bg-gray-50">
      <div className="shadow-md bg-white rounded-lg p-2 md:p-6">
        <div className="w-full p-2 md:p-4">
          <div className="w-6 h-6">
            <Link 
              href="/blog"
              className="flex flex-row items-center justify-start gap-3 rounded-lg bg-black px-2 py-2 text-xs font-medium text-white transition-colors md:text-base min-w-fit" 
              >
              <ArrowLeftIcon className="w-5 md:w-6" />
              <span>Back</span> 
            </Link>
          </div>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
