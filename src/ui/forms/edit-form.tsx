import Link from "next/link";
import { Button } from "../button";
import InputField from "../components/input-field";
import BodyInputField from "../components/body-input-field";

export default function EditForm() {
  return (
    <form className="flex flex-col justify-center items-center w-fit h-fit py-4">
      <div className="flex flex-col justify-center items-center p-4 md:p-6 w-80">
        <div className="w-full">
          <InputField type="Title" />
            {/* {state?.errors?.email && <p>{state.errors.email}</p>} */}
        </div>
        <div className="w-full">
          <BodyInputField type="Body" />
            {/* {state?.errors?.password && <p>{state.errors.password}</p>} */}
        </div>
      </div>
      <div className="flex md:justify-end mt-6 px-8 gap-4">
        <div className="flex flex-row items-center justify-end mb-2 gap-4">      
            <Link
              href="/blog"
              className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm font-medium text-gray-100 transition-colors hover:bg-gray-200"
              >
              Cancel
            </Link>
            <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}