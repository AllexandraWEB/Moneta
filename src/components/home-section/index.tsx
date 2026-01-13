import Card from "../card";
import Container from "../container";
import Transactions from "../transactions";
import { ThemeToggle } from "../theme-toggle";

const HeroSection = () => {
  return (
    <div className="h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* <div className="h-screen bg-[url(/background.png)] bg-cover bg-bottom"> */}
      {/* <div className="mx-auto text-center">
        <span className="text-14-regular uppercase text-black">Home</span>
      </div>{" "} */}
      {/* Welcome Back */}
      <div className="flex gap-3 items-center justify-between px-4 py-6">
        <div className="flex gap-3 items-center">
          {/* Circle */}
          <div className="flex items-center justify-center w-15 h-15 rounded-full bg-black dark:bg-neutral-100">
              <span className="text-18-regular text-white dark:text-black">AT</span>
          </div>
          {/* Welcome Message and Name */}
          <div>
            <span className="">Welcome back,</span>
            <h1 className="heading-5-bold">Aleksandra Tsimentarova</h1>
          </div>
        </div>
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
      <Container className="px-4 pt-2">
        {/* <div className="flex flex-col space-y-4">
          <span className="text-sm uppercase">Your current balance</span>
          <h1 className="display-sm-bold">&euro;13,032</h1>
        </div> */}
        {/* Cards */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 pb-4">
            {[1, 2, 3].map((card) => (
              <Card key={card} />
            ))}
          </div>
        </div>
        {/* Transactions */}
       <div className="bg-neutral-100 dark:bg-neutral-800 rounded-t-4xl -mx-4 px-4 mt-4">
         <Transactions />
       </div>
      </Container>
    </div>
  );
};

export default HeroSection;
