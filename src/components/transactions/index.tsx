import Container from "../container";
import TransactionTab from "../transaction-tab";

const Transactions = () => {
  return (
    <Container>
      <div>
        <h1 className="heading-3-regular">Transactions</h1>
      </div>
      <div className="relative w-full px-4 py-4 space-y-5 rounded-[30px] glassy-border bg-white/5 backdrop-blur-xl">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((card) => (
          <TransactionTab key={card} />
        ))}
      </div>
    </Container>
  );
};

export default Transactions;
