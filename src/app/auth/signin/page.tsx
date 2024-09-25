import Logo from "@/ui/logo";
import { SigninForm } from '@/ui/auth/signin-form'; 

export default function SigninPage() {
  return ( 
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gray-500 p-3 md:h-36">
          <div className="w-32 text-black md:w-36">
            <Logo />
          </div>
        </div>
          <SigninForm />
      </div>
    </main>
  );
}