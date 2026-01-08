import { DaySchedule, Zone } from "./types";
import { addDays, format } from "date-fns";
import { getDayName, getFormattedDate } from "./date-utils";

export const zones: Zone[] = [
  { id: "zone_1", name: "Restcamp", contact: "2624521", time: "8 - 9" },
  { id: "zone_2", name: "Bypass", contact: "2624521", time: "8 - 9" },
  { id: "zone_3", name: "Kaulagarh / Garhi Cantt", contact: "9897325018", time: "8 - 9" },
  { id: "zone_4", name: "Gajiyawala", contact: "9012430502", time: "8 - 9" },
  { id: "zone_5", name: "Raipur", contact: "9758824305 / 8755657968", time: "8 - 9" },
  { id: "zone_6", name: "Seemadwar", contact: "9897010772", time: "8 - 9" },
  { id: "zone_7", name: "Sewlakala Majra", contact: "7500591744", time: "8 - 9" },
  { id: "zone_8", name: "Clementown", contact: "9897424915", time: "8 - 9" },
  { id: "zone_9", name: "Majri Mafi", contact: "9897852177", time: "8 - 9" },
  { id: "zone_10", name: "Danda Lakhond", contact: "9548995082", time: "8 - 9" },
  { id: "zone_11", name: "Sinaula (Evening)", contact: "9389844724", time: "6:30 - 7:30" },
];

export function generateBlankSchedule(startDate: Date): DaySchedule[] {
  const schedule: DaySchedule[] = [];
  
  // Generate 6 days (Mon-Sat)
  for (let i = 0; i < 6; i++) {
    const currentDate = addDays(startDate, i);
    const dayName = getDayName(currentDate);
    
    schedule.push({
      date: getFormattedDate(currentDate),
      day: dayName,
      services: [
        {
          type: "Stage Seva",
          allocations: {}
        },
        {
          type: "Sanchalan",
          allocations: {}
        }
      ]
    });
  }
  
  return schedule;
}

