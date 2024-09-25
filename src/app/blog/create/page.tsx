"user client";

import Form from "@/ui/blog/create-form";
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
      <Form />
    </main>
  );
}