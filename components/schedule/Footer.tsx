import React from "react";
import { Language, translations } from "@/lib/translations";

interface FooterProps {
  currentLang: Language;
  title: string;
  reqs: string[];
  onTitleUpdate: (val: string) => void;
  onReqUpdate: (index: number, val: string) => void;
}

export function Footer({ currentLang, title, reqs, onTitleUpdate, onReqUpdate }: FooterProps) {
  // Use translations for keys but display logic is handled by parent passing in title/reqs
  
  return (
    <div className="mt-4 md:mt-6 bg-white p-3 md:p-6 rounded-lg shadow-sm border border-slate-200 text-xs md:text-base print:border-none print:shadow-none print:text-sm">
      <div className="flex flex-col md:flex-row gap-2 md:gap-4">
        <div className="font-bold text-gray-900 whitespace-nowrap min-w-[100px] md:min-w-[120px]">
          <input 
            type="text" 
            value={title} 
            onChange={(e) => onTitleUpdate(e.target.value)}
            className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none font-bold"
          />
        </div>
        <ul className="text-gray-800 space-y-1 md:space-y-2 list-none w-full">
          {reqs.map((req, idx) => (
             <li key={idx} className="flex w-full">
               <input 
                 type="text" 
                 value={req} 
                 onChange={(e) => onReqUpdate(idx, e.target.value)}
                 className="w-full bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
               />
             </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
