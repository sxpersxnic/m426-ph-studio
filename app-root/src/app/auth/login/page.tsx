import LoginForm from "@/ui/forms/login-form";

export default async function Page() {
  return (
    <main className="flex flex-col w-full h-screen items-center justify-center py-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-2">
        <h1 className="font-medium text-xl">Login</h1>
        <div className="flex w-full justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}