import { Croissant } from "lucide-react";

const TransactionTab = () => {
  return (
    <div className="w-full flex gap-3 items-center justify-between bg-white dark:bg-neutral-800 rounded-2xl py-4 px-4">
      <div className="flex gap-3 items-center">
        {/* Circle Icon */}
        <div className="w-13 h-13 flex items-center justify-center rounded-full bg-neutral-100">
          <Croissant color="black" />
        </div>
        {/* Category and Card Type */}
        <div>
          <h1 className="text-14-regular">Aleksandra Revolut</h1>
          <p className="text-xs">Restaurants and Takeaway</p>
        </div>
      </div>
      {/* Price and Time */}
      <div className="text-right">
        <h1 className="text-16-regular text-red-400">&euro;-13.87</h1>
        <p className="text-xs">02/01/2026</p>
      </div>
    </div>
  );
};

export default TransactionTab;
