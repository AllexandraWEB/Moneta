import NumericKeypad from "@/src/components/numeric-keyboard";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createTransaction } from "@/src/app/actions/transactions";
import { getWorkspaceAccounts } from "@/src/app/actions/accounts";
import { getWorkspaceCategories } from "@/src/app/actions/categories";
import { Account, Category } from "@/src/types/database";

interface IncomeFormProps {
  workspaceId: string;
  onSuccess?: () => void;
}

const IncomeForm = ({ workspaceId, onSuccess }: IncomeFormProps) => {
  const router = useRouter();
  const [amount, setAmount] = useState("0");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch accounts and categories
  useEffect(() => {
    const fetchData = async () => {
      const [accountsRes, categoriesRes] = await Promise.all([
        getWorkspaceAccounts(workspaceId),
        getWorkspaceCategories(workspaceId, 'income')
      ]);

      if (accountsRes.data) setAccounts(accountsRes.data);
      if (categoriesRes.data) setCategories(categoriesRes.data);
    };

    fetchData();
  }, [workspaceId]);

  const handleSubmit = async () => {
    if (!selectedAccount || !selectedCategory || parseFloat(amount) === 0) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    const { error } = await createTransaction({
      workspace_id: workspaceId,
      account_id: selectedAccount,
      category_id: selectedCategory,
      amount: parseFloat(amount),
      type: 'income',
      note: note || undefined,
    });

    setLoading(false);

    if (error) {
      alert(`Error: ${error}`);
    } else {
      // Reset form
      setAmount("0");
      setNote("");
      setSelectedCategory("");
      setSelectedAccount("");
      // Trigger transaction list refresh
      window.dispatchEvent(new CustomEvent('transactionCreated'));
      router.refresh();
      onSuccess?.();
    }
  };

  const handleKeyPress = (value: string) => {
    if (value === "back") {
      // Remove last character
      const newAmount = amount.slice(0, -1);
      setAmount(newAmount || "0");
    } else if (value === ".") {
      // Only add decimal point if there isn't one already
      if (!amount.includes(".")) {
        setAmount(amount + ".");
      }
    } else {
      // Add the pressed digit
      const parts = amount.split(".");
      
      // If there's a decimal point and already 2 decimal places, don't add more
      if (parts.length === 2 && parts[1].length >= 2) {
        return;
      }
      
      if (amount === "0") {
        setAmount(value);
      } else {
        setAmount(amount + value);
      }
    }
  };

  const formatAmount = (value: string) => {
    // Split by decimal point
    const parts = value.split(".");
    const integerPart = parts[0];
    const decimalPart = parts[1];

    // Add comma as thousands separator
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Always show 2 decimal places
    if (decimalPart !== undefined) {
      // User has started typing decimals
      return `${formattedInteger}.${decimalPart.padEnd(2, "0")}`;
    } else {
      // No decimal point yet, show .00
      return `${formattedInteger}.00`;
    }
  };

  return (
    <div className="space-y-4">
      {/* Amount */}
      <div className="text-center">
        <span className="text-[50px] text-gray-400">$</span>
        <span className="text-[50px] font-bold pl-3">{formatAmount(amount)}</span>
      </div>

      {/* Type here */}
      <input
        placeholder="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full text-center text-gray-400 dark:text-white outline-none border-b pb-2"
      />

      {/* Category */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              <span className="flex items-center gap-2 text-gray-600 dark:text-white">
                📂 <span className="pl-1">Choose category</span>
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent className="mt-20">
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.icon} {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Account */}
      <Select value={selectedAccount} onValueChange={setSelectedAccount}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              <span className="flex items-center gap-2 text-gray-600 dark:text-white">
                📂 <span className="pl-1">Choose account</span>
              </span>
            }
          />
        </SelectTrigger>
        <SelectContent className="mt-20">
          {accounts.map((account) => (
            <SelectItem key={account.id} value={account.id}>
              {account.icon} {account.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Continue */}
      <Button 
        className="w-full" 
        size="xl"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Continue'}
      </Button>
      {/* Keyboard */}
      <NumericKeypad onKeyPress={handleKeyPress} />
    </div>
  );
};

export default IncomeForm;
