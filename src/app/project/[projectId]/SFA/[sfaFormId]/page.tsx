// pages/project/[projectId]/SFA/[sfaFormId].tsx
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import prisma from 'lib/prisma';

const SFAFormPage = ({ sfaForm, errorMessage }) => {
  const [formData, setFormData] = useState(sfaForm || {});
  const [error, setError] = useState(errorMessage || '');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form method="POST">
        <input type="text" name="siteOwnerContact" value={formData.siteOwnerContact || ''} onChange={handleChange} />
        {/* Add other fields similarly */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { sfaFormId } = context.params;

  if (context.req.method === 'POST') {
    const body = await new Promise((resolve) => {
      let data = '';
      context.req.on('data', (chunk) => {
        data += chunk;
      });
      context.req.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    try {
      await prisma.sFAForm.update({
        where: {
          id: parseInt(sfaFormId as string, 10),
        },
        data: body,
      });

      return {
        redirect: {
          destination: `/project/${context.params.projectId}/SFA/${sfaFormId}`,
          permanent: false,
        },
      };
    } catch (error) {
      return {
        props: {
          sfaForm: body,
          errorMessage: 'Error saving form data.',
        },
      };
    }
  }

  const sfaForm = await prisma.sFAForm.findUnique({
    where: {
      id: parseInt(sfaFormId as string, 10),
    },
  });

  return {
    props: {
      sfaForm,
    },
  };
};

export default SFAFormPage;
