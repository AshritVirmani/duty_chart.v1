# Weekly Volunteer Deployment Schedule Dashboard

A comprehensive, interactive, and printable dashboard for managing weekly volunteer deployments across multiple zones. This application replaces manual PDF rosters with a dynamic, easy-to-update web interface.

## 🌟 Features

*   **Dynamic Schedule Grid:** View and manage assignments for 11 zones over a 6-day week (Mon-Sat).
*   **Volunteer Management:**
    *   Maintain a master list of volunteers for "Stage Seva" and "Sanchalan" roles.
    *   Separate management for "Gyan Pracharaks".
    *   Smart prevention of assigning the same volunteer to the same zone more than once a month.
*   **Automatic Randomization:**
    *   Intelligently shuffle and assign volunteers to slots.
    *   Respects role separation (Stage vs. Sanchalan).
    *   Checks availability and constraints.
*   **Multi-Language Support:**
    *   Full interface translation for English, Hindi, Punjabi, Marathi, and Garhwali.
    *   Zone names, days, and volunteer names are transliterated.
*   **Print-Ready PDF Export:**
    *   One-click "Export PDF" button.
    *   Optimized layout for landscape printing on a single sheet.
    *   High-contrast, legible typography for physical distribution.
*   **Local Data Persistence:**
    *   All data (volunteers, schedules, settings) is saved to your browser's Local Storage.
    *   No external database required; data persists across sessions.
*   **Full Editability:**
    *   Edit header quotes, titles, and footer requests directly on the page.
    *   Modify zone names and contact numbers.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or newer)
*   npm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/AshritVirmani/duty-chart.git
    cd duty-chart
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

### 1. Master Controls
*   **Week Navigation:** Use the arrows `<` `>` or the calendar icon to select the week you want to schedule.
*   **Language:** Select your preferred language from the dropdown.
*   **Manage Roster:** Click "Team Management" to add or remove volunteers from the lists (Stage, Sanchalan, Gyan Pracharak).

### 2. Creating a Schedule
*   **Manual Entry:** Click any cell in the grid to select a volunteer from the dropdown list.
*   **Randomize:** Use "Randomize Stage" or "Randomize Sanchalan" to automatically fill empty slots. The system will warn you if a volunteer is being assigned to the same zone twice in a month.
*   **Editing Zones:** Click on any zone name, contact number, or time in the header to edit it.
*   **Editing Header/Footer:** Click on the top quote, main title, or footer bullet points to customize the text.

### 3. Saving & Printing
*   **Save:** Click the "Save" button to persist your changes for the current week.
*   **Export PDF:** Click "Export PDF" to open the print dialog. Ensure your printer settings are set to **Landscape** and **Background Graphics** is enabled if needed (though the design is optimized for B&W).

## 🛠️ Technical Details

*   **Framework:** Next.js 15 (App Router)
*   **Styling:** Tailwind CSS
*   **UI Components:** ShadCN UI (Radix Primitives)
*   **State Management:** React Hooks + Local Storage
*   **Deployment:** Configured for GitHub Pages

## 📱 Mobile Access

This dashboard is deployed to GitHub Pages and is responsive. You can access it on your mobile device to view schedules, though a desktop/tablet is recommended for editing.

---
*Built for efficient Seva management.*
