import { deletePost } from "@/lib/actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function DELETE({ params }: { params: { id: string }}): Promise<void> {
  await deletePost(params.id);
  revalidatePath('/blog');
  redirect('/blog');
}