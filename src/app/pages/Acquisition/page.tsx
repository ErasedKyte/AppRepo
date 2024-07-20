import React from 'react';
import { db } from '../../db';
import { redirect } from 'next/navigation';

export default function AcquisitionPage() {
  async function CreateAcq(formData: FormData) {
    'use server';
    const Docs = formData.get('Docs') as string;
    const snippet = await db.documents.create({
      data: {
        Docs,
      },
    });
    console.log(snippet)
    redirect('/');
  }

  return (
    <div>
      <h1>Acquisition Page</h1>
      <form action={CreateAcq}>
        <input 
          name="Docs" 
          id="Docs" 
          type="text" 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
