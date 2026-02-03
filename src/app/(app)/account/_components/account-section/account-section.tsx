import Container from "@/src/components/container";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AccountSection = () => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900">
      <Container className="px-4">
        {/* Header */}
        <header>
          <span className="py-6 flex gap-2 items-center text-18-regular text-gray-600 dark:text-white">
            <ChevronLeft /> Account
          </span>
        </header>
        {/* Account Overview */}
        <div className="w-full flex items-center justify-between bg-neutral-800 text-white rounded-xl py-6 px-4 mb-4 border border-neutral-200 dark:border-neutral-700">
          {/* Icon and Name */}
          <div className="flex items-center justify-start gap-3">
            <img
              src="/background.png"
              alt="Profile Icon"
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h2>Aleksandra Tsimentarova</h2>
              <span className="text-neutral-400">cimentarowa@gmail.com</span>
            </div>
          </div>
          <ChevronRight className="text-white" />
        </div>
        {/* Account Settings */}
        
      </Container>
    </div>
  );
};

export default AccountSection;
