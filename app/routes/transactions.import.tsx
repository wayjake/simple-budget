import { useLoaderData, Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import FileUpload from "~/components/FileUpload";
import { useState } from "react";
import { Transaction } from "~/types/Transaction";

type Account = {
    id: number;
    name: string;
};

type Category = {
    id: number;
    name: string;
};

export const meta: MetaFunction = () => {
    return [
        { title: "Import Transactions - Simple Budget" },
        { name: "description", content: "Import transactions from your bank or credit cards." },
    ];
};

export const loader: LoaderFunction = async () => {
    const accounts: Account[] = [
        { id: 1, name: "Wells Fargo - Personal Checking" },
        { id: 2, name: "Bank of America - Savings" },
    ];
    const categories: Category[] = [
        { id: 1, name: "Wells Fargo - Personal Checking", type: "expense" },
        { id: 2, name: "Bank of America - Savings" },
    ];
    return json({ accounts, categories });
};

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const accountId = formData.get("account");
    // Handle the form submission logic here
    console.log(`Selected account ID: ${accountId}`);
    return redirect("/");
};

export default function ImportTransactions() {
    const { accounts } = useLoaderData<{ accounts: Account[], categories: Category[] }>();
    const [transactions, setTransactions] = useState<Transaction[]>([])

    return (
        <div className="py-5 container mx-auto bg-background-light text-text-dark dark:bg-background dark:text-text">
            <Form method="post" className="my-9 container mx-auto p-4">
                <h1 className="text-4xl font-bold underline decoration-solid">Import Transactions</h1>

                <div className="mb-4">
                    <h2 className="text-2xl mb-2 mt-5">Destination</h2>
                    <label htmlFor="account" className="block mb-2">Select account to import transactions to</label>
                    <select
                        id="account"
                        name="account"
                        className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        defaultValue={accounts[0].id}
                    >
                        {accounts.map((account) => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="my-6">
                    <h2 className="text-2xl">Select File</h2>
                    <FileUpload onUpload={setTransactions} />
                </div>

                {!!transactions.length && <table className="table-auto w-full border-collapse border border-border dark:border-border-light">
                    <thead>
                        <tr>
                            <th className="border border-border dark:border-border-light p-2">Amount</th>
                            <th className="border border-border dark:border-border-light p-2">Date</th>
                            <th className="border border-border dark:border-border-light p-2">Description</th>
                            <th className="border border-border dark:border-border-light p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction: Transaction) => {
                            return (<tr key={transaction.id}>
                                <td className="border border-border dark:border-border-light p-2">
                                    {transaction.amount}
                                </td>
                                <td className="border border-border dark:border-border-light p-2">
                                    {transaction.date}
                                </td>
                                <td className="border border-border dark:border-border-light p-2">
                                    {transaction.description}
                                </td>
                                <td className="border border-border dark:border-border-light p-2">
                                    <TransactionActions transaction={transaction} />
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>}

                {/* <div className="mt-2 flex justify-end">
                    <button type="submit" disabled={!transactions.length} className="mt-4 bg-pink-500 text-white py-2 px-4 rounded dark:bg-pink-700 dark:border-pink-600">
                        Import
                    </button>
                </div> */}
            </Form>
        </div>
    );
}
