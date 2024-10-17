import { fetchPostById } from "@/lib/data";
import EditForm from "@/ui/forms/edit-form";
import Breadcrumbs from "@/ui/navigation/breadcrumbs";
import { notFound } from "next/navigation";

import { GetServerSideProps } from "next";

const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  return {
    props: {
      params: {id},
    },
  };
};

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  const id = params.id;
  const post = await fetchPostById(id);
  
  if (!post) {
    notFound();
  }
  
  return ( 
    <main className="flex flex-col w-full h-screen justify-center p-4 border rounded-lg shadow-md">
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Posts', href: '/blog' },
          {
            label: `${post.title}`,
            href: `/blog/${post.id}/post`
          },
          {
            label: 'Edit',
            href: `/blog/${post.id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex flex-col items-center w-full p-2">
        <div className="flex w-full justify-center items-center">
          <EditForm />
        </div>
      </div>
    </main>
  );
}