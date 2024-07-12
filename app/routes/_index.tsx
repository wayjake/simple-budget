import { json, type MetaFunction } from "@remix-run/node";
import db from '../database.server';
import { Link, useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Simple Budget (dot) com" },
    { name: "description", content: "Welcome to a simple budgeting tool of your dreams." },
  ];
};

export async function loader() {
  const transactions = await db.transaction.findMany();
  return json(transactions);
}

const HomePage = () => {
  const transactions = useLoaderData<typeof loader>();

  return (
    <div className="py-5 container mx-auto bg-background-light text-text-dark dark:bg-background dark:text-text">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <Link to="/transactions/import" className=" text-text-dark dark:text-text ml-2 underline">Import Transactions</Link>

      <ul className="mt-4">
        {transactions.map(transaction => (
          <li key={transaction.id} className="border p-2 mb-2 bg-card text-text dark:bg-card-light dark:text-text-dark border-border dark:border-border-light">
            <p>Date: {transaction.date}</p>
            <p>Description: {transaction.description}</p>
            <p>Amount: ${transaction.amount.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;