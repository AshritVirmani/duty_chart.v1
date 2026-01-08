"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ScheduleGrid } from "./ScheduleGrid";
import { ControlPanel } from "./ControlPanel";
import { Footer } from "./Footer";
import { zones as initialZones, getScheduleForWeek } from "@/lib/data";
import { DaySchedule, Service, Zone } from "@/lib/types";
import { getWeekStartDate, generateWeekId } from "@/lib/date-utils";
import { addWeeks, subWeeks, addDays, format, getMonth, getYear } from "date-fns";
import { enIN } from "date-fns/locale";
import { Language, languages, translations, volunteerTranslations, ZoneId, VolunteerRole } from "@/lib/translations";

const getInitialHardcoded = (role: VolunteerRole) => 
  Object.entries(volunteerTranslations)
    .filter(([_, data]) => data.defaultRole === role)
    .map(([name]) => name)
    .sort();

export function ScheduleManager() {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(new Date(2025, 2, 31));
  const [scheduleData, setScheduleData] = useState<DaySchedule[]>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [scheduleStore, setScheduleStore] = useState<Record<string, DaySchedule[]>>({});
  const [currentLang, setCurrentLang] = useState<Language>("hi");

  const [currentZones, setCurrentZones] = useState<Zone[]>(initialZones);

  // Editable Header/Footer State
  const [headerQuote, setHeaderQuote] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [footerTitle, setFooterTitle] = useState("");
  const [footerReqs, setFooterReqs] = useState<string[]>([]);

  const [stageVolunteers, setStageVolunteers] = useState<string[]>([]);
  const [sanchalanVolunteers, setSanchalanVolunteers] = useState<string[]>([]);
  const [gyanPracharaks, setGyanPracharaks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFormattedHeaderDate = useCallback(() => {
    const endOfWeek = addDays(currentWeekStart, 5); 
    const locale = languages.find(l => l.id === currentLang)?.locale;
    const dateLocale = locale || enIN;

    const startStr = format(currentWeekStart, "dd.MM.yyyy", { locale: dateLocale });
    const endStr = format(endOfWeek, "dd.MM.yyyy", { locale: dateLocale });
    
    const template = translations[currentLang].header.title;
    return template.replace("{startDate}", startStr).replace("{endDate}", endStr);
  }, [currentWeekStart, currentLang]);

  // Initialize and Update Editable Text on Language Change
  useEffect(() => {
    const t = translations[currentLang];
    
    // Update Zones
    setCurrentZones(prevZones => 
      prevZones.map(zone => ({
        ...zone,
        name: t.zones[zone.id as ZoneId] || zone.name
      }))
    );

    // Update Header
    setHeaderQuote(t.header.quote);
    // For title, we reset to the dynamic one for the new language
    setHeaderTitle(getFormattedHeaderDate());

    // Update Footer
    setFooterTitle(t.footer.title);
    setFooterReqs([t.footer.req1, t.footer.req2, t.footer.req3, t.footer.req4]);
    
  }, [currentLang, getFormattedHeaderDate]);

  // Update Header Title when week changes (if not manually edited? No, simpler to just update it)
  // We want to update the date part when week changes, preserving the language structure
  useEffect(() => {
      setHeaderTitle(getFormattedHeaderDate());
  }, [currentWeekStart, getFormattedHeaderDate]);


  useEffect(() => {
    const loadData = () => {
      try {
        const storedStage = localStorage.getItem('stageVolunteers');
        const storedSanchalan = localStorage.getItem('sanchalanVolunteers');
        const storedGPs = localStorage.getItem('gyanPracharaks');
        const storedSchedules = localStorage.getItem('scheduleStore');

        if (storedStage) {
          const parsed = JSON.parse(storedStage);
          setStageVolunteers(Array.isArray(parsed) && parsed.length > 0 ? parsed : getInitialHardcoded('stage'));
        } else {
          setStageVolunteers(getInitialHardcoded('stage'));
        }

        if (storedSanchalan) {
          const parsed = JSON.parse(storedSanchalan);
          setSanchalanVolunteers(Array.isArray(parsed) && parsed.length > 0 ? parsed : getInitialHardcoded('sanchalan'));
        } else {
          setSanchalanVolunteers(getInitialHardcoded('sanchalan'));
        }

        if (storedGPs) {
          setGyanPracharaks(JSON.parse(storedGPs));
        }

        if (storedSchedules) {
          const parsedSchedules = JSON.parse(storedSchedules);
          setScheduleStore(parsedSchedules);
        } else {
           // Initialize with default hardcoded week if no store
           const initialId = generateWeekId(new Date(2025, 2, 31));
           const initialData = getScheduleForWeek(new Date(2025, 2, 31));
           setScheduleStore({ [initialId]: initialData });
        }

      } catch (e) {
        console.error("Error loading data from local storage", e);
        setStageVolunteers(getInitialHardcoded('stage'));
        setSanchalanVolunteers(getInitialHardcoded('sanchalan'));
      }
    };

    loadData();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('stageVolunteers', JSON.stringify(stageVolunteers));
  }, [stageVolunteers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('sanchalanVolunteers', JSON.stringify(sanchalanVolunteers));
  }, [sanchalanVolunteers, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('gyanPracharaks', JSON.stringify(gyanPracharaks));
  }, [gyanPracharaks, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('scheduleStore', JSON.stringify(scheduleStore));
  }, [scheduleStore, isLoaded]);

  // Logic to load current week's data from store once loaded or when week changes
  useEffect(() => {
    if (!isLoaded) return;

    const weekId = generateWeekId(currentWeekStart);
    if (scheduleStore[weekId]) {
      setScheduleData(scheduleStore[weekId]);
    } else {
      const newData = getScheduleForWeek(currentWeekStart);
      setScheduleData(newData);
    }
    setIsDirty(false);
  }, [currentWeekStart, scheduleStore, isLoaded]);

  const getTranslatedVolunteer = useCallback((name: string) => {
    if (volunteerTranslations[name]) {
      return volunteerTranslations[name].translations[currentLang];
    }
    return name;
  }, [currentLang]);

  const getTranslatedDay = useCallback((dayName: string) => {
    const dayKey = dayName as keyof typeof translations.en.days;
    if (translations[currentLang].days[dayKey]) {
      return translations[currentLang].days[dayKey];
    }
    return dayName;
  }, [currentLang]);

  const handleZoneUpdate = useCallback((index: number, field: keyof Zone, value: string) => {
    setCurrentZones(prev => {
      const newZones = [...prev];
      newZones[index] = { ...newZones[index], [field]: value };
      return newZones;
    });
    setIsDirty(true);
  }, []);

  const handlePrevWeek = useCallback(() => {
    if (isDirty && !confirm("You have unsaved changes. Discard them?")) return;
    setCurrentWeekStart(prev => getWeekStartDate(subWeeks(prev, 1)));
  }, [isDirty]);

  const handleNextWeek = useCallback(() => {
    if (isDirty && !confirm("You have unsaved changes. Discard them?")) return;
    setCurrentWeekStart(prev => getWeekStartDate(addWeeks(prev, 1)));
  }, [isDirty]);

  const handleWeekChange = useCallback((date: Date) => {
    if (isDirty && !confirm("You have unsaved changes. Discard them?")) return;
    setCurrentWeekStart(getWeekStartDate(date));
  }, [isDirty]);

  // Helper to check if a volunteer is already assigned to a specific zone in the given month
  const isVolunteerInZoneThisMonth = useCallback((
    volunteerName: string, 
    zoneId: string, 
    targetDate: Date,
    currentScheduleData: DaySchedule[] // Pass the current data being edited too
  ) => {
    const targetMonth = getMonth(targetDate);
    const targetYear = getYear(targetDate);

    // 1. Check ALL weeks stored in scheduleStore
    for (const weekId in scheduleStore) {
      const weekData = scheduleStore[weekId];
      // Skip if it's the exact same week we are editing currently (we'll check currentScheduleData instead)
      if (weekId === generateWeekId(currentWeekStart)) continue;

      for (const day of weekData) {
        // Parse date "dd.MM.yy" back to Date object
        // Assuming format is dd.MM.yy from getFormattedDate
        const parts = day.date.split('.');
        if (parts.length === 3) {
          const dayDate = new Date(2000 + parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
          
          if (getMonth(dayDate) === targetMonth && getYear(dayDate) === targetYear) {
             for (const service of day.services) {
               if (service.allocations[zoneId] === volunteerName) {
                 return { found: true, date: day.date };
               }
             }
          }
        }
      }
    }

    // 2. Check the current schedule being edited (excluding the specific day/service if needed, but simple check is enough)
    // Actually, for "more than once", if they are already in the current schedule in another day of same month, it counts.
    for (const day of currentScheduleData) {
       const parts = day.date.split('.');
       if (parts.length === 3) {
         const dayDate = new Date(2000 + parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
         // We only care if it's the same month
         if (getMonth(dayDate) === targetMonth && getYear(dayDate) === targetYear) {
            // Don't check against the EXACT same date/slot we are trying to fill (handled by caller logic if needed, but generally if they are in another slot)
            // But here we are just checking "is in zone".
            for (const service of day.services) {
               if (service.allocations[zoneId] === volunteerName) {
                  // If we are replacing, this might flag itself if we don't exclude current cell.
                  // However, for manual entry, we are about to set it. So it shouldn't be there yet unless they are in another slot.
                  // For randomization, we clear/overwrite, so we check against *other* filled slots.
                  return { found: true, date: day.date };
               }
            }
         }
       }
    }

    return { found: false, date: null };
  }, [scheduleStore, currentWeekStart]);

  const handleCellChange = useCallback(
    (dayIndex: number, serviceIndex: number, zoneId: string, value: string) => {
      // Logic to parse date of this cell
      const currentDay = scheduleData[dayIndex];
      const parts = currentDay.date.split('.');
      const cellDate = new Date(2000 + parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

      // Check constraint if adding a name (not clearing)
      if (value && value.trim() !== "") {
        // We need to pass scheduleData but exclude the current cell's value (which is old value)
        // Actually isVolunteerInZoneThisMonth checks current state.
        // If the volunteer is ALREADY in this zone on another day, we block.
        const result = isVolunteerInZoneThisMonth(value, zoneId, cellDate, scheduleData);
        
        // If found, and it's not the exact same cell (which we can't easily distinguish here without more ID logic, 
        // but generally if they are in the zone, they are in the zone). 
        // Note: If they are already in this zone on THIS day, it returns true. 
        // But we are changing THIS cell. If the OLD value was them, it doesn't matter. 
        // If they are in *another* cell in this zone, we block.
        
        // Refined check: We found them in the zone. Is it the *same* slot we are editing?
        // Our check iterates data. If found in `scheduleData`, it might be this slot if we hadn't updated it yet? 
        // No, `scheduleData` has the OLD value. `value` is the NEW value.
        // If `value` (new person) is found in `scheduleData` (existing assignments), then they are already working elsewhere in this zone.
        
        if (result.found) {
           const confirmAssign = confirm(
             `${value} is already assigned to ${currentZones.find(z => z.id === zoneId)?.name} on ${result.date} this month.\n\nVolunteers should ideally not serve in the same zone more than once a month.\n\nDo you want to proceed anyway?`
           );
           if (!confirmAssign) return; // Abort change
        }
      }

      setScheduleData((prevData) => {
        const newData = [...prevData];
        const newDay = { ...newData[dayIndex] };
        newDay.services = [...newDay.services];
        const newService = { ...newDay.services[serviceIndex] };
        newService.allocations = { ...newService.allocations };

        newService.allocations[zoneId] = value;
        newDay.services[serviceIndex] = newService;
        newData[dayIndex] = newDay;
        
        return newData;
      });
      setIsDirty(true);
    },
    [scheduleData, isVolunteerInZoneThisMonth, currentZones]
  );

  const handleSave = useCallback(() => {
    const weekId = generateWeekId(currentWeekStart);
    setScheduleStore(prev => ({
        ...prev,
        [weekId]: scheduleData
    }));
    setIsDirty(false);
    alert(`Schedule saved locally.`);
  }, [currentWeekStart, scheduleData]);

  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleRandomizeStage = useCallback(() => {
    setScheduleData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      
      let stagePool = [...gyanPracharaks, ...stageVolunteers];
      
      newData.forEach((day: DaySchedule) => {
        const parts = day.date.split('.');
        const dayDate = new Date(2000 + parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

        day.services.forEach((service: Service) => {
          const isStage = service.type.toLowerCase().includes('stage') || service.type.includes('मंच');
          
          if (isStage) {
             let currentPool = shuffle([...stagePool]);
             
             currentZones.forEach((zone, idx) => {
                // Try to find a candidate who hasn't been in this zone this month
                let candidate = null;
                
                // 1. Try to find someone not in this zone this month
                for (let i = 0; i < currentPool.length; i++) {
                   const person = currentPool[i];
                   // Check against stored data AND current newData being built
                   const check = isVolunteerInZoneThisMonth(person, zone.id, dayDate, newData);
                   if (!check.found) {
                      candidate = person;
                      // Remove from pool for this specific slot to avoid double booking in same slot (though logic below used mod)
                      // Ideally we remove them from pool for this *service* row? 
                      // The original logic just used mod, implying reuse across zones is okay? 
                      // "No volunteer placed in the same zone more than once". 
                      // It doesn't say "only one service per day".
                      // But typically 1 person = 1 place at a time. 
                      // Let's assume we consume the candidate.
                      currentPool.splice(i, 1);
                      break;
                   }
                }

                // 2. If no clean candidate, fallback to just picking from remaining or original pool?
                // If strict, we leave empty? Or just pick one?
                // Let's pick from remaining to ensure coverage, even if it violates (soft constraint for auto)
                if (!candidate && currentPool.length > 0) {
                   candidate = currentPool.shift(); 
                }

                if (candidate) {
                   service.allocations[zone.id] = candidate;
                }
             });
          }
        });
      });
      return newData;
    });
    setIsDirty(true);
  }, [stageVolunteers, gyanPracharaks, currentZones, isVolunteerInZoneThisMonth]);

  const handleRandomizeSanchalan = useCallback(() => {
    setScheduleData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      
      let sanchalanPool = [...sanchalanVolunteers];
      
      newData.forEach((day: DaySchedule) => {
        const parts = day.date.split('.');
        const dayDate = new Date(2000 + parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));

        day.services.forEach((service: Service) => {
          const isStage = service.type.toLowerCase().includes('stage') || service.type.includes('मंच');
          
          if (!isStage) {
             let currentPool = shuffle([...sanchalanPool]);
             
             currentZones.forEach((zone, idx) => {
                let candidate = null;
                
                for (let i = 0; i < currentPool.length; i++) {
                   const person = currentPool[i];
                   const check = isVolunteerInZoneThisMonth(person, zone.id, dayDate, newData);
                   if (!check.found) {
                      candidate = person;
                      currentPool.splice(i, 1);
                      break;
                   }
                }

                if (!candidate && currentPool.length > 0) {
                   candidate = currentPool.shift();
                }

                if (candidate) {
                   service.allocations[zone.id] = candidate;
                }
             });
          }
        });
      });
      return newData;
    });
    setIsDirty(true);
  }, [sanchalanVolunteers, currentZones, isVolunteerInZoneThisMonth]);

  const handleReset = useCallback(() => {
    if (confirm("Reset to original/blank state?")) {
      const original = getScheduleForWeek(currentWeekStart);
      setScheduleData(original);
      setIsDirty(false);
    }
  }, [currentWeekStart]);

  const handleAddVolunteer = useCallback((name: string, type: VolunteerRole | 'gyan_pracharak') => {
    if (type === 'stage') {
        setStageVolunteers(prev => [...prev, name].sort());
    } else if (type === 'sanchalan') {
        setSanchalanVolunteers(prev => [...prev, name].sort());
    } else {
        setGyanPracharaks(prev => [...prev, name].sort());
    }
  }, []);

  const handleRemoveVolunteer = useCallback((name: string, type: VolunteerRole | 'gyan_pracharak') => {
    if (type === 'stage') {
        setStageVolunteers(prev => prev.filter(v => v !== name));
    } else if (type === 'sanchalan') {
        setSanchalanVolunteers(prev => prev.filter(v => v !== name));
    } else {
        setGyanPracharaks(prev => prev.filter(v => v !== name));
    }
  }, []);

  const handleExport = useCallback(() => {
    window.print();
  }, []);

  const t = translations[currentLang];

  const displayData = scheduleData.map(day => ({
    ...day,
    day: getTranslatedDay(day.day),
    services: day.services.map(service => ({
      ...service,
      allocations: Object.fromEntries(
        Object.entries(service.allocations).map(([key, val]) => [key, getTranslatedVolunteer(val)])
      )
    }))
  }));

  const displayStage = stageVolunteers.map(v => getTranslatedVolunteer(v));
  const displaySanchalan = sanchalanVolunteers.map(v => getTranslatedVolunteer(v));
  const displayGPs = gyanPracharaks.map(v => getTranslatedVolunteer(v));
  const allVolunteers = [...displayStage, ...displaySanchalan]; 

  return (
    <div className="flex flex-col h-screen bg-gray-50 p-2 md:p-4 overflow-hidden">
      <ControlPanel
        onRandomizeStage={handleRandomizeStage}
        onRandomizeSanchalan={handleRandomizeSanchalan}
        onReset={handleReset}
        onSave={handleSave}
        onExport={handleExport}
        isDirty={isDirty}
        
        stageVolunteers={displayStage}
        sanchalanVolunteers={displaySanchalan}
        gyanPracharaks={displayGPs}
        
        onAddVolunteer={handleAddVolunteer}
        onRemoveVolunteer={handleRemoveVolunteer}
        
        currentWeekStart={currentWeekStart}
        onWeekChange={handleWeekChange}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        
        currentLang={currentLang}
        onLangChange={setCurrentLang}
      />

      <div id="printable-dashboard" className="flex-1 flex flex-col gap-2 md:gap-4 bg-white p-2 md:p-4 rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <header className="text-center mb-1 md:mb-4 flex-shrink-0">
            <h2 className="text-sm md:text-xl font-semibold text-gray-800 mb-1 md:mb-2 italic print:text-sm">
               <input 
                 value={headerQuote} 
                 onChange={(e) => setHeaderQuote(e.target.value)}
                 className="w-full text-center bg-transparent border-none focus:outline-none italic"
               />
            </h2>
            <h1 className="text-sm md:text-lg font-bold text-gray-900 leading-tight print:text-xl">
               <input 
                 value={headerTitle} 
                 onChange={(e) => setHeaderTitle(e.target.value)}
                 className="w-full text-center bg-transparent border-none focus:outline-none font-bold"
               />
            </h1>
        </header>

        <ScheduleGrid
            data={displayData}
            zones={currentZones} 
            onCellChange={handleCellChange}
            onZoneUpdate={handleZoneUpdate}
            volunteers={allVolunteers} 
            gyanPracharaks={displayGPs}
            currentLang={currentLang}
        />
        
        <Footer 
          currentLang={currentLang} 
          title={footerTitle}
          reqs={footerReqs}
          onTitleUpdate={setFooterTitle}
          onReqUpdate={(idx, val) => {
             const newReqs = [...footerReqs];
             newReqs[idx] = val;
             setFooterReqs(newReqs);
          }}
        />
      </div>
      
      <div className="mt-2 text-[10px] md:text-sm text-gray-500 text-center no-print flex-shrink-0">
        <p>Scroll horizontally to view all zones. Use the Print button to save as PDF.</p>
      </div>
    </div>
  );
}
