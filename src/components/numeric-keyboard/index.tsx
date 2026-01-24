import { Delete } from "lucide-react";

const keys = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  ".", "0", "back",
];

interface NumericKeypadProps {
  onKeyPress?: (value: string) => void;
}

const NumericKeypad = ({ onKeyPress }: NumericKeypadProps) => {
  return (
    <div className="grid grid-cols-3 gap-y-3 gap-x-10 mt-2 px-5">
      {keys.map((key) => {
        if (key === "back") {
          return (
            <button
              key={key}
              onClick={() => onKeyPress?.("back")}
              className="flex items-center justify-center text-gray-500 active:scale-95 transition"
            >
              <Delete size={22} />
            </button>
          );
        }

        return (
          <button
            key={key}
            onClick={() => onKeyPress?.(key)}
            className="w-14 h-14 mx-auto flex items-center justify-center rounded-full text-lg font-medium text-black dark:text-white active:bg-gray-100 dark:active:bg-white/10 transition"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default NumericKeypad;