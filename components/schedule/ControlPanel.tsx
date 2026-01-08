"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, Save, RotateCcw, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Download, Globe, Mic2, Activity } from "lucide-react";
import { VolunteerManager } from "./VolunteerManager";
import { format } from "date-fns";
import { Language, languages, translations, VolunteerRole } from "@/lib/translations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ControlPanelProps {
  onRandomizeStage: () => void;
  onRandomizeSanchalan: () => void;
  onReset: () => void;
  onSave: () => void;
  onExport: () => void;
  isDirty: boolean;
  
  stageVolunteers: string[];
  sanchalanVolunteers: string[];
  gyanPracharaks: string[];
  
  onAddVolunteer: (name: string, type: VolunteerRole | 'gyan_pracharak') => void;
  onRemoveVolunteer: (name: string, type: VolunteerRole | 'gyan_pracharak') => void;
  
  currentWeekStart: Date;
  onWeekChange: (date: Date) => void;
  onPrevWeek: () => void;
  onNextWeek: () => void;

  currentLang: Language;
  onLangChange: (lang: Language) => void;
}

export function ControlPanel({
  onRandomizeStage,
  onRandomizeSanchalan,
  onReset,
  onSave,
  onExport,
  isDirty,
  stageVolunteers,
  sanchalanVolunteers,
  gyanPracharaks,
  onAddVolunteer,
  onRemoveVolunteer,
  currentWeekStart,
  onWeekChange,
  onPrevWeek,
  onNextWeek,
  currentLang,
  onLangChange
}: ControlPanelProps) {
  
  const t = translations[currentLang].controls;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onWeekChange(new Date(e.target.value));
    }
  };

  return (
    <Card className="mb-4 md:mb-6 bg-white shadow-sm border-slate-200" id="control-panel">
      <CardHeader className="pb-2 md:pb-3 px-3 md:px-6 py-3 md:py-6">
        <CardTitle className="text-base md:text-lg font-medium text-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full md:w-auto">
            <span>{t.title}</span>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex items-center bg-slate-100 rounded-md p-1">
                <Button variant="ghost" size="icon" onClick={onPrevWeek} className="h-6 w-6 md:h-7 md:w-7">
                  <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
                
                <div className="mx-1 md:mx-2 flex items-center relative">
                   <input 
                     type="date" 
                     value={format(currentWeekStart, "yyyy-MM-dd")}
                     onChange={handleDateChange}
                     className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                   />
                   <Button variant="ghost" size="sm" className="h-6 md:h-7 text-xs font-normal gap-1 md:gap-2 pointer-events-none px-1 md:px-3">
                     <CalendarIcon className="h-3 w-3" />
                     {format(currentWeekStart, "dd MMM yyyy")}
                   </Button>
                </div>

                <Button variant="ghost" size="icon" onClick={onNextWeek} className="h-6 w-6 md:h-7 md:w-7">
                  <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                </Button>
              </div>

              <Select value={currentLang} onValueChange={(val) => onLangChange(val as Language)}>
                <SelectTrigger className="w-[110px] md:w-[140px] h-7 md:h-8 text-xs ml-0 sm:ml-2">
                  <Globe className="h-3 w-3 mr-1 md:mr-2" />
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id} className="text-xs">
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {isDirty && (
            <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded-full border border-amber-200 self-start md:self-center">
              {t.unsaved}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-6 pb-3 md:pb-6">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 md:gap-4 items-stretch sm:items-center">
          <div className="w-full sm:w-auto">
             <VolunteerManager
                stageVolunteers={stageVolunteers}
                sanchalanVolunteers={sanchalanVolunteers}
                gyanPracharaks={gyanPracharaks}
                onAddVolunteer={onAddVolunteer}
                onRemoveVolunteer={onRemoveVolunteer}
                currentLang={currentLang}
              />
          </div>
          
          <div className="w-px h-8 bg-slate-200 mx-2 hidden sm:block"></div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2 w-full sm:w-auto">
            <Button
              onClick={onRandomizeStage}
              variant="outline"
              className="flex items-center justify-center gap-2 hover:bg-slate-100 text-xs md:text-sm px-2 md:px-4 text-blue-700 border-blue-200 bg-blue-50"
            >
              <Mic2 className="h-3 w-3 md:h-4 md:w-4" />
              {t.randomize_stage}
            </Button>

            <Button
              onClick={onRandomizeSanchalan}
              variant="outline"
              className="flex items-center justify-center gap-2 hover:bg-slate-100 text-xs md:text-sm px-2 md:px-4 text-green-700 border-green-200 bg-green-50"
            >
              <Activity className="h-3 w-3 md:h-4 md:w-4" />
              {t.randomize_sanchalan}
            </Button>
            
            <Button
              onClick={onReset}
              variant="ghost"
              className="flex items-center justify-center gap-2 text-slate-600 hover:text-slate-900 text-xs md:text-sm px-2 md:px-4 col-span-2 sm:col-span-1"
            >
              <RotateCcw className="h-3 w-3 md:h-4 md:w-4" />
              {t.reset}
            </Button>
          </div>

          <div className="ml-auto flex items-center gap-2 w-full sm:w-auto justify-end mt-2 sm:mt-0">
            <Button
              onClick={onExport}
              variant="outline"
              className="flex items-center gap-2 text-slate-700 border-slate-300 text-xs md:text-sm h-8 md:h-10"
            >
              <Download className="h-3 w-3 md:h-4 md:w-4" />
              {t.export}
            </Button>
            
            <Button
              onClick={onSave}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-xs md:text-sm h-8 md:h-10"
              disabled={!isDirty}
            >
              <Save className="h-3 w-3 md:h-4 md:w-4" />
              {t.save}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
