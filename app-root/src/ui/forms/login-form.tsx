import Link from "next/link";
import { Button } from "../button";
import InputField from "../components/input-field";

export default function LoginForm() {
  return (
    <form className="flex flex-col justify-center items-center w-fit h-fit py-4">
      <div className="flex flex-col justify-center items-center p-4 md:p-6 w-80">
        <div>
          <InputField type="Email" />
            {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
        </div>
        <div>
          <InputField type="Password" />
            {/* {state?.errors?.password && <p>{state.errors.password}</p>} */}
        </div>
      </div>
      <div className="flex md:justify-end mt-6 px-8 gap-4">
        <div className="flex flex-row items-center justify-end mb-2 gap-4">
          <div
            className="flex flex-row h-8 items-center text-xs font-light text-gray-500 gap-1"
            >
            <Link href="/auth/register" className="transition-colors text-blue-400 underline hover:text-blue-300">
              Create Account  
            </Link>
          </div>
          <div className="flex flex-row gap-3 ">
            <Link
              href="/"
              className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-200"
              >
              Cancel
            </Link>
            <Button type="submit">Login</Button>
          </div>
        </div>
      </div>
    </form>
  );
}