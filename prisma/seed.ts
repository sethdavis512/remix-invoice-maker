import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getInvoices().map((invoice) => {
            return db.invoice.create({ data: invoice });
        })
    );
}

seed();

function getInvoices() {
    return [
        {
            title: 'Roof',
            quantity: 1,
            price: 15000
        }
    ];
};
