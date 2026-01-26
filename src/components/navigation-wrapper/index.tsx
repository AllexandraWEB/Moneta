"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Navigation from "@/src/components/navigation";
import TransactionModal from "@/src/app/(app)/_components/forms/expense-form/expense-form.container";
import { useWorkspace } from "@/src/contexts/WorkspaceContext";

export default function NavigationWrapper() {
  const [expenseOpen, setExpenseOpen] = useState(false);
  const { workspaceId } = useWorkspace();

  return (
    <>
      <Navigation onAddExpense={() => setExpenseOpen(true)} />
      {workspaceId && (
        <TransactionModal
          open={expenseOpen}
          onClose={() => setExpenseOpen(false)}
          workspaceId={workspaceId}
        />
      )}
    </>
  );
}
