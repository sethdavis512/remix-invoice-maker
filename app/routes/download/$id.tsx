import type { LoaderFunction } from 'remix';
import { createPDF } from '~/utils/pdf.server';

export const loader: LoaderFunction = async ({ params }) => {
    const pdf = await createPDF(params.id);

    return new Response(pdf, {
        headers: {
            'Content-Type': 'application/pdf'
        }
    });
};