const initialWeekData: DaySchedule[] = [
  {
    date: "31.03.25",
    day: "Monday",
    services: [
      {
        type: "Stage Seva",
        allocations: {
          zone_1: "Sheetal Dola Ji",
          zone_2: "Geeta Bhatt Ji",
          zone_3: "Dinesh Kothari Ji",
          zone_4: "Sunita Nirankari Ji",
          zone_5: "Katait Ji",
          zone_6: "Satyam Ji",
          zone_7: "Rupa Ji",
          zone_8: "Anil Arya Ji",
          zone_9: "Sunil Ji, E.C. Road",
          zone_10: "",
          zone_11: "Gaya Prasad Ji",
        },
      },
      {
        type: "Sanchalan",
        allocations: {
          zone_1: "Anita Sharma Ji",
          zone_2: "Jaykrit Negi Ji",
          zone_3: "Pramod Ji",
          zone_4: "Nisha Ji",
          zone_5: "Jagendra Singh Ji",
          zone_6: "Kaushalya Ji",
          zone_7: "Tanisha Ji",
          zone_8: "Lata Thapa Ji",
          zone_9: "Chhavi Ji",
          zone_10: "",
          zone_11: "Varsha Ji",
        },
      },
    ],
  },
  {
    date: "01.04.25",
    day: "Tuesday",
    services: [
      {
        type: "Stage Seva",
        allocations: {
          zone_1: "Badoni Ji",
          zone_2: "Pinky Mangalwan Ji",
          zone_3: "Mukesh Rawat Ji",
          zone_4: "K.R. Bharti Ji",
          zone_5: "Kashiram Nautiyal Ji",
          zone_6: "Atul Bhatt Ji",
          zone_7: "Ashok Kamboj Ji",
          zone_8: "Deepa Bisht Ji",
          zone_9: "Khanduri Ji",
          zone_10: "",
          zone_11: "Rakhi Ji",
        },
      },
      {
        type: "Sanchalan",
        allocations: {
          zone_1: "Ujjwal Ji",
          zone_2: "Abhinav Kaintura Ji",
          zone_3: "Neetu Shahi Ji",
          zone_4: "Aarti Ji",
          zone_5: "Meena Gusain Ji",
          zone_6: "Bhuvaneshwari Ji",
          zone_7: "Om Singh Ji",
          zone_8: "Suman Gurung Ji",
          zone_9: "Chhotelal Ji",
          zone_10: "",
          zone_11: "Divya Ji",
        },
      },
    ],
  },
  {
    date: "02.04.25",
    day: "Wednesday",
    services: [
      {
        type: "Stage Seva",
        allocations: {
          zone_1: "Vinod Ji",
          zone_2: "Dayal Singh Negi Ji",
          zone_3: "Shashi Kshetri Ji",
          zone_4: "Sheila Rana Ji",
          zone_5: "Anand Singh Ji",
          zone_6: "Ravi Ji",
          zone_7: "Jhaneshwar Ji",
          zone_8: "S.S. Rana Ji",
          zone_9: "Ranjeet Rawat Ji",
          zone_10: "Sushila Rawat Ji",
          zone_11: "Rajiv Ji",
        },
      },
      {
        type: "Sanchalan",
        allocations: {
          zone_1: "Bhupendra Singh Ji",
          zone_2: "Shubham Ji",
          zone_3: "Himanshu Ji",
          zone_4: "Shubham Ji",
          zone_5: "Bharat Mall Ji",
          zone_6: "Bimla Rana Ji",
          zone_7: "Yashpal Ji",
          zone_8: "Alka Ji",
          zone_9: "Shridhar Ji",
          zone_10: "Rajendra Ji",
          zone_11: "Dhanpal Ji",
        },
      },
    ],
  },
  {
    date: "03.04.25",
    day: "Thursday",
    services: [
      {
        type: "Stage Seva",
        allocations: {
          zone_1: "Sachin Panwar Ji",
          zone_2: "Madan Singh Bisht Ji",
          zone_3: "Bikar Das Ji",
          zone_4: "Nanna Ji",
          zone_5: "Santosh Sarna Ji",
          zone_6: "Prem Singh Thapa Ji",
          zone_7: "S.S. Negi Ji",
          zone_8: "Samay Singh Ji",
          zone_9: "Rajkishore Ji",
          zone_10: "Doval Ji",
          zone_11: "Guddu Chamoli Ji",
        },
      },
      {
        type: "Sanchalan",
        allocations: {
          zone_1: "Gulshan Ji, Press",
          zone_2: "Charu Ji",
          zone_3: "Prerna Singh Ji",
          zone_4: "Hemlata Ji",
          zone_5: "Sheetal Ji",
          zone_6: "Sushila Butola Ji",
          zone_7: "Chhatar Singh Ji",
          zone_8: "Sachin Kshetri Ji",
          zone_9: "Ayush Ji",
          zone_10: "Kirti Ji",
          zone_11: "Ravina Ji",
        },
      },
    ],
  },
  {
    date: "04.04.25",
    day: "Friday",
    services: [
      {
        type: "Stage Seva",
        allocations: {
          zone_1: "Rekha Bhatt Ji",
          zone_2: "Ashok Ji, Police Line",
          zone_3: "Dayanand Nautiyal Ji",
          zone_4: "Vijay Rawat Ji",
          zone_5: "Dhuliya Ji",
          zone_6: "K.S. Negi Ji",
          zone_7: "Sarla Yadav Ji",
          zone_8: "Manohar Bhatt Ji",
          zone_9: "G.S. Pundir Ji",
          zone_10: "",
          zone_11: "Jaynandan Ji",
        },
      },
      {
        type: "Sanchalan",
        allocations: {
          zone_1: "Anu Kamboj Ji",
          zone_2: "Sumit Shah Ji",
          zone_3: "Niharika Yadav Ji",
          zone_4: "Anita Ji",
          zone_5: "Arvind Pal Ji",
          zone_6: "Sunita Ji",
          zone_7: "Renu Ji",
          zone_8: "Hemant Ji",
          zone_9: "Gopendra Rawat Ji",
          zone_10: "",
          zone_11: "Reena Ji",
        },
      },
    ],
  },
  {
    date: "05.04.25",
    day: "Saturday",
    services: [
      {
        type: "Stage Seva",
        allocations: {
          zone_1: "Rajiv Ji",
          zone_2: "Anand Singh Ji",
          zone_3: "Gulshan Ji, Sarafa",
          zone_4: "Saklani Ji",
          zone_5: "Yogendra Bhandari Ji",
          zone_6: "Usha Arora Ji",
          zone_7: "Devendra Singh Ji",
          zone_8: "Jeevan Ji",
          zone_9: "Amar Lal Shah Ji",
          zone_10: "",
          zone_11: "Om Prakash Ji",
        },
      },
      {
        type: "Sanchalan",
        allocations: {
          zone_1: "Sanjay Kshetri Ji",
          zone_2: "Diksha Ji",
          zone_3: "Simran Moga Ji",
          zone_4: "Varsha Ji",
          zone_5: "Dolly Bahukhandi Ji",
          zone_6: "Shakuntala Ji",
          zone_7: "Arjun Ji",
          zone_8: "Dr. Tyagi Ji",
          zone_9: "Vikram Singh Pundir Ji",
          zone_10: "",
          zone_11: "Savita Ji",
        },
      },
    ],
  },
];

// Re-export this for backward compatibility or direct use
export const initialScheduleData = initialWeekData;

export function getScheduleForWeek(startDate: Date): DaySchedule[] {
  // Check if it's the specific week (Mar 31, 2025)
  // We check if the input startDate matches Mar 31, 2025
  const targetDate = new Date(2025, 2, 31); // Month is 0-indexed (2 = March)
  
  // Simple check on day/month/year
  if (
    startDate.getDate() === 31 && 
    startDate.getMonth() === 2 && 
    startDate.getFullYear() === 2025
  ) {
    return initialWeekData;
  }
  
  return generateBlankSchedule(startDate);
}
