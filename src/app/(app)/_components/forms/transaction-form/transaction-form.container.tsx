import React, { useState } from "react";
import TransactionForm from "../../forms/transaction-form/transction-form";
import IncomeForm from "../../forms/income-form/income-form";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
}

const TransactionModal = ({ open, onClose }: TransactionModalProps) => {
  const [isExpense, setIsExpense] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-background rounded-t-[55px] shadow-lg animate-slideUp">
        {/* Header */}
        <div className="px-4 pt-6 pb-12">
          <h2 
            className="text-16-semibold text-center cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setIsExpense(!isExpense)}
          >
            {isExpense ? "New Expense" : "New Income"}
          </h2>
        </div>

        {/* Content */}
        <div className="px-8 pb-6">
          {isExpense ? <TransactionForm /> : <IncomeForm />}
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
