import { Croissant } from "lucide-react";

interface TransactionTabProps {
  transaction: {
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
  };
}

const TransactionTab = ({ transaction }: TransactionTabProps) => {
  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? 'text-green-500' : 'text-red-400';
  const formattedAmount = isIncome ? `+€${transaction.amount.toFixed(2)}` : `-€${transaction.amount.toFixed(2)}`;
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="w-full flex gap-3 items-center justify-between bg-white dark:bg-neutral-800 rounded-2xl py-4 px-4">
      <div className="flex gap-3 items-center">
        {/* Circle Icon */}
        <div className="w-13 h-13 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-700">
          <Croissant color="black" className="dark:text-white" />
        </div>
        {/* Category and Card Type */}
        <div>
          <h1 className="text-14-regular">{transaction.accounts?.name || 'Unknown Account'}</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {transaction.categories?.name || 'Uncategorized'}
          </p>
        </div>
      </div>
      {/* Price and Time */}
      <div className="text-right">
        <h1 className={`text-16-regular ${amountColor}`}>{formattedAmount}</h1>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{formattedDate}</p>
      </div>
    </div>
  );
};

export default TransactionTab;
