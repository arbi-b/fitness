'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { deletePost } from '@/lib/posts';

export async function deletePostAction(formData: FormData) {
  const id = String(formData.get('id') || '').trim();
  if (!id) redirect('/admin');

  await deletePost(id);

  revalidatePath('/');
  revalidatePath('/admin');
  redirect('/admin');
}