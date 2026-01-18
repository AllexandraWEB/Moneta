import Container from "../../../../../components/container";
import TransactionTab from "../transaction-tab";

const Transactions = () => {
  return (
    <Container>
      <div>
        <h1 className="heading-2-semibold pt-4">Transactions</h1>
      </div>
      <div className="relative w-full py-4 space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
          <TransactionTab key={card} />
        ))}
      </div>
    </Container>
  );
};

export default Transactions;
