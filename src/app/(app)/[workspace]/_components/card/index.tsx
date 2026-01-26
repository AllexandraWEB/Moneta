import { ArrowRight, Nfc } from "lucide-react";
import { Account } from "@/src/types/database";
import { useState } from "react";

interface CardProps {
  account: Account;
}

const Card = ({ account }: CardProps) => {
  const [showBalance, setShowBalance] = useState(false);

  const formatBalance = (balance: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: account.currency || 'USD',
      minimumFractionDigits: 2,
    }).format(balance);
  };

  return (
    <div className="relative w-80 shrink-0 px-4 py-12 rounded-[30px] bg-[url(/light-theme-background.jpeg)] dark:bg-[url(/dark-theme-background.png)] bg-center bg-cover text-white dark:text-black">
      <Nfc className="absolute top-4 right-4" size={24} />
      <img src="/chip.png" alt="Card Chip" className="w-12 mb-5" />
      <div className="flex justify-between items-end">
        {/* Left Side */}
        <div>
          <h1 className="text-14-semibold uppercase mb-3">{account.type}</h1>
          <p className="text-sm">{account.name}</p>
        </div>
        {/* Right Side - Show Current Balance */}
        <button 
          onClick={() => setShowBalance(!showBalance)}
          className="flex justify-center items-center gap-2 hover:opacity-80 transition-opacity"
        >
          {showBalance ? (
            <span className="text-lg font-bold">{formatBalance(account.balance)}</span>
          ) : (
            <>
              <ArrowRight />
              <span className="text-sm">Show Balance</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Card;
