# Workvio - Project Management Platform

A modern project and sprint management platform inspired by Jira, built with Next.js, TypeScript, and Material-UI.

## 🚀 Features

- **Project Management**: Create and manage projects with custom keys and colors
- **Sprint Planning**: Organize work into sprints with timeline tracking
- **Kanban Boards**: Visual task management with drag-and-drop functionality
- **Ticket System**: Task, Bug, and Story tickets with status tracking
- **User Management**: Role-based access control and user profiles
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with TypeScript and App Router
- **UI Library**: Material-UI (MUI) + Tailwind CSS
- **State Management**: Redux Toolkit with Redux Persist
- **Date Handling**: date-fns
- **Authentication**: Custom auth system (mock implementation)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── (main)/            # Protected routes with sidebar layout
│   │   ├── dashboard/     # Main dashboard
│   │   ├── projects/      # Project management
│   │   ├── sprints/       # Sprint management
│   │   └── profile/       # User profile
│   └── auth/              # Authentication pages
│       └── login/         # Login page
├── components/            # Reusable UI components
│   ├── form-controls/     # Form input components
│   ├── layout/           # Layout components (Header, Sidebar)
│   └── providers/        # Context providers (Theme, Redux)
└── store/                # Redux store and slices
    └── slices/           # Redux slices for each entity
```

## 🎯 Entity Structure

- **Project** → Contains multiple **Sprints** → Contains multiple **Tickets**
- **Ticket Types**: Task, Bug, Story
- **Status Flow**: todo → inprogress → qa → completed

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd workvio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Credentials

Use these credentials to test the application:
- **Email**: demo@workvio.com
- **Password**: demo123

## 📱 Features Walkthrough

### 1. Authentication
- Login page with modern design
- Mock authentication system
- Persistent user sessions

### 2. Dashboard
- Overview of project activities
- Statistics cards showing key metrics
- Recent projects and activity feed

### 3. Projects
- Create and manage projects
- Custom project keys and colors
- Project status tracking (Active, Inactive, Archived)
- Grid view with hover effects

### 4. Sprints (Coming Soon)
- Sprint planning and management
- Sprint timeline tracking
- Sprint board view

### 5. Profile
- User profile information
- Account settings
- Role management

## 🎨 UI Design

The application follows a modern design system inspired by the Modernize Next.js template:

- **Clean and Professional**: Minimalist design with proper spacing
- **Dark Mode Support**: System-aware theme switching
- **Responsive**: Mobile-first approach with grid layouts
- **Accessible**: WCAG compliant components
- **Consistent**: Unified design language across all pages

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (recommended)
- Component-first architecture
- Custom hooks for business logic

## 🔮 Roadmap

- [ ] Sprint board implementation with drag-and-drop
- [ ] Ticket detail pages with comments
- [ ] Advanced filtering and search
- [ ] Real-time notifications
- [ ] User management and team features
- [ ] Time tracking and reporting
- [ ] API integration
- [ ] Mobile app (React Native)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
