"user client";

import CreateForm from "@/ui/forms/create-form";
import Breadcrumbs from "@/ui/navigation/breadcrumbs";

export default function Page() {
  return ( 
    <main>
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
      <CreateForm />
    </main>
  );
}