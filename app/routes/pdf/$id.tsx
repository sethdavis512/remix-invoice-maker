import { LoaderFunction, useLoaderData, json } from 'remix';
import { db } from '~/db.server';

export type Invoice = {
    id: string;
    title: string;
    price: number;
    quantity: number;
}

export type PDFData = {
    invoice: Invoice;
};

export const loader: LoaderFunction = async ({ params }) => {
    const invoice = await db.invoice.findUnique({
        where: {
            id: params.id
        }
    });

    return json({
        invoice
    });
};

export default function PDFRoute() {
    const data = useLoaderData<PDFData>();

    return (
        <div className="box">
            <div className="columns">
                <div className="column is-6">
                    <h2 className="title is-2">Invoice</h2>
                    {data && data.invoice && (
                        <table className="table is-bordered is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{data.invoice.title}</td>
                                    <td>{data.invoice.quantity}</td>
                                    <td>{data.invoice.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
