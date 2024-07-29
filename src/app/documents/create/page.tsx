import { redirect } from 'next/navigation';
import { db } from '../../db' 

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // This needs to be a server action!
    'use server';

    // Check the user's inputs and make sure they're valid
    const Docs = formData.get('Docs') as string;

    // Create a new record in the database
    const snippet = await db.documents.create({
      data: {
        Docs,
      },
    });

    // Redirect the user back to the root route
    redirect('/');
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Docs
          </label>
          <input
            name="Docs"
            className="border rounded p-2 w-full"
            id="Docs"
          />
        </div>
        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}
