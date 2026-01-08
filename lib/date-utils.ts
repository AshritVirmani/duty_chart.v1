import { startOfWeek, addDays, format } from "date-fns";
import { enIN } from "date-fns/locale";

export function getWeekStartDate(date: Date): Date {
  // Start week on Monday
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function formatWeekRange(startDate: Date): string {
  const endOfWeek = addDays(startDate, 5); // Monday to Saturday
  // Format: "31.03.2025"
  const startStr = format(startDate, "dd.MM.yyyy");
  const endStr = format(endOfWeek, "dd.MM.yyyy");
  return `${startStr} सोमवार से दिनांक ${endStr} शनिवार तक`;
}

export function getDayName(date: Date): string {
  // Returns "Monday", "Tuesday", etc.
  return format(date, "EEEE");
}

export function getFormattedDate(date: Date): string {
  // Returns "31.03.25"
  return format(date, "dd.MM.yy");
}

export function generateWeekId(startDate: Date): string {
  return format(startDate, "yyyy-MM-dd");
}
