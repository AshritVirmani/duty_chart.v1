"use client";

import React, { useState } from "react";
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

    // NEW: State to track which day is currently selected on Mobile
    const [activeMobileDayIndex, setActiveMobileDayIndex] = useState(0);

    // Helper to get the currently viewed day data
    const activeDayData = data[activeMobileDayIndex];

    return (
        <>
            {/* ========================================================= */}
            {/* MOBILE LAYOUT (Tabs + Single Day View)                    */}
            {/* ========================================================= */}
            <div className="md:hidden w-full bg-white print:hidden" id="schedule-grid-mobile">

                {/* 1. Horizontal Date Tabs (Sticky Top) */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm p-2 mb-2">
                    <div className="flex overflow-x-auto gap-2 pb-1 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                        {data.map((dayData, index) => (
                            <button
                                key={`tab-${index}`}
                                onClick={() => setActiveMobileDayIndex(index)}
                                className={cn(
                                    "flex flex-col items-center justify-center min-w-[70px] px-3 py-2 rounded-lg border transition-all duration-200",
                                    activeMobileDayIndex === index
                                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                        : "bg-slate-50 border-gray-200 text-gray-600 hover:bg-slate-100"
                                )}
                            >
                                <span className="text-xs font-bold uppercase">{dayData.day.substring(0, 3)}</span>
                                <span className="text-[10px] font-medium">{dayData.date.split('.')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Active Day Content Card */}
                {activeDayData && (
                    <div className="p-2 space-y-3 pb-8">
                        <div className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
                            {/* Card Header: Full Date */}
                            <div className="bg-slate-100 p-3 border-b border-gray-300 flex justify-between items-center">
                                <div className="font-bold text-gray-900">{activeDayData.day}</div>
                                <div className="text-sm font-medium text-gray-600 bg-white px-2 py-0.5 rounded border border-gray-200">
                                    {activeDayData.date}
                                </div>
                            </div>

                            {/* Services List for the Active Day */}
                            {activeDayData.services.map((service, serviceIndex) => (
                                <div
                                    key={`mobile-${activeDayData.date}-${service.type}-${serviceIndex}`}
                                    className={cn(
                                        "border-b border-gray-300 last:border-b-0",
                                        service.type.includes("Stage") ? "bg-white" : "bg-slate-50/50"
                                    )}
                                >
                                    {/* Service Header (e.g. Stage Service) */}
                                    <div className="p-2 font-bold text-sm text-blue-800 border-b border-gray-200 bg-blue-50/30">
                                        {service.type === "Stage Seva" || service.type === "स्टेज सेवा" ? t.services.stage_seva :
                                            service.type === "Sanchalan" || service.type === "संचालन" ? t.services.sanchalan : service.type}
                                    </div>

                                    {/* Zone List */}
                                    <div className="grid grid-cols-1 gap-0">
                                        {zones.map((zone, zoneIndex) => {
                                            const currentValue = service.allocations[zone.id];
                                            return (
                                                <div key={`mobile-${zone.id}`} className="flex flex-col border-b border-gray-100 last:border-b-0 p-2">

                                                    {/* Zone Header (Name & Time) */}
                                                    <div className="flex justify-between items-start mb-1.5">
                                                        <div className="flex-1">
                                                            <input
                                                                type="text"
                                                                value={zone.name}
                                                                onChange={(e) => onZoneUpdate(zoneIndex, "name", e.target.value)}
                                                                className="w-full text-sm font-bold text-gray-800 bg-transparent border-none p-0 focus:ring-0"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={zone.contact}
                                                                onChange={(e) => onZoneUpdate(zoneIndex, "contact", e.target.value)}
                                                                className="w-full text-[10px] text-gray-500 bg-transparent border-none p-0 focus:ring-0"
                                                            />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={zone.time}
                                                            onChange={(e) => onZoneUpdate(zoneIndex, "time", e.target.value)}
                                                            className="text-[10px] font-medium text-gray-500 bg-gray-100 rounded px-1.5 py-0.5 text-right w-16 border-none"
                                                        />
                                                    </div>

                                                    {/* Input Field */}
                                                    <div className="relative">
                                                        <input
                                                            list={`volunteers-mobile-${activeMobileDayIndex}-${serviceIndex}-${zone.id}`}
                                                            className="w-full px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none font-medium text-gray-900"
                                                            placeholder="Select volunteer..."
                                                            value={currentValue || ""}
                                                            onChange={(e) => onCellChange(activeMobileDayIndex, serviceIndex, zone.id, e.target.value)}
                                                        />
                                                        <datalist id={`volunteers-mobile-${activeMobileDayIndex}-${serviceIndex}-${zone.id}`}>
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
                    </div>
                )}
            </div>

            {/* ========================================================= */}
            {/* DESKTOP & PRINT LAYOUT (Table View)                       */}
            {/* ========================================================= */}
            <div className="hidden md:block w-full overflow-x-auto border border-gray-300 rounded-lg shadow-sm bg-white relative print:block print:border-none print:shadow-none print:overflow-visible" id="schedule-grid">
                <table className="w-full border-collapse table-auto print:min-w-0 print:w-full print:table-fixed print:h-full">
                    <thead className="bg-slate-50 sticky top-0 z-20 shadow-sm print:static print:bg-white print:shadow-none">
                        <tr>
                            <th
                                rowSpan={3}
                                className="border border-gray-300 p-2 text-center min-w-[90px] sticky left-0 z-30 bg-slate-50 font-bold text-gray-700 text-base align-middle print:static print:bg-white print:min-w-0 print:w-[8%] print:border-black print:p-[1px] print:text-[10px] print:leading-tight"
                            >
                                <div className="flex flex-col gap-0.5">
                                    <span className="whitespace-pre-line">{t.grid.day_date}</span>
                                </div>
                            </th>
                            <th
                                rowSpan={3}
                                className="border border-gray-300 p-2 text-center min-w-[90px] sticky left-[90px] z-30 bg-slate-50 font-bold text-gray-700 text-lg align-middle print:static print:bg-white print:min-w-0 print:w-[8%] print:border-black print:p-[1px] print:text-[10px] print:leading-tight"
                            >
                                {t.grid.service}
                            </th>
                            {zones.map((zone, index) => (
                                <th
                                    key={`num-${zone.id}`}
                                    className="border border-gray-300 p-1 text-center font-bold text-gray-800 text-base print:text-xs print:border-black print:p-[1px]"
                                >
                                    {index + 1}
                                </th>
                            ))}
                        </tr>

                        <tr>
                            {zones.map((zone, index) => (
                                <th
                                    key={`name-${zone.id}`}
                                    className="border border-gray-300 p-1.5 text-center font-semibold text-gray-700 align-top group relative print:min-w-0 print:align-middle print:border-black print:p-[1px]"
                                >
                                    <div className="print:hidden">
                                        <input
                                            type="text"
                                            value={zone.name}
                                            onChange={(e) => onZoneUpdate(index, "name", e.target.value)}
                                            className="w-full text-center bg-transparent font-bold text-gray-900 mb-0.5 border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none text-base whitespace-normal transition-colors"
                                        />
                                        <input
                                            type="text"
                                            value={zone.contact}
                                            onChange={(e) => onZoneUpdate(index, "contact", e.target.value)}
                                            className="w-full text-center bg-transparent text-sm text-gray-600 font-normal border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="hidden print:flex print:flex-col print:items-center print:justify-center print:gap-0">
                                        <span className="text-base font-bold text-gray-900 whitespace-normal break-words leading-tight print:text-xs">{zone.name}</span>
                                        <span className="text-sm text-gray-600 whitespace-normal break-words leading-tight print:text-[10px]">{zone.contact}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>

                        <tr>
                            {zones.map((zone, index) => (
                                <th
                                    key={`time-${zone.id}`}
                                    className="border border-gray-300 p-1.5 text-center text-sm font-medium text-gray-800 print:text-[10px] print:border-black print:p-[1px] print:leading-none"
                                >
                                    <input
                                        type="text"
                                        value={zone.time}
                                        onChange={(e) => onZoneUpdate(index, "time", e.target.value)}
                                        className="w-full text-center bg-transparent font-medium border-b border-transparent hover:border-gray-400 focus:border-blue-500 focus:outline-none print:hidden text-sm transition-colors"
                                    />
                                    <span className="hidden print:block text-[10px] font-medium whitespace-nowrap">{zone.time}</span>
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
                                            "hover:bg-blue-50/30 transition-colors print:h-auto",
                                            service.type.includes("Stage") ? "bg-white" : "bg-slate-50/50"
                                        )}
                                    >
                                        {serviceIndex === 0 && (
                                            <td
                                                rowSpan={dayData.services.length}
                                                className="border border-gray-300 p-3 font-bold text-gray-700 align-middle sticky left-0 z-10 bg-white text-center print:static print:p-[1px] print:border-black"
                                            >
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="text-base text-gray-900 print:text-xs">{dayData.day}</span>
                                                    <span className="text-sm text-gray-500 font-medium print:text-[10px] whitespace-nowrap">{dayData.date}</span>
                                                </div>
                                            </td>
                                        )}

                                        <td className="border border-gray-300 p-3 font-semibold text-gray-700 align-middle sticky left-[90px] z-10 bg-inherit text-center text-base print:static print:text-xs print:p-[1px] print:border-black">
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
                                                    className="border border-gray-300 p-1 text-center align-middle print:border-black print:p-[1px]"
                                                >
                                                    <div className="relative w-full h-full flex items-center justify-center">
                                                        <input
                                                            list={`volunteers-${dayIndex}-${serviceIndex}-${zone.id}`}
                                                            className="w-full h-8 px-2 py-0.5 text-base text-center bg-transparent border-transparent hover:border-slate-300 focus:border-blue-500 focus:outline-none rounded-sm font-medium text-gray-800 print:hidden whitespace-normal overflow-hidden text-ellipsis transition-all"
                                                            value={currentValue || ""}
                                                            onChange={(e) => onCellChange(dayIndex, serviceIndex, zone.id, e.target.value)}
                                                        />

                                                        <span className="hidden print:flex items-center justify-center w-full h-full text-base font-medium text-gray-900 whitespace-normal break-words leading-tight px-0.5 min-h-[1.25em] print:text-xs">
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
