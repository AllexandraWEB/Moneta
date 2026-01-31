"use client";

import Container from "../../../../../components/container";
import TransactionTab from "../transaction-tab";
import { getWorkspaceTransactions } from "@/src/app/actions/transactions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TransactionsProps {
  workspaceId: string;
}

interface Transaction {
  id: string;
  amount: number;
  type: string;
  date: string;
  note?: string | null;
  accounts: {
    name: string;
    type: string;
    icon: string | null;
  } | null;
  categories: {
    name: string;
    icon: string | null;
    type: string;
  } | null;
}

const Transactions = ({ workspaceId }: TransactionsProps) => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const { data, error: fetchError } = await getWorkspaceTransactions(workspaceId);
      if (fetchError) {
        setError(fetchError);
      } else if (data) {
        setTransactions(data as Transaction[]);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [workspaceId, refreshKey]);

  // Listen for transaction created events
  useEffect(() => {
    const handleTransactionCreated = () => {
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('transactionCreated', handleTransactionCreated);
    return () => window.removeEventListener('transactionCreated', handleTransactionCreated);
  }, []);

  return (
    <Container>
      <div>
        <h1 className="heading-2-semibold pt-4">Transactions</h1>
      </div>
      <div className="relative w-full py-4 space-y-4">
        {loading && (
          <p className="text-neutral-500">Loading transactions...</p>
        )}
        {error && (
          <p className="text-red-500">Error loading transactions: {error}</p>
        )}
        {!loading && !error && transactions.length === 0 && (
          <p className="text-neutral-500">No transactions yet</p>
        )}
        {!loading && !error && transactions.map((transaction) => (
          <TransactionTab 
            key={transaction.id} 
            transaction={transaction}
          />
        ))}
      </div>
    </Container>
  );
};

export default Transactions;
