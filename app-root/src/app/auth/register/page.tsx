import RegisterForm from "@/ui/forms/register-form";

export default async function Page() {
  return (
    <main className="flex flex-col w-full h-screen items-center justify-center py-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-2">
        <h1 className="font-medium text-xl">Create Account</h1>
        <div className="flex w-full justify-center items-center">
          <RegisterForm />
        </div>
      </div>
    </main>
  );
}