import Link from "next/link";
import { Button } from "../button";
import InputField from "../components/input-field";

export default function RegisterForm() {
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div>
          <InputField type="Username" />
            {/* {state?.errors?.title && <p>{state.errors.title}</p>} */}
        </div>
        <div>
          <label htmlFor="body" className="mb-2 block text-sm font-medium">Body</label>
          <input
            id="body"
            name="body"
            type="text"
            placeholder="Enter Body"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            required
            />
            {/* {state?.errors?.body && <p>{state.errors.body}</p>} */}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/blog"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create</Button>
      </div>
    </form>
  );
}