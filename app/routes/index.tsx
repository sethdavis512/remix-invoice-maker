import { MetaFunction, Form, LoaderFunction, useLoaderData, ActionFunction, redirect } from 'remix';
import { db } from '~/utils/db.server';
import { Invoice } from './pdf/$id';

export const meta: MetaFunction = () => {
    return {
        title: 'Invoice Maker',
        description: 'Welcome to Invoice Maker!'
    };
};

export const loader: LoaderFunction = async () => {
    const invoices = await db.invoice.findMany();

    return { invoices };
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const quantity = Number(formData.get('quantity'));
    const price = Number(formData.get('price'));

    const invoicePayload = {
        title,
        quantity,
        price
    };

    await db.invoice.create({
        data: invoicePayload
    })

    return null;
}

export default function Index() {
    const data = useLoaderData();

    return (
        <div>
            <main>
                <h2 className="title is-2">Invoice Maker</h2>
                <div className="columns">
                    <div className="column">
                        <div className="box">
                            <Form method="post">
                                <div className="field">
                                    <label className="label" htmlFor="title">
                                        Title
                                    </label>
                                    <div className="control">
                                        <input
                                            id="title"
                                            className="input"
                                            type="text"
                                            name="title"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="quantity">
                                        Quantity
                                    </label>
                                    <div className="control">
                                        <input
                                            id="quantity"
                                            className="input"
                                            type="number"
                                            name="quantity"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label" htmlFor="price">
                                        Price
                                    </label>
                                    <div className="control">
                                        <input
                                            id="price"
                                            className="input"
                                            type="number"
                                            name="price"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="button is-primary is-fullwidth"
                                >
                                    Add
                                </button>
                            </Form>
                        </div>
                    </div>
                    <div className="column">
                        <div className="box">
                            <h3 className="title is-3">All Invoices</h3>
                            <ul style={{ listStyleType: 'none' }}>
                                {data &&
                                    data.invoices &&
                                    data.invoices.map((invoice: Invoice) => (
                                        <li>
                                            <a href={`/download/${invoice.id}`}>
                                                {invoice.title}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
