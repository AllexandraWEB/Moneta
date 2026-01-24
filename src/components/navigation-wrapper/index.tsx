"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navigation from "@/src/components/navigation";
import TransactionModal from "@/src/app/(app)/_components/forms/transaction-form/transaction-form.container";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const [expenseOpen, setExpenseOpen] = useState(false);

  const hiddenRoutes = ["/auth/login", "/auth/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return (
    <>
      <Navigation onAddExpense={() => setExpenseOpen(true)} />
      <TransactionModal
        open={expenseOpen}
        onClose={() => setExpenseOpen(false)}
      />
    </>
  );
}
