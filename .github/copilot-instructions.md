# Workvio - Project Management Platform

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a project management platform inspired by Jira, built with modern web technologies.

## Tech Stack
- **Framework**: Next.js 15 with TypeScript and App Router
- **Styling**: Tailwind CSS + Material-UI (MUI)
- **State Management**: Redux Toolkit with Redux Persist
- **Date Handling**: date-fns (no Moment.js)
- **Authentication**: Custom auth system

## Architecture Guidelines

### Component Structure
- Use lowercase with hyphens for multi-word files (e.g., `ticket-card.tsx`)
- Centralized form controls in `/components/form-controls/`
- Avoid suffix like `-slice`, use only entity name (e.g., `auth.ts`, not `auth-slice.ts`)

### Entity Structure
```
Project -> contains multiple Sprints -> contains multiple Tickets
Ticket types: Task, Bug, Story
Status flow: todo → inprogress → qa → completed
```

### Folder Organization
```
/src
  /components
    /form-controls     # Reusable form UI components
    /layout           # Header, sidebar components
    /project          # Project-related components
    /sprint           # Sprint-related components
  /store
    /slices           # Redux slices for each entity
  /app
    /auth            # Authentication pages
    /(main)          # Protected routes with sidebar layout
      /dashboard     # Overview page
      /projects      # Project management
      /sprints       # Sprint management
      /profile       # User settings
```

### UI Guidelines
- Modern, professional design inspired by Modernize Next.js template
- Dark mode support with responsive design (mobile, tablet, desktop)
- Use Tailwind for layout, MUI for complex controls (modals, dropdowns)
- Kanban board for ticket status management
- Build reusable components for every UI block

### Development Principles
- Follow clean architecture and separation of concerns
- Create components for every possible reusable UI element
- Maintain Jira-style UX (kanban boards, ticket drill-down, filters)
- Build scalable, maintainable code structure

### Authentication Flow
- Unauthenticated users see only login page
- Authenticated users access dashboard with sidebar navigation
- Protected routes use layout groups: `(main)` for authenticated, `auth` for public

### Navigation Flow
Project List → Project Details (Sprint List) → Sprint Details → Sprint Dashboard (Kanban)
