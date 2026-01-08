export interface ZoneAllocation {
  [key: string]: string;
}

export interface Service {
  type: string;
  allocations: ZoneAllocation;
}

export interface DaySchedule {
  date: string;
  day: string;
  services: Service[];
}

export interface Zone {
  id: string;
  name: string;
  contact: string;
  time: string;
}
