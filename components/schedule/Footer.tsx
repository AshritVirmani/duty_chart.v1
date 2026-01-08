import React from "react";
import { Language } from "@/lib/translations";

interface FooterProps {
  currentLang: Language;
  title: string;
  reqs: string[];
  onTitleUpdate: (val: string) => void;
  onReqUpdate: (index: number, val: string) => void;
}

export function Footer({
  title,
  reqs,
  onTitleUpdate,
  onReqUpdate,
}: FooterProps) {
  return (
    <footer className="mt-6 print:mt-4 w-full text-gray-900 border-t-0 border-gray-200 pt-2 px-2 md:px-0">
      {/* Grid Layout:
        - Col 1: The Label "Vishesh Binti -" (Auto width)
        - Col 2: The List of Requests (Takes remaining space)
      */}
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-2 md:gap-6 print:grid-cols-[auto_1fr] print:gap-8">

        {/* Left Column: Label */}
        <div className="font-bold text-sm md:text-base whitespace-nowrap print:text-xs print:font-bold mt-1">
          <input
            value={title}
            onChange={(e) => onTitleUpdate(e.target.value)}
            className="bg-transparent border-none focus:outline-none font-bold text-gray-900 w-full md:w-auto"
          />
        </div>

        {/* Right Column: List of Requests */}
        <div className="flex flex-col gap-1.5 print:gap-1.5">
          {reqs.map((req, index) => (
            <div key={index} className="flex items-start">
              <input
                value={req}
                onChange={(e) => onReqUpdate(index, e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none text-xs md:text-sm text-gray-800 leading-relaxed print:text-[10px] print:leading-loose placeholder:text-gray-300"
                placeholder={`Request line ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
