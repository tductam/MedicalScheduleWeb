import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { BookingSummary } from "./BookingSummary";

export function BookingSummaryResponsive() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="hidden xl:block w-80">
        <div className="sticky top-30 bg-white rounded-md shadow-md ">
          <BookingSummary />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0  w-full xl:hidden z-30">
        {isOpen === false && (
          <div className="text-white flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="bg-[#075BB5] px-3 rounded-t-xl"
            >
              <ChevronUp />
            </button>
          </div>
        )}
        {isOpen && (
          <>
            <div className="text-white flex justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-[#075BB5] px-3 rounded-t-xl"
              >
                <ChevronDown />
              </button>
            </div>
            <div className="bg-white border border-zinc-300 rounded-md">
              <BookingSummary />
            </div>
          </>
        )}
      </div>
    </>
  );
}
