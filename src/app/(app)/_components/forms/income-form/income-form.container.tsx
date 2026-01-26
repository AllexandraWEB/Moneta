import { useState } from "react";
import IncomeForm from "./income-form";
import TransactionForm from "../expense-form/expense-form";

interface IncomeModalProps {
  open: boolean;
  onClose: () => void;
  workspaceId: string;
}

const IncomeModal = ({ open, onClose, workspaceId }: IncomeModalProps) => {
  const [isIncome, setIsIncome] = useState(true);

  if (!open) return null;

  const handleSuccess = () => {
    onClose();
  };

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
            onClick={() => setIsIncome(!isIncome)}
          >
            {isIncome ? "New Income" : "New Expense"}
          </h2>
        </div>

        {/* Content */}
        <div className="px-8 pb-6">
          {isIncome ? (
            <IncomeForm workspaceId={workspaceId} onSuccess={handleSuccess} />
          ) : (
            <TransactionForm workspaceId={workspaceId} onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeModal;
