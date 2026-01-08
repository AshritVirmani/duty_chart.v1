"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DaySchedule, Zone } from "@/lib/types";
import { Language, translations } from "@/lib/translations";

interface ScheduleGridProps {
  data: DaySchedule[];
  zones: Zone[];
  volunteers: string[];
  gyanPracharaks: string[];
  onCellChange: (dayIndex: number, serviceIndex: number, zoneId: string, value: string) => void;
  onZoneUpdate: (index: number, field: keyof Zone, value: string) => void;
  currentLang: Language;
}

export function ScheduleGrid({ 
  data, 
  zones, 
  volunteers, 
  gyanPracharaks, 
  onCellChange,
  onZoneUpdate,
  currentLang
}: ScheduleGridProps) {
  
  const t = translations[currentLang];

  return (
    <>
      {/* Mobile Card Layout */}
      <div className="md:hidden flex-1 overflow-auto border border-black rounded-lg shadow-lg bg-white" id="schedule-grid-mobile">
        <div className="p-2 space-y-3">
          {data.map((dayData, dayIndex) => (
            <div key={`mobile-${dayData.date}-${dayIndex}`} className="border border-black rounded-lg bg-white">
              <div className="bg-slate-100 p-2 border-b border-black">
                <div className="font-bold text-sm text-gray-900">{dayData.day}</div>
                <div className="text-xs text-gray-600">{dayData.date}</div>
              </div>
              
              {dayData.services.map((service, serviceIndex) => (
                <div key={`mobile-${dayData.date}-${service.type}-${serviceIndex}`} className={cn("border-b border-black last:border-b-0", service.type.includes("Stage") ? "bg-white" : "bg-slate-50/50")}>
                  <div className="p-2 font-semibold text-sm text-gray-700 border-b border-gray-300">
                    {service.type === "Stage Seva" || service.type === "स्टेज सेवा" ? t.services.stage_seva : 
                     service.type === "Sanchalan" || service.type === "संचालन" ? t.services.sanchalan : service.type}
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1 p-2">
                    {zones.map((zone, zoneIndex) => {
                      const currentValue = service.allocations[zone.id];
                      return (
                        <div key={`mobile-${zone.id}`} className="flex items-center gap-2 border-b border-gray-200 pb-1 last:border-b-0">
                          <div className="flex-shrink-0 w-24">
                            <input
                              type="text"
                              value={zone.name}
                              onChange={(e) => onZoneUpdate(zoneIndex, "name", e.target.value)}
                              className="w-full text-xs font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none mb-0.5"
                            />
                            <input
                              type="text"
                              value={zone.contact}
                              onChange={(e) => onZoneUpdate(zoneIndex, "contact", e.target.value)}
                              className="w-full text-[10px] text-gray-600 bg-transparent border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none mb-0.5"
                            />
                            <input
                              type="text"
                              value={zone.time}
                              onChange={(e) => onZoneUpdate(zoneIndex, "time", e.target.value)}
                              className="w-full text-[10px] text-gray-500 bg-transparent border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                            />
                          </div>
                          <div className="flex-1">
                            <input
                              list={`volunteers-mobile-${dayIndex}-${serviceIndex}-${zone.id}`}
                              className="w-full px-2 py-1 text-sm text-center bg-transparent border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none rounded-sm font-medium text-gray-800"
                              value={currentValue || ""}
                              onChange={(e) => onCellChange(dayIndex, serviceIndex, zone.id, e.target.value)}
                            />
                            <datalist id={`volunteers-mobile-${dayIndex}-${serviceIndex}-${zone.id}`}>
                              {gyanPracharaks.map((v) => (
                                <option key={`gp-mobile-${v}`} value={v}>★ {v}</option> 
                              ))}
                              {volunteers.map((v) => (
                                <option key={`v-mobile-${v}`} value={v} />
                              ))}
                            </datalist>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table Layout */}
      <div className="hidden md:block flex-1 overflow-auto border border-black rounded-lg shadow-lg bg-white relative print:border-none print:shadow-none print:overflow-visible print:block" id="schedule-grid">
        <table className="w-full border-collapse table-auto print:min-w-0 print:w-full print:table-fixed print:h-full">
        <thead className="bg-slate-100 sticky top-0 z-20 shadow-sm print:static print:bg-white print:shadow-none">
          <tr>
            <th
              rowSpan={3}
              className="border border-black p-2 text-center min-w-[90px] sticky left-0 z-30 bg-slate-100 font-bold text-gray-700 text-base align-middle print:static print:bg-white print:min-w-0 print:w-[8%]"
            >
              <div className="flex flex-col gap-1">
                <span className="whitespace-pre-line">{t.grid.day_date}</span>
              </div>
            </th>
            <th
              rowSpan={3}
              className="border border-black p-2 text-center min-w-[90px] sticky left-[90px] z-30 bg-slate-100 font-bold text-gray-700 text-lg align-middle print:static print:bg-white print:min-w-0 print:w-[8%]"
            >
              {t.grid.service}
            </th>
            {zones.map((zone, index) => (
              <th
                key={`num-${zone.id}`}
                className="border border-black p-1 text-center font-bold text-gray-800 text-base print:text-sm"
              >
                {index + 1}
              </th>
            ))}
          </tr>
          
          <tr>
            {zones.map((zone, index) => (
              <th
                key={`name-${zone.id}`}
                className="border border-black p-1.5 text-center font-semibold text-gray-700 align-top group relative print:min-w-0 print:align-middle"
              >
                <div className="print:hidden">
                  <input
                    type="text"
                    value={zone.name}
                    onChange={(e) => onZoneUpdate(index, "name", e.target.value)}
                    className="w-full text-center bg-transparent font-bold text-gray-900 mb-0.5 border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none text-base whitespace-normal"
                  />
                  <input
                    type="text"
                    value={zone.contact}
                    onChange={(e) => onZoneUpdate(index, "contact", e.target.value)}
                    className="w-full text-center bg-transparent text-sm text-gray-600 font-normal border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                
                <div className="hidden print:flex print:flex-col print:items-center print:justify-center print:gap-1">
                  <span className="text-base font-bold text-gray-900 whitespace-normal break-words leading-tight">{zone.name}</span>
                  <span className="text-sm text-gray-600 whitespace-normal break-words leading-tight">{zone.contact}</span>
                </div>
              </th>
            ))}
          </tr>

          <tr>
            {zones.map((zone, index) => (
              <th
                key={`time-${zone.id}`}
                className="border border-black p-1.5 text-center text-sm font-medium text-gray-800 print:text-xs"
              >
                 <input
                  type="text"
                  value={zone.time}
                  onChange={(e) => onZoneUpdate(index, "time", e.target.value)}
                  className="w-full text-center bg-transparent font-medium border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none print:hidden text-sm"
                />
                <span className="hidden print:block text-xs font-medium whitespace-nowrap">{zone.time}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="print:h-auto">
          {data.map((dayData, dayIndex) => (
            <React.Fragment key={`${dayData.date}-${dayIndex}`}>
              {dayData.services.map((service, serviceIndex) => (
                <tr
                  key={`${dayData.date}-${service.type}-${serviceIndex}`}
                  className={cn(
                    "hover:bg-gray-50 transition-colors print:h-auto",
                    service.type.includes("Stage") ? "bg-white" : "bg-slate-50/50"
                  )}
                >
                  {serviceIndex === 0 && (
                    <td
                      rowSpan={dayData.services.length}
                      className="border border-black p-3 font-bold text-gray-700 align-middle sticky left-0 z-10 bg-white text-center print:static print:p-2"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-base text-gray-900 print:text-base">{dayData.day}</span>
                        <span className="text-sm text-gray-500 font-medium print:text-sm whitespace-nowrap">{dayData.date}</span>
                      </div>
                    </td>
                  )}

                  <td className="border border-black p-3 font-semibold text-gray-700 align-middle sticky left-[90px] z-10 bg-inherit text-center text-base print:static print:text-base print:p-2">
                    <span className="print:whitespace-normal print:break-words">
                      {service.type === "Stage Seva" || service.type === "स्टेज सेवा" ? t.services.stage_seva : 
                       service.type === "Sanchalan" || service.type === "संचालन" ? t.services.sanchalan : service.type}
                    </span>
                  </td>

                  {zones.map((zone) => {
                    const currentValue = service.allocations[zone.id];
                    
                    return (
                      <td
                        key={zone.id}
                        className="border border-black p-1 text-center align-middle"
                      >
                         <div className="relative w-full h-full flex items-center justify-center">
                           <input
                             list={`volunteers-${dayIndex}-${serviceIndex}-${zone.id}`}
                             className="w-full h-8 px-2 py-0.5 text-base text-center bg-transparent border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none rounded-sm font-medium text-gray-800 print:hidden whitespace-normal overflow-hidden text-ellipsis"
                             value={currentValue || ""}
                             onChange={(e) => onCellChange(dayIndex, serviceIndex, zone.id, e.target.value)}
                           />
                           
                           <span className="hidden print:flex items-center justify-center w-full h-full text-sm font-medium text-gray-900 whitespace-normal break-words leading-tight px-1 min-h-[2em]">
                             {currentValue}
                           </span>

                           <datalist id={`volunteers-${dayIndex}-${serviceIndex}-${zone.id}`}>
                             {gyanPracharaks.map((v) => (
                               <option key={`gp-${v}`} value={v}>★ {v}</option> 
                             ))}
                             {volunteers.map((v) => (
                               <option key={`v-${v}`} value={v} />
                             ))}
                           </datalist>
                         </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
