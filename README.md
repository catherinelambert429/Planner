# Mom Planner

A comprehensive mobile app and website designed to help organize weekly schedules through a visual calendar, time blocks, checklists, reminders, and privacy system for multiple users.

## Features

### Current Implementation (Phase 1)
- **Weekly Calendar View**: Visual calendar showing all 7 days with customizable hour scale (6 AM - 10 PM)
- **Time Blocks/Events**: Create, view, and manage events with:
  - Title, description, start/end times
  - Custom colors and icons
  - Privacy levels (private, user2, user3, public)
  - Event types (appointment, activity, task)
- **Checklists**: Create and manage custom checklists with:
  - Checkable items
  - Privacy controls
  - Multiple list support
- **User Management**:
  - Primary user (Mom) with full access
  - Secondary users (User 2, User 3) support
  - Profile management
- **Settings**:
  - Notification preferences
  - Default colors and privacy settings
  - User management
- **Responsive Design**:
  - Desktop: Full 7-day grid view
  - Mobile: Horizontal swipe between days with bottom navigation

### Tech Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Icons**: React Icons
- **Date Handling**: date-fns
- **Drag & Drop**: @dnd-kit (ready for future implementation)
- **Animations**: Framer Motion

### Database Schema
The application includes a complete PostgreSQL/Supabase database schema (see [database-schema.sql](database-schema.sql)) with tables for:
- Users with role-based access
- Events with privacy controls
- Lists and list items
- Reminders
- User permissions

## Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+ (currently works with 20.18 but with warnings)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/catherinelambert429/Planner.git
cd Planner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
Planner/
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   │   ├── WeeklyCalendar.jsx
│   │   │   └── TimeGrid.jsx
│   │   ├── Events/
│   │   │   └── EventBlock.jsx
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── WeeklyView.jsx
│   │   ├── Login.jsx
│   │   ├── Lists.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   ├── contexts/          (for future state management)
│   ├── utils/             (for helper functions)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── database-schema.sql
└── README.md
```

## Future Enhancements (Phase 2)

- [ ] Backend API integration (Node.js + Express)
- [ ] Real database connection (PostgreSQL/Supabase)
- [ ] Full authentication system (JWT, Google/Apple login)
- [ ] Drag & drop event repositioning
- [ ] Event creation and editing modals
- [ ] Reminder notifications (push & email)
- [ ] Real-time synchronization across devices
- [ ] Recurring events
- [ ] Calendar integrations (Google Calendar, Apple Calendar)
- [ ] Mobile app (React Native or PWA)
- [ ] Home-screen widgets
- [ ] AI suggestions for schedule optimization

## User Roles & Privacy

- **Primary User (Mom)**: Full access to create, modify, and delete all items
- **User 2 & User 3**: Limited access, can only view items shared with them
- **Privacy Levels**:
  - Private: Visible only to the owner
  - User 2: Shared with User 2
  - User 3: Shared with User 3
  - Public/Family: Visible to all users

## Contributing

This is a personal project. Feel free to fork and customize for your own use!

## License

Private - All Rights Reserved
