import { ArrowRight, Nfc } from "lucide-react";

const Card = () => {
  return (
    <div className="relative w-80 shrink-0 px-4 py-12 rounded-[30px] bg-[url(/light-theme-background.jpeg)] dark:bg-[url(/dark-theme-background.png)] bg-center bg-cover text-white dark:text-black">
      <Nfc className="absolute top-4 right-4" size={24} />
      <img src="/chip.png" alt="Card Chip" className="w-12 mb-5" />
      <div className="flex justify-between items-end">
        {/* Left Side */}
        <div>
          <h1 className="text-14-semibold uppercase mb-3">Debit card</h1>
          <p className="text-sm">Aleksandra</p>
        </div>
        {/* Right Side - Show Current Balance */}
        <div className="flex justify-center items-center gap-2">
          <ArrowRight />
          <span className="text-sm">Show Current Balance</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
