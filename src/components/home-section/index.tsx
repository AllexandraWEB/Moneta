import Card from "../card";
import Container from "../container";
import Transactions from "../transactions";

const HeroSection = () => {
  return (
    <div className="h-screen bg-[url(/background.png)] bg-cover bg-bottom">
      {/* <div className="mx-auto text-center">
        <span className="text-14-regular uppercase text-black">Home</span>
      </div>{" "} */}
      {/* Welcome Back */}
      <div className="flex gap-3 items-center justify-start px-4 py-8">
        {/* Circle */}
        <div className="flex items-center justify-center w-15 h-15 rounded-full bg-black">
            <span className="text-18-regular">AT</span>
        </div>
        {/* Welcome Message and Name */}
        <div>
          <span className="">Welcome back,</span>
          <h1 className="heading-5-bold">Aleksandra Tsimentarova</h1>
        </div>
      </div>
      <Container className="px-4 pt-2">
        <div className="flex flex-col space-y-4">
          <span className="text-sm uppercase">Your current balance</span>
          <h1 className="display-sm-bold">&euro;13,032</h1>
        </div>
        {/* Cards */}
        <div className="pt-10 overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {[1, 2, 3].map((card) => (
              <Card key={card} />
            ))}
          </div>
        </div>
        {/* Transactions */}
        <Transactions />
      </Container>
    </div>
  );
};

export default HeroSection;
