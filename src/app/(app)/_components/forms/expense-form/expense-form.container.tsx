import React, { useState } from "react";
import TransactionForm from "./expense-form";
import IncomeForm from "../income-form/income-form";

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
}

const TransactionModal = ({ open, onClose, workspaceId }: TransactionModalProps) => {
  const [isExpense, setIsExpense] = useState(true);

  if (!open) return null;

  const handleSuccess = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-neutral-700/30"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-t-[55px] shadow-lg animate-slideUp">
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
          {isExpense ? (
            <TransactionForm workspaceId={workspaceId} onSuccess={handleSuccess} />
          ) : (
            <IncomeForm workspaceId={workspaceId} onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
