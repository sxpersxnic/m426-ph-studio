'use client';
import CreateForm from "@/ui/forms/create-form";
import Breadcrumbs from "@/ui/navigation/breadcrumbs";

export default function Page() {
  return ( 
    <main className="flex flex-col w-full h-screen justify-center p-4 border rounded-lg shadow-md">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/blog' },
          {
            label: 'Create',
            href: `/blog/create`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col items-center w-full p-2">
        <div className="flex w-full justify-center items-center">
          <CreateForm />
        </div>
      </div>
    </main>
  );
}