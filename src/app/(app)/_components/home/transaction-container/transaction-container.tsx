import React from "react";
import TransactionForm from "../../forms/transaction-form/transction-form";
import Container from "@/src/components/container";

const TransactionContainer = () => {
  return (
    <Container>
      <div>
        <TransactionForm />
      </div>
    </Container>
  );
};

export default TransactionContainer;
