"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserPlus, Trash2, Award, Mic2, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Language, translations, VolunteerRole } from "@/lib/translations";

interface VolunteerManagerProps {
  stageVolunteers: string[];
  sanchalanVolunteers: string[];
  gyanPracharaks: string[];
  onAddVolunteer: (name: string, type: VolunteerRole | 'gyan_pracharak') => void;
  onRemoveVolunteer: (name: string, type: VolunteerRole | 'gyan_pracharak') => void;
  currentLang: Language;
}

export function VolunteerManager({
  stageVolunteers,
  sanchalanVolunteers,
  gyanPracharaks,
  onAddVolunteer,
  onRemoveVolunteer,
  currentLang
}: VolunteerManagerProps) {
  const [newStage, setNewStage] = React.useState("");
  const [newSanchalan, setNewSanchalan] = React.useState("");
  const [newGP, setNewGP] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("stage");

  const t = translations[currentLang].volunteer;

  const handleAdd = (type: VolunteerRole | 'gyan_pracharak') => {
    let name = "";
    if (type === 'stage') name = newStage;
    else if (type === 'sanchalan') name = newSanchalan;
    else name = newGP;

    if (name.trim()) {
      onAddVolunteer(name.trim(), type);
      if (type === 'stage') setNewStage("");
      else if (type === 'sanchalan') setNewSanchalan("");
      else setNewGP("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: VolunteerRole | 'gyan_pracharak') => {
    if (e.key === "Enter") {
      handleAdd(type);
    }
  };

  const renderList = (list: string[], type: VolunteerRole | 'gyan_pracharak') => (
    <ScrollArea className="h-[300px] w-full p-2 border rounded-md">
      <div className="flex flex-col gap-1">
        {list.sort().map((name) => (
          <div
            key={name}
            className="flex items-center justify-between p-2 rounded hover:bg-slate-100 text-sm group"
          >
            <div className="flex items-center gap-2">
               {type === 'gyan_pracharak' && <Award className="h-3 w-3 text-amber-500" />}
               {type === 'stage' && <Mic2 className="h-3 w-3 text-blue-500" />}
               {type === 'sanchalan' && <Activity className="h-3 w-3 text-green-500" />}
               <span>{name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemoveVolunteer(name, type)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center text-gray-400 py-8 text-sm">
            {t.no_names}
          </div>
        )}
      </div>
    </ScrollArea>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          {t.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="stage" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stage">{t.tab_stage}</TabsTrigger>
            <TabsTrigger value="sanchalan">{t.tab_sanchalan}</TabsTrigger>
            <TabsTrigger value="gyan_pracharak">{t.tab_gp}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stage" className="space-y-4">
             <div className="flex items-end gap-2 mt-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="stage-name">{t.add_stage}</Label>
                  <Input
                    id="stage-name"
                    placeholder={t.placeholder}
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'stage')}
                  />
                </div>
                <Button onClick={() => handleAdd('stage')} size="icon" className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              {renderList(stageVolunteers, 'stage')}
          </TabsContent>

          <TabsContent value="sanchalan" className="space-y-4">
             <div className="flex items-end gap-2 mt-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="sanchalan-name">{t.add_sanchalan}</Label>
                  <Input
                    id="sanchalan-name"
                    placeholder={t.placeholder}
                    value={newSanchalan}
                    onChange={(e) => setNewSanchalan(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'sanchalan')}
                  />
                </div>
                <Button onClick={() => handleAdd('sanchalan')} size="icon" className="bg-green-600 hover:bg-green-700">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              {renderList(sanchalanVolunteers, 'sanchalan')}
          </TabsContent>
          
          <TabsContent value="gyan_pracharak" className="space-y-4">
             <div className="flex items-end gap-2 mt-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="gp-name">{t.add_gp}</Label>
                  <Input
                    id="gp-name"
                    placeholder={t.placeholder}
                    value={newGP}
                    onChange={(e) => setNewGP(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'gyan_pracharak')}
                  />
                </div>
                <Button onClick={() => handleAdd('gyan_pracharak')} size="icon" className="bg-amber-600 hover:bg-amber-700">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              {renderList(gyanPracharaks, 'gyan_pracharak')}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
