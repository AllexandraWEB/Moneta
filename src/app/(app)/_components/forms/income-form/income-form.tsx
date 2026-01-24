import NumericKeypad from "@/src/components/numeric-keyboard";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useState } from "react";

const IncomeForm = () => {
  const [amount, setAmount] = useState("0");

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
        className="w-full text-center text-gray-400 dark:text-white outline-none border-b pb-2"
      />

      {/* Category */}
      <Select>
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
          <SelectItem value="salary">Salary</SelectItem>
          <SelectItem value="sold-item">Sold Item</SelectItem>
          <SelectItem value="gift">Gift</SelectItem>
        </SelectContent>
      </Select>

      {/* Account */}
      <Select>
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
          <SelectItem value="aleksandra-dsk">Aleksandra DSK</SelectItem>
          <SelectItem value="aleksandra-revolut">Aleksandra Revolut</SelectItem>
          <SelectItem value="aleksandra-cash">Aleksandra Cash</SelectItem>
          <SelectItem value="stoyan-uni">Stoyan Unicredit</SelectItem>
          <SelectItem value="stoyan-revolut">Stoyan Revolut</SelectItem>
          <SelectItem value="stoyan-cash">Stoyan Cash</SelectItem>
        </SelectContent>
      </Select>
      {/* Continue */}
      <Button className="w-full" size="xl">
        Continue
      </Button>
      {/* Keyboard */}
      <NumericKeypad onKeyPress={handleKeyPress} />
    </div>
  );
};

export default IncomeForm;
